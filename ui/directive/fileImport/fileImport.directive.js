angular.module('kityminderEditor')
    .directive('fileImport', function () {
        return {
            restrict: 'E',
            templateUrl: 'ui/directive/fileImport/fileImport.html',
            scope: {
                minder: '='
            },
            replace: true,
            link: function (scope) {
                scope.mapImport = mapImport;
                scope.mapLoad = mapLoad;

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

                        var url = "http://localhost:8081"+map.pathURL;
                        var xhr = new XMLHttpRequest();
                        xhr.open("GET", url, true);
                        xhr.onload = function (e) {
                            if (xhr.status == 200) {
                                var file = xhr.response;

                                editor.minder.importData(fileType, file).then(function (data) {
                                    $(fileInput).val('');
                                });
                            }
                        };
                        xhr.send();
                    }
                    catch (ex) {
                        console.log("import mindmap error");
                    }
                }
            }
        }
    });