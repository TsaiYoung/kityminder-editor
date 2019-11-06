angular.module('kityminderEditor')
    .directive('fileImport', function() {
        return {
            restrict: 'E',
            templateUrl: 'ui/directive/fileImport/fileImport.html',
            scope: {
                minder: '='
            },
            replace: true,
            link: function (scope) {
            }            
        }
    });