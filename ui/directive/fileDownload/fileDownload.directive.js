angular.module('kityminderEditor')
    .directive('fileDownload', ['RouteInfo', function (RouteInfo) {
        return {
            restrict: 'E',
            templateUrl: 'ui/directive/fileDownload/fileDownload.html',
            scope: {
                minder: '='
            },
            replace: true,
            link: function (scope) {
                scope.getMapInfo = getMapInfo;
                scope.downloadMapFun = downloadMapFun;

                function getMapInfo(){
                    
                    if (mindmapInfo != {} && mindmapInfo.name != undefined && mindmapInfo.name != "") {

                        var datatype = mindmapInfo.name.substring(mindmapInfo.name.lastIndexOf('.') + 1);
                        var dataname = mindmapInfo.name.substring(0, mindmapInfo.name.lastIndexOf('.'));
                        $("#downloadTypeSelect").find("option[value="+datatype+"]").prop("selected", true);
                        $('#downloadName').attr('value', dataname);
                    }
                }

                function downloadMapFun() {
                    
                    if ($('#downloadName').val() != "" && $('#downloadName').val() != undefined) {
                        datatype = $('#downloadTypeSelect').val();

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
                            var blob = null, url = "";
                            if (datatype == "png") {
                                blob = getBlobBydataURI(content);
                                url = URL.createObjectURL(blob);
                            }
                            else {
                                blob = new Blob([content]);
                                url = URL.createObjectURL(blob);
                            }
                            var a = document.createElement("a");
                            a.download = $('#downloadName').val() + '.' + datatype;
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