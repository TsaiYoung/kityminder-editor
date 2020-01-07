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
                scope.mapDownload = mapDownload;

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

                function mapDownload(map) {

                    var a = document.createElement("a");
                    a.href = 'http://' + RouteInfo.getIPPort() + map.pathURL;
                    $("body").append(a);
                    a.click();
                    $(a).remove();
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