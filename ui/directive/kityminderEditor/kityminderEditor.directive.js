angular.module('kityminderEditor')
	.directive('kityminderEditor', ['config', 'minder.service', 'revokeDialog', 'Messages', 'RouteInfo', function (config, minderService, revokeDialog, Messages, RouteInfo) {
		return {
			restrict: 'EA',
			templateUrl: 'ui/directive/kityminderEditor/kityminderEditor.html',
			replace: true,
			scope: {
				onInit: '&',
			},
			link: function (scope, element, attributes) {

				var $minderEditor = element.children('.minder-editor')[0];

				function onInit(editor, minder) {
					scope.onInit({
						editor: editor,
						minder: minder
					});

					minderService.executeCallback();
				}

				if (typeof (seajs) != 'undefined') {
					/* global seajs */
					seajs.config({
						base: './src'
					});

					define('demo', function (require) {
						var Editor = require('editor');

						var editor = window.editor = new Editor($minderEditor);

						if (window.localStorage.__dev_minder_content) {
							// editor.minder.importJson(JSON.parse(window.localStorage.__dev_minder_content));
						}

						// init map
						var info = RouteInfo.getInfo();
						if (info.resourceId != "") {
							updateMaplist(info.resourceId);

							function updateMaplist(resourceId) {
								var map = {};
								try {
									$.ajax({
										url: 'http://' + RouteInfo.getIPPort() + '/GeoProblemSolving/resource/inquiry?key=resourceId&value=' + resourceId,
										type: "GET",
										async: false,
										success: function (data) {
											if (data !== "Fail" && data !== "None") {
												map = data[0];
												mapImport(map);
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

							function mapImport(map) {
								try {
									var fileType = map.name.substr(map.name.lastIndexOf('.') + 1);

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
											alert('Only support data format(*.km, *.md, *.json)');
											return;
									}

									var url = "http://" + RouteInfo.getIPPort() + map.pathURL;
									var xhr = new XMLHttpRequest();
									xhr.open("GET", url, true);
									xhr.onload = function (e) {
										if (xhr.status == 200) {
											var file = xhr.response;

											editor.minder.importData(fileType, file);

											mindmapInfo = {
												name: map.name,
												resourceId: map.resourceId,
												uploaderId: info.userId
											};
											// 初始化原始导图
											originalMap = JSON.stringify(editor.minder.exportJson());
										}
									};
									xhr.send();
								}
								catch (err) {
									console.log(err);
								}
							}

						}

						/*** for collaboration * start ***/
						function getSocketConnect(data) {

							if (data != {}) {
								if (data.messageType == "Message" && data.event == "contentchange") {
									var mindmap = JSON.parse(data.value);
									editor.minder.importJson(mindmap);
									window.localStorage.__dev_minder_content = JSON.stringify(editor.minder.exportJson());
								}
							}
						}
						editor.minder.on('contentchange', function () {
							// window.localStorage.__dev_minder_content = JSON.stringify(editor.minder.exportJson());							
						});

						function contentListening() {
							currentMap = JSON.stringify(editor.minder.exportJson());
							if (window.localStorage.__dev_minder_content !== currentMap) {
								window.localStorage.__dev_minder_content = currentMap;

								if (Messages.isConnection()) {
									// websocket
									var socketContent = {
										"messageType": "Message",
										"event": "contentchange",
										"value": window.localStorage.__dev_minder_content
									}
									Messages.sendSock("mindmap", socketContent, getSocketConnect);
								}
							}

							//心跳机制
							if (Messages.isConnection()) {
								var socketContent = {
									"messageType": "Ping",
									"event": "pong"
								}
								Messages.sendSock("ping", socketContent, getSocketConnect);

							}
						}
						setInterval(contentListening, 1000);
						/*** for collaboration * end ***/

						window.minder = window.km = editor.minder;

						scope.editor = editor;
						scope.minder = minder;
						scope.config = config.get();

						//scope.minder.setDefaultOptions(scope.config);
						scope.$apply();

						onInit(editor, minder);
					});

					seajs.use('demo');

				} else if (window.kityminder && window.kityminder.Editor) {
					var editor = new kityminder.Editor($minderEditor);

					window.editor = scope.editor = editor;
					window.minder = scope.minder = editor.minder;

					scope.config = config.get();

					// scope.minder.setDefaultOptions(config.getConfig());

					onInit(editor, editor.minder);
				}

			}
		}
	}]);