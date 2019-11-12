angular.module('kityminderEditor')
    .directive('fileSave', function () {
        return {
            restrict: 'E',
            templateUrl: 'ui/directive/fileSave/fileSave.html',
            scope: {
                minder: '='
            },
            replace: true,
            link: function (scope) {
                scope.saveMapFun = saveMapFun;
                scope.downloadMapFun = downloadMapFun;

                function saveMapFun() {
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

                        editor.minder.exportData(exportType).then(function (content) {

                            // 文件上传
                            var blob = new Blob([content]);
                            var filename = $('#mindmapName').val() + '.' + datatype;
                            var fileBlob = new File([blob], filename);

                            var formData = new FormData();
                            formData.append("file", fileBlob);
                            formData.append("description", "Collaborative mindmap tool");
                            formData.append("type", "others");
                            formData.append("uploaderId", "7fcc54b5-9000-4308-a458-82cc590b80b1");
                            formData.append("privacy", "private");
                            formData.append("folderId", "7a3b61c2-1d6d-4791-a004-c2cce9547210");

                            try {
                                $.ajax({
                                    url: 'http://localhost:8081/GeoProblemSolving/folder/uploadToFolder',
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
                                            // update $scope.mindmapRes
                                            scope
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

                        });
                    }
                    else {

                    }
                }

                function downloadMapFun() {
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
            }
        }
    });