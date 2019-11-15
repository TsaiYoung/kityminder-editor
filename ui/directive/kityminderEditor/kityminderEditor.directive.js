angular.module('kityminderEditor')
	.directive('kityminderEditor', ['config', 'minder.service', 'revokeDialog', 'Messages', function (config, minderService, revokeDialog, Messages) {
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

				function getSocketConnect(data) {
					// websocket
					if (data != {}) {

						if (data.messageType == "Message" && data.event == "contentchange") {
							var mindmap = data.value
							editor.minder.importJson(mindmap);
						}
					}
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
							editor.minder.importJson(JSON.parse(window.localStorage.__dev_minder_content));
						}

						editor.minder.on('contentchange', function () {
							window.localStorage.__dev_minder_content = JSON.stringify(editor.minder.exportJson());

							if (Messages.connection) {
								// websocket
								var socketContent = {
									"messageType": "Message",
									"event": "contentchange",
									"value": window.localStorage.__dev_minder_content
								}
								Messages.sendSock("mindmap", socketContent, getSocketConnect);
							}
						});

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

					//scope.minder.setDefaultOptions(config.getConfig());

					onInit(editor, editor.minder);
				}

			}
		}
	}]);