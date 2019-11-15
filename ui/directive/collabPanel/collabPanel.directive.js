angular.module('kityminderEditor')
    .directive('collabPanel', ['Messages', 'RouteInfo', function (Messages, RouteInfo) {
        return {
            restrict: 'E',
            templateUrl: 'ui/directive/collabPanel/collabPanel.html',
            scope: {
                participants: '=?',
                drawer: '=?',
                collaboration: '=?',
                draw: '=?',
                leftApply: '=?'
            },
            replace: true,
            link: function (scope) {

                scope.participants = [];  // 在线用户列表
                scope.drawer = "Nobody";    // 画图者
                scope.collaboration = false;  //是否协同
                scope.draw = false;           //是否请求画图
                scope.leftApply = 0;

                scope.applyCtrl = applyCtrl;
                scope.giveupCtrl = giveupCtrl;
                scope.startCollab = startCollab;
                scope.stopCollab = stopCollab;

                function applyCtrl() {
                    if (Messages.isConnection && scope.collaboration) {

                        var socketContent = {
                            "messageType": "Authority",
                            "value": "Require"
                        }
                        Messages.sendSock("collaboration", socketContent, function (data) {
                            if (data != {}) {

                                if (data.messageType == "Authority") {
                                    scope.drawer = data.controller;
                                    scope.participants = data.userList.replace("[", "").replace("]", "").replace(/\s/g, '').split(",");

                                    try {
                                        var requireList = JSON.parse(data.requireList);
                                        for (var i = 0; i < requireList.length; i++) {
                                            if (requireList[i] == data.controller) {
                                                scope.leftApply = i;
                                            }
                                        }
                                    }
                                    catch (ex) {
                                        scope.leftApply = 0;
                                    }
                                } else if (data.messageType == "Left") {
                                    scope.drawer = data.controller;
                                    scope.participants = data.userList.replace("[", "").replace("]", "").replace(/\s/g, '').split(",");

                                    try {
                                        var requireList = JSON.parse(data.requireList);
                                        for (var i = 0; i < requireList.length; i++) {
                                            if (requireList[i] == data.controller) {
                                                scope.leftApply = i;
                                            }
                                        }
                                    }
                                    catch (ex) {
                                        scope.leftApply = 0;
                                    }
                                }
                            }
                        });

                        scope.draw = true;
                    }
                }

                function giveupCtrl() {
                    if (Messages.isConnection) {

                        var socketContent = {
                            "messageType": "Authority",
                            "value": "Release"
                        }
                        Messages.sendSock("collaboration", socketContent, function (data) {
                            if (data != {}) {

                                if (data.messageType == "Authority") {

                                    scope.drawer = data.controller;
                                    scope.participants = data.userList.replace("[", "").replace("]", "").replace(/\s/g, '').split(",");

                                } else if (data.messageType == "Left") {
                                    scope.drawer = data.controller;
                                    scope.participants = data.userList.replace("[", "").replace("]", "").replace(/\s/g, '').split(",");

                                    try {
                                        var requireList = JSON.parse(data.requireList);
                                        for (var i = 0; i < requireList.length; i++) {
                                            if (requireList[i] == data.controller) {
                                                scope.leftApply = i;
                                            }
                                        }
                                    }
                                    catch (ex) {
                                        scope.leftApply = 0;
                                    }
                                }

                            }
                        });
                    }
                    scope.draw = false;
                }

                function startCollab() {

                    var info = RouteInfo.getInfo();
                    Messages.startWebsocket(info.pageId);

                    var socketContent = {
                        "messageType": "Join",
                        "value": info.userName
                    }
                    Messages.sendSock("collaboration", socketContent, function (data) {

                        if (data != {}) {

                            if (data.messageType == "Join") {
                                scope.drawer = data.controller;
                                scope.participants = data.userList.replace("[", "").replace("]", "").replace(/\s/g, '').split(",");

                                scope.collaboration = true;
                            }
                            else if (data.messageType == "Left") {
                                scope.drawer = data.controller;
                                scope.participants = data.userList.replace("[", "").replace("]", "").replace(/\s/g, '').split(",");

                                try {
                                    var requireList = JSON.parse(data.requireList);
                                    for (var i = 0; i < requireList.length; i++) {
                                        if (requireList[i] == data.controller) {
                                            scope.leftApply = i;
                                        }
                                    }
                                }
                                catch (ex) {
                                    scope.leftApply = 0;
                                }
                            }
                        }
                    });
                }

                function stopCollab() {
                    Messages.endWebsocket();
                    scope.collaboration = false;
                    scope.draw = false;
                    scope.participants = [];
                    scope.drawer = "Nobody";
                }
            }
        }
    }]);