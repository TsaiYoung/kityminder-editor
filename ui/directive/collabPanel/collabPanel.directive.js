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
                var drawerId = "";
                scope.collaboration = false;  //是否协同
                scope.draw = false;           //是否请求画图
                scope.leftApply = -1;

                scope.applyCtrl = applyCtrl;
                scope.giveupCtrl = giveupCtrl;
                scope.startCollab = startCollab;
                scope.stopCollab = stopCollab;

                function applyCtrl() {
                    if (Messages.isConnection() && scope.collaboration) {

                        var info = RouteInfo.getInfo();

                        if (info.userName != "" && info.userId != "") {

                            var socketContent = {
                                "messageType": "Authority",
                                "value": "Require",
                                "userName": info.userName,
                                "userId": info.userId
                            }
                            Messages.sendSock("collaboration", socketContent, function (data) {
                                if (data != {}) {

                                    if (data.messageType == "Authority") {
                                        scope.drawer = JSON.parse(data.controller).userName;
                                        drawerId = JSON.parse(data.controller).userId;
                                        //当等待队列为零，解除屏蔽操作
                                        if (drawerId == info.userId) {
                                            document.getElementById("edit-mask").style.display = "none";
                                            document.getElementById("giveup-ctrl").style.cursor = "pointer";
                                        }
                                        else{
                                            document.getElementById("giveup-ctrl").style.cursor = "not-allowed";
                                        }

                                        scope.participants = data.userList.replace("[", "").replace("]", "").replace(/\s/g, '').split(",");

                                        try {
                                            var requireList = JSON.parse(data.requireList);
                                            for (var i = 0; i < requireList.length; i++) {
                                                if (requireList[i].userId == info.userId) {
                                                    scope.leftApply = i;
                                                }
                                            }
                                        }
                                        catch (ex) {
                                            scope.leftApply = -1;
                                        }
                                    } else if (data.messageType == "Left") {
                                        scope.drawer = JSON.parse(data.controller).userName;
                                        drawerId = JSON.parse(data.controller).userId;
                                        //当等待队列为零，解除屏蔽操作
                                        if (drawerId == info.userId) {
                                            document.getElementById("edit-mask").style.display = "none";
                                            document.getElementById("giveup-ctrl").style.cursor = "pointer";
                                        }
                                        else{
                                            document.getElementById("giveup-ctrl").style.cursor = "not-allowed";
                                        }

                                        scope.participants = data.userList.replace("[", "").replace("]", "").replace(/\s/g, '').split(",");

                                        try {
                                            var requireList = JSON.parse(data.requireList);
                                            for (var i = 0; i < requireList.length; i++) {
                                                if (requireList[i].userId == info.userId) {
                                                    scope.leftApply = i;
                                                }
                                            }
                                        }
                                        catch (ex) {
                                            scope.leftApply = -1;
                                        }
                                    }
                                }
                            });

                            scope.draw = true;
                        }
                        else {
                            alert("Wrong url!");
                        }
                    }
                }

                function giveupCtrl() {
                    var info = RouteInfo.getInfo();
                    if (drawerId == info.userId) {
                        if (Messages.isConnection()) {

                            document.getElementById("edit-mask").style.display = ""; //屏蔽操作

                            var socketContent = {
                                "messageType": "Authority",
                                "value": "Release"
                            }
                            Messages.sendSock("collaboration", socketContent, function (data) {
                                if (data != {}) {

                                    if (data.messageType == "Authority") {

                                        scope.drawer = JSON.parse(data.controller).userName;
                                        drawerId = JSON.parse(data.controller).userId;
                                        scope.participants = data.userList.replace("[", "").replace("]", "").replace(/\s/g, '').split(",");

                                    } else if (data.messageType == "Left") {
                                        scope.drawer = JSON.parse(data.controller).userName;
                                        drawerId = JSON.parse(data.controller).userId;
                                        scope.participants = data.userList.replace("[", "").replace("]", "").replace(/\s/g, '').split(",");

                                        try {
                                            var requireList = JSON.parse(data.requireList);
                                            for (var i = 0; i < requireList.length; i++) {
                                                if (requireList[i].userId == info.userId) {
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
                }

                function startCollab() {

                    var info = RouteInfo.getInfo();

                    if (info.pageId != "" && info.userId != "" && info.userName != "") {
                        Messages.startWebsocket(info.pageId);

                        var socketContent = {
                            "messageType": "Join",
                            "userId": info.userId,
                            "userName": info.userName
                        }
                        Messages.sendSock("collaboration", socketContent, function (data) {

                            if (data != {}) {

                                if (data.messageType == "Join") {
                                    scope.drawer = JSON.parse(data.controller).userName;
                                    drawerId = JSON.parse(data.controller).userId;
                                    scope.participants = data.userList.replace("[", "").replace("]", "").replace(/\s/g, '').split(",");

                                    scope.collaboration = true;
                                    document.getElementById("edit-mask").style.display = ""; //屏蔽操作
                                }
                                else if (data.messageType == "Left") {
                                    scope.drawer = JSON.parse(data.controller).userName;
                                    drawerId = JSON.parse(data.controller).userId;
                                    scope.participants = data.userList.replace("[", "").replace("]", "").replace(/\s/g, '').split(",");

                                    try {
                                        var requireList = JSON.parse(data.requireList);
                                        for (var i = 0; i < requireList.length; i++) {
                                            if (requireList[i].userId == info.userId) {
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
                    else {
                        alert("Wrong url!");
                    }
                }

                function stopCollab() {
                    Messages.endWebsocket();
                    scope.collaboration = false;
                    scope.draw = false;
                    scope.participants = [];
                    scope.drawer = "Nobody";
                    document.getElementById("edit-mask").style.display = "none"; //解除屏蔽操作
                }
            }
        }
    }]);