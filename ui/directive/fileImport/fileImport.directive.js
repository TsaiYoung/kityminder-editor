angular.module('kityminderEditor')
    .directive('fileImport', ['RouteInfo', function (RouteInfo) {
        return {
            restrict: 'E',
            templateUrl: 'ui/directive/fileImport/fileImport.html',
            scope: {
                minder: '=',
                mindmapRes: '=?'
            },
            replace: true,
            link: function (scope) {
                scope.updateMaplist = updateMaplist;
                scope.mapImport = mapImport;
                scope.mapLoad = mapLoad;
                scope.deleteMap = deleteMap;

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
                                        for (var i = 0; i < data.files.length; i++) {
                                            maps.push(data.files[i]);
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
                        alert("Wrong url!");
                    }
                }

                function mapImport() {

                    var fileInput = document.getElementById('fileInput');
                    if (fileInput.files.length > 0 && fileInput.files.length != undefined) {

                        var file = fileInput.files[0], fileType = file.name.substr(file.name.lastIndexOf('.') + 1);

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

                        var reader = new FileReader();
                        reader.onload = function (e) {
                            var content = reader.result;
                            editor.minder.importData(fileType, content).then(function (data) {
                                $(fileInput).val('');
                            });
                            // 导图信息初始化
                            mindmapInfo = {};
                        }
                        reader.readAsText(file);
                    }
                }

                function mapLoad(map) {
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
                                });

                                mindmapInfo = {
                                    name: map.name,
                                    resourceId: map.resourceId
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

                function deleteMap(map) {
                    try {
                        var info = RouteInfo.getInfo();
                        if (info.pageId != "") {

                            var folderId = info.pageId;
                            $.ajax({
                                url: 'http://' + RouteInfo.getIPPort() + '/GeoProblemSolving/folder/removeFile?resourceId=' + map.resourceId + '&folderId=' + folderId,
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
                    }
                    catch (ex) {
                        console.log("fail")
                    }
                }
            }
        }
    }]);