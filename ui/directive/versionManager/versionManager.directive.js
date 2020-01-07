angular.module('kityminderEditor')
    .directive('versionManager', ['RouteInfo', function (RouteInfo) {
        return {
            restrict: 'E',
            templateUrl: 'ui/directive/versionManager/versionManager.html',
            scope: {
                minder: '=',
                mindmapRes: '=?'
            },
            replace: true,
            link: function (scope) {
                scope.updateMaplist = updateMaplist;
                scope.mapLoad = mapLoad;
                scope.deleteMap = deleteMap;
                // scope.saveMap = saveMap;

                function updateMaplist() {
                    var maps = [];

                    var info = RouteInfo.getInfo();
                    if (info.pageId != "") {

                        var folderId = info.pageId;
                        try {
                            $.ajax({
                                url: 'http://' + RouteInfo.getIPPort() + '/GeoProblemSolving/folder/inquiry?folderId=' + folderId,
                                type: "GET",
                                async: false,
                                success: function (data) {
                                    if (data == "Fail") {
                                        console.log(data);
                                    }
                                    else if (data.files.length != undefined) {

                                        console.log("success!");
                                        for (var i = data.files.length - 1; i >= 0; i--) {
                                            if (data.files[i].type == "toolData:Mindmap") {
                                                maps.push(data.files[i]);
                                            }
                                        }
                                        scope.mindmapRes = maps;
                                    }

                                },
                                error: function (err) {
                                    console.log("fail.");
                                }
                            });
                        }
                        catch (ex) {
                            console.log("fail")
                        }
                    }
                    else {
                        alert("Missing page information!");
                    }
                }
                function mapLoad(map) {
                    var info = RouteInfo.getInfo();
                    if (info.pageId != "" && info.userId != "") {
                        var fileType = map.name.replace(/.+\./, "");
                        switch (fileType) {
                            case 'md':
                                fileType = 'markdown';
                                break;
                            case 'km':
                            case 'json':
                                fileType = 'json';
                                break;
                            default:
                                console.log("File not supported!");
                                alert('only support data format(*.km, *.md, *.json)');
                                return;
                        }

                        try {

                            var url = "http://" + RouteInfo.getIPPort() + map.pathURL;
                            var xhr = new XMLHttpRequest();
                            xhr.open("GET", url, true);
                            xhr.onload = function (e) {
                                if (xhr.status == 200) {
                                    var file = xhr.response;

                                    editor.minder.importData(fileType, file).then(function (data) {
                                        $(fileInput).val('');

                                        // 初始化原始导图
                                        originalMap = JSON.stringify(editor.minder.exportJson());
                                    });

                                    mindmapInfo = {
                                        name: map.name,
                                        resourceId: map.resourceId,
                                        uploaderId: map.uploaderId
                                    }
                                }
                            };
                            xhr.send();
                        }
                        catch (ex) {
                            mindmapInfo = {};
                            console.log("import mindmap error");
                        }
                    }
                    else if (info.pageId != "") {
                        alert("Missing page information!");
                    }
                    else {
                        alert("Missing user information, please log in!");
                    }
                }

                function deleteMap(map) {
                    try {
                        var info = RouteInfo.getInfo();
                        if (map.uploaderId == info.userId) {
                            if (info.pageId != "" && info.userId != "") {

                                var folderId = info.pageId;
                                $.ajax({
                                    url: 'http://' + RouteInfo.getIPPort() + '/GeoProblemSolving/folder/removeFile?fileId=' + map.resourceId + '&folderId=' + folderId,
                                    type: "GET",
                                    async: false,
                                    success: function (data) {
                                        if (data == "Fail") {
                                        }
                                        else {
                                            alert("Delete the mindmap successfully");
                                            updateMaplist();
                                        }
                                    },
                                    error: function (err) {
                                        alert("Fail to delete the mindmap");
                                    }
                                });
                            }
                            else if (info.pageId != "") {
                                alert("Missing page information!");
                            }
                            else {
                                alert("Missing user information, please log in!");
                            }
                        }
                        else {
                            alert("Just your own versions can be deleted.")
                        }
                    }
                    catch (ex) {
                        console.log("fail")
                    }
                }

                function saveMap() {
                    var info = RouteInfo.getInfo();
                    if (info.pageId != "" && info.userId != "") {

                        if (mindmapInfo != {} && mindmapInfo.name != undefined && mindmapInfo.resourceId != undefined
                            && mindmapInfo.name != "" && mindmapInfo.resourceId != "") {

                            var datatype = mindmapInfo.name.substring(mindmapInfo.name.lastIndexOf('.') + 1);

                            switch (datatype) {
                                case 'km':
                                    exportType = 'json';
                                    break;
                                case 'md':
                                    exportType = 'markdown';
                                    break;
                                default:
                                    exportType = datatype;
                                    break;
                            }

                            editor.minder.exportData(exportType).then(function (file) {
                                //thumbnail
                                editor.minder.exportData('png').then(function (content) {
                                    //压缩
                                    var canvas = document.createElement('canvas'),
                                        context = canvas.getContext('2d');
                                    // canvas对图片进行缩放
                                    canvas.width = 120;
                                    canvas.height = 120;

                                    var image = new Image()
                                    image.src = content;
                                    image.onload = function () {
                                        // 清除画布,图片压缩
                                        context.clearRect(0, 0, 120, 120);
                                        context.drawImage(image, 0, 0, 120, 120);

                                        var thumbnailUrl = canvas.toDataURL();
                                        var thumbnailBlob = getBlobBydataURI(thumbnailUrl);
                                        var thumbnailName = $('#mindmapName').val() + ".png";
                                        var thumbnailBlobFile = new File([thumbnailBlob], "thumbnail_" + thumbnailName);

                                        // 文件上传
                                        var blob = new Blob([file]);
                                        var filename = mindmapInfo.name;
                                        var fileBlob = new File([blob], filename);

                                        // 工具信息
                                        var toolInfo = { toolName: "Mind map", toolUrl: "/GeoProblemSolving/Collaborative/Mindmap/mindmap.html" };

                                        // resourceId
                                        var formData = new FormData();
                                        if (mindmapInfo.uploaderId == info.userId) {
                                            formData.append("resourceId", mindmapInfo.resourceId);
                                            formData.append("file", fileBlob);
                                            formData.append("uploaderId", info.userId);
                                            formData.append("folderId", info.pageId);
                                            formData.append("thumbnail", thumbnailBlobFile);
                                            formData.append("editToolInfo", JSON.stringify(toolInfo));
                                        }
                                        else {
                                            formData.append("file", fileBlob);
                                            formData.append("description", "Collaborative mindmap tool");
                                            formData.append("type", "toolData:Mindmap");
                                            formData.append("uploaderId", info.userId);
                                            formData.append("privacy", "private");
                                            formData.append("folderId", info.pageId);
                                            formData.append("thumbnail", thumbnailBlobFile);
                                            formData.append("editToolInfo", JSON.stringify(toolInfo));
                                        }

                                        try {
                                            $.ajax({
                                                url: 'http://' + RouteInfo.getIPPort() + '/GeoProblemSolving/folder/uploadToFolder',
                                                type: "POST",
                                                data: formData,
                                                processData: false,
                                                contentType: false,
                                                success: function (data) {
                                                    if (data == "Size over" || data == "Fail" || data == "Offline") {
                                                        alert("Fail to save...");
                                                    }
                                                    else if (data.failed.length > 0) {
                                                        alert("Fail to save...");
                                                    }
                                                    else if (data.uploaded.length > 0) {
                                                        alert("Save this mind map successfully");

                                                        if (indmapInfo.uploaderId != info.userId) {
                                                            mindmapInfo = {
                                                                name: filename,
                                                                resourceId: data.uploaded[0].resourceId,
                                                                uploaderId: info.userId
                                                            }
                                                        }
                                                        // 初始化原始导图
                                                        originalMap = JSON.stringify(editor.minder.exportJson());
                                                    }
                                                },
                                                error: function (err) {
                                                    console.log("fail.");
                                                }
                                            });
                                        }
                                        catch (ex) {
                                            console.log("fail")
                                        }

                                    }
                                });
                            });
                        }
                        else {
                            alert("Please click \"Save as (Save as a new file)\".");
                        }
                    }
                    else if (info.pageId != "") {
                        alert("Missing page information!");
                    }
                    else {
                        alert("Missing user information, please log in!");
                    }
                }

                function getBlobBydataURI(dataurl) {
                    var arr = dataurl.split(","),
                        mime = arr[0].match(/:(.*?);/)[1],
                        bstr = atob(arr[1]),
                        n = bstr.length,
                        u8arr = new Uint8Array(n);
                    while (n--) {
                        u8arr[n] = bstr.charCodeAt(n);
                    }
                    return new Blob([u8arr], { type: mime });
                }
            }
        }
    }]);