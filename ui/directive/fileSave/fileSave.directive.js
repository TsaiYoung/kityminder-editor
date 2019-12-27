angular.module('kityminderEditor')
    .directive('fileSave', ['RouteInfo', function (RouteInfo) {
        return {
            restrict: 'E',
            templateUrl: 'ui/directive/fileSave/fileSave.html',
            scope: {
                minder: '='
            },
            replace: true,
            link: function (scope) {
                scope.saveMapFun = saveMapFun;
                scope.saveasMapFun = saveasMapFun;
                scope.downloadMapFun = downloadMapFun;

                function saveMapFun() {
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

                            var info = RouteInfo.getInfo();
                            if (info.pageId != "" && info.userId != "") {

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

                                        var formData = new FormData();
                                        formData.append("resourceId", mindmapInfo.resourceId);
                                        formData.append("file", fileBlob);
                                        formData.append("uploaderId", info.userId);
                                        formData.append("folderId", info.pageId);
                                        formData.append("thumbnail", thumbnailBlobFile);

                                        try {
                                            $.ajax({
                                                url: 'http://' + RouteInfo.getIPPort() + '/GeoProblemSolving/folder/uploadToFolder',
                                                type: "POST",
                                                data: formData,
                                                processData: false,
                                                contentType: false,
                                                success: function (data) {
                                                    if (data == "Size over" || data == "Fail" || data == "Offline") {
                                                        console.log(data);
                                                    }
                                                    else if (data.uploaded.length > 0) {
                                                        alert("Save this mind map successfully");
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


                            }
                            else {
                                alert("Wrong url!");
                            }

                        });

                    }
                    else {
                        alert("Please click \"Save as\".");
                    }
                }

                function saveasMapFun() {
                    if ($('#mindmapName').val() != "" && $('#mindmapName').val() != undefined) {
                        var datatype = $('#datatypeSelect').val();

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

                            var info = RouteInfo.getInfo();
                            if (info.pageId != "" && info.userId != "") {


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
                                        var filename = $('#mindmapName').val() + '.' + datatype;
                                        var fileBlob = new File([blob], filename);

                                        var formData = new FormData();
                                        formData.append("file", fileBlob);
                                        formData.append("description", "Collaborative mindmap tool");
                                        formData.append("type", "toolData");
                                        formData.append("uploaderId", info.userId);
                                        formData.append("privacy", "private");
                                        formData.append("folderId", info.pageId);
                                        formData.append("thumbnail", thumbnailBlobFile);

                                        try {
                                            $.ajax({
                                                url: 'http://' + RouteInfo.getIPPort() + '/GeoProblemSolving/folder/uploadToFolder',
                                                type: "POST",
                                                data: formData,
                                                processData: false,
                                                contentType: false,
                                                success: function (data) {
                                                    if (data == "Size over" || data == "Fail" || data == "Offline") {
                                                        console.log(data);
                                                    }
                                                    else if (data.uploaded.length > 0) {
                                                        alert("Save this mind map successfully");

                                                        mindmapInfo = {
                                                            name: filename,
                                                            resourceId: data.uploaded[0].resourceId
                                                        };
                                                    }
                                                },
                                                error: function (err) {
                                                    console.log("fail.");
                                                    mindmapInfo = {};
                                                }
                                            });
                                        }
                                        catch (ex) {
                                            console.log("fail")
                                            mindmapInfo = {};
                                        }
                                    }


                                });
                            }
                            else {
                                alert("Wrong url!");
                                mindmapInfo = {};
                            }

                        });
                    }
                    else {

                    }
                }

                function downloadMapFun() {

                    if (mindmapInfo != {} && mindmapInfo.name != undefined && mindmapInfo.name != "") {

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

                        editor.minder.exportData(exportType).then(function (content) {

                            // 文件下载
                            if (datatype == "png") {
                                var arr = content.split(','), mime = arr[0].match(/:(.*?);/)[1],
                                    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
                                while (n--) {
                                    u8arr[n] = bstr.charCodeAt(n);
                                }

                                var blob = new Blob([u8arr], { type: mime }),
                                    url = URL.createObjectURL(blob);
                            }
                            else {
                                var blob = new Blob([content]),
                                    url = URL.createObjectURL(blob);
                            }

                            var a = document.createElement("a");
                            a.download = mindmapInfo.name;
                            a.href = url;
                            $("body").append(a);
                            a.click();
                            $(a).remove();
                        });

                    } else if ($('#mindmapName').val() != "" && $('#mindmapName').val() != undefined) {
                        datatype = $('#datatypeSelect').val();

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

                        editor.minder.exportData(exportType).then(function (content) {

                            // 文件下载
                            if (datatype == "png") {
                                var blob = getBlobBydataURI(content);
                                var url = URL.createObjectURL(blob);
                            }
                            else {
                                var blob = new Blob([content]),
                                    url = URL.createObjectURL(blob);
                            }

                            var a = document.createElement("a");
                            a.download = $('#mindmapName').val() + '.' + datatype;
                            a.href = url;
                            $("body").append(a);
                            a.click();
                            $(a).remove();
                        });
                    }
                    else {

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