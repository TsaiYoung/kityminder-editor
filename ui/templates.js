angular.module('kityminderEditor').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('ui/directive/appendNode/appendNode.html',
    "<div class=\"km-btn-group append-group\"><div class=\"km-btn-item append-child-node\" ng-disabled=\"minder.queryCommandState('AppendChildNode') === -1\" ng-click=\"minder.queryCommandState('AppendChildNode') === -1 || execCommand('AppendChildNode')\" title=\"{{ 'appendchildnode' | lang:'ui/command' }}\"><i class=\"km-btn-icon\"></i> <span class=\"km-btn-caption\">{{ 'appendchildnode' | lang:'ui/command' }}</span></div><div class=\"km-btn-item append-parent-node\" ng-disabled=\"minder.queryCommandState('AppendParentNode') === -1\" ng-click=\"minder.queryCommandState('AppendParentNode') === -1 || execCommand('AppendParentNode')\" title=\"{{ 'appendparentnode' | lang:'ui/command' }}\"><i class=\"km-btn-icon\"></i> <span class=\"km-btn-caption\">{{ 'appendparentnode' | lang:'ui/command' }}</span></div><div class=\"km-btn-item append-sibling-node\" ng-disabled=\"minder.queryCommandState('AppendSiblingNode') === -1\" ng-click=\"minder.queryCommandState('AppendSiblingNode') === -1 ||execCommand('AppendSiblingNode')\" title=\"{{ 'appendsiblingnode' | lang:'ui/command' }}\"><i class=\"km-btn-icon\"></i> <span class=\"km-btn-caption\">{{ 'appendsiblingnode' | lang:'ui/command' }}</span></div></div>"
  );


  $templateCache.put('ui/directive/arrange/arrange.html',
    "<div class=\"km-btn-group arrange-group\"><div class=\"km-btn-item arrange-up\" ng-disabled=\"minder.queryCommandState('ArrangeUp') === -1\" ng-click=\"minder.queryCommandState('ArrangeUp') === -1 || minder.execCommand('ArrangeUp')\" title=\"{{ 'arrangeup' | lang:'ui/command' }}\"><i class=\"km-btn-icon\"></i> <span class=\"km-btn-caption\">{{ 'arrangeup' | lang:'ui/command' }}</span></div><div class=\"km-btn-item arrange-down\" ng-disabled=\"minder.queryCommandState('ArrangeDown') === -1\" ng-click=\"minder.queryCommandState('ArrangeDown') === -1 || minder.execCommand('ArrangeDown');\" title=\"{{ 'arrangedown' | lang:'ui/command' }}\"><i class=\"km-btn-icon\"></i> <span class=\"km-btn-caption\">{{ 'arrangedown' | lang:'ui/command' }}</span></div></div>"
  );


  $templateCache.put('ui/directive/collabPanel/collabPanel.html',
    "<div style=\"float: right; max-width: 800px\"><span class=\"glyphicon glyphicon-link\" aria-hidden=\"true\" title=\"Click it and start collaboration\" ng-show=\"!collaboration\" style=\"margin-left: 10px;cursor:pointer;margin-right: 30px\" ng-click=\"startCollab()\"></span> <span class=\"glyphicon glyphicon-globe\" aria-hidden=\"true\" title=\"Click it and stop collaboration\" ng-show=\"collaboration\" style=\"margin-left: 10px;cursor:pointer;margin-right: 30px\" ng-click=\"stopCollab()\"></span> <span class=\"glyphicon glyphicon-pencil\" aria-hidden=\"true\" title=\"Apply to draw the mind map\" ng-show=\"!draw\" style=\"cursor:pointer;margin-right: 20px\" ng-click=\"applyCtrl()\"></span> <span class=\"glyphicon glyphicon-refresh\" aria-hidden=\"true\" title=\"Give up to draw the mind map\" ng-show=\"draw\" style=\"cursor:pointer;margin-right: 20px\" ng-click=\"giveupCtrl()\"></span> <span class=\"glyphicon glyphicon-user\" aria-hidden=\"true\" title=\"{{drawer}} is drawing the mind map\" style=\"margin-right: 10px\" ng-show=\"draw\"></span> <span ng-show=\"draw\" style=\"margin-right: 20px;margin-left: 10px\">{{leftApply}} people waiting for drawing.</span> <span class=\"glyphicon glyphicon-user\" aria-hidden=\"true\" ng-repeat=\"user in participants\" title=\"{{user}}\" style=\"margin-right: 15px\"></span></div>"
  );


  $templateCache.put('ui/directive/colorPanel/colorPanel.html',
    "<div class=\"bg-color-wrap\"><span class=\"quick-bg-color\" ng-click=\"minder.queryCommandState('background') === -1 || minder.execCommand('background', bgColor)\" ng-disabled=\"minder.queryCommandState('background') === -1\"></span> <span color-picker class=\"bg-color\" set-color=\"setDefaultBg()\" ng-disabled=\"minder.queryCommandState('background') === -1\"><span class=\"caret\"></span></span> <span class=\"bg-color-preview\" ng-style=\"{ 'background-color': bgColor }\" ng-click=\"minder.queryCommandState('background') === -1 || minder.execCommand('background', bgColor)\" ng-disabled=\"minder.queryCommandState('background') === -1\"></span></div>"
  );


  $templateCache.put('ui/directive/expandLevel/expandLevel.html',
    "<div class=\"btn-group-vertical\" dropdown is-open=\"isopen\"><button type=\"button\" class=\"btn btn-default expand\" title=\"{{ 'expandtoleaf' | lang:'ui' }}\" ng-class=\"{'active': isopen}\" ng-click=\"minder.execCommand('ExpandToLevel', 9999)\"></button> <button type=\"button\" class=\"btn btn-default expand-caption dropdown-toggle\" title=\"{{ 'expandtoleaf' | lang:'ui' }}\" dropdown-toggle><span class=\"caption\">{{ 'expandtoleaf' | lang:'ui' }}</span> <span class=\"caret\"></span> <span class=\"sr-only\">{{ 'expandtoleaf' | lang:'ui' }}</span></button><ul class=\"dropdown-menu\" role=\"menu\"><li ng-repeat=\"level in levels\"><a href ng-click=\"minder.execCommand('ExpandToLevel', level)\">{{ 'expandtolevel' + level | lang:'ui/command' }}</a></li></ul></div>"
  );


  $templateCache.put('ui/directive/fileImport/fileImport.html',
    "<div class=\"btn-group-vertical\" dropdown is-open=\"isopen\"><button type=\"button\" class=\"btn btn-default import\" title=\"{{ 'import' | lang:'ui' }}\" ng-class=\"{'active': isopen}\" data-toggle=\"modal\" data-target=\"#importModal\" ng-click=\"updateMaplist()\"></button> <button type=\"button\" class=\"btn btn-default import-caption dropdown-toggle\" data-toggle=\"modal\" data-target=\"#importModal\" title=\"{{ 'import' | lang:'ui' }}\" ng-click=\"updateMaplist()\"><span class=\"caption\">{{ 'import' | lang:'ui' }}</span> <span class=\"sr-only\">{{ 'import' | lang:'ui' }}</span></button><div class=\"modal fade\" id=\"importModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\"><div class=\"modal-dialog\" style=\"width: 800px\"><div class=\"modal-content\"><div class=\"modal-header\"><button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button><h4 class=\"modal-title\" id=\"myModalLabel\">Import mind map</h4></div><div class=\"modal-body\" style=\"font-size: 12px\"><div style=\"width: 95%; margin: auto; border: 1px solid gray\"><table class=\"table\" style=\"width: 90%; margin: auto\"><caption style=\"font-size: 14px;font-weight: 600;color:#333\">Open mindmap from resource center:</caption><thead><tr><th style=\"width: 30%\">Name</th><th style=\"width: 50%\">Description</th><th style=\"width: 20%\">Operation</th></tr></thead></table><div style=\"min-height:100px;max-height: 400px; overflow-y: auto\"><table class=\"table\" style=\"width: 90%;margin: auto\"><tbody><tr ng-repeat=\"item in mindmapRes\"><td style=\"width: 30%\">{{item.name}}</td><td style=\"width: 50%\">{{item.description}}</td><td style=\"width: 20%\"><span style=\"cursor:pointer\" class=\"glyphicon glyphicon-ok-circle\" title=\"Load this mindmap\" ng-click=\"mapLoad(item)\"></span></td></tr></tbody></table></div></div><div style=\"width: 90%; margin: auto;margin-top: 30px\"><span style=\"font-size: 14px;font-weight: 600\">Open mindmap from resource center:</span> <input type=\"file\" id=\"fileInput\" style=\"margin-top: 15px\"><button type=\"button\" class=\"btn btn-info\" style=\"margin-top: 15px\" ng-click=\"mapImport()\">Upload</button></div></div><div class=\"modal-footer\"><button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button></div></div></div></div></div>"
  );


  $templateCache.put('ui/directive/fileSave/fileSave.html',
    "<div class=\"btn-group-vertical\" dropdown is-open=\"isopen\"><button type=\"button\" class=\"btn btn-default save\" title=\"{{ 'save' | lang:'ui' }}\" ng-class=\"{'active': isopen}\" data-toggle=\"modal\" data-target=\"#saveModal\"></button> <button type=\"button\" class=\"btn btn-default save-caption dropdown-toggle\" title=\"{{ 'save' | lang:'ui' }}\" data-toggle=\"modal\" data-target=\"#saveModal\"><span class=\"caption\">{{ 'save' | lang:'ui' }}</span> <span class=\"sr-only\">{{ 'save' | lang:'ui' }}</span></button><div class=\"modal fade\" id=\"saveModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\"><div class=\"modal-dialog\"><div class=\"modal-content\"><div class=\"modal-header\"><button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button><h4 class=\"modal-title\" id=\"myModalLabel\">Save mind map</h4></div><div class=\"modal-body\"><div><span style=\"font-size: 16px; margin-right: 20px\">Save the current mind map as format:</span><select class=\"form-control\" style=\"width:100px; display: initial\" id=\"datatypeSelect\"><option>json</option><option>md</option><option>km</option><option>png</option></select></div><div class=\"input-group\" style=\"margin-top: 20px\"><span class=\"input-group-addon\">File name:</span> <input type=\"text\" class=\"form-control\" id=\"mindmapName\" placeholder=\"Please fill in the name\"></div><div style=\"margin-top: 20px\"><button type=\"button\" class=\"btn btn-info\" id=\"saveBtn\" ng-click=\"saveMapFun()\">Save to resource center</button> <button style=\"float: right\" type=\"button\" id=\"downloadBtn\" ng-click=\"downloadMapFun()\" class=\"btn btn-info\">Download</button></div></div><div class=\"modal-footer\"><button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button></div></div></div></div></div>"
  );


  $templateCache.put('ui/directive/fontOperator/fontOperator.html',
    "<div class=\"font-operator\"><div class=\"dropdown font-family-list\" dropdown><div class=\"dropdown-toggle current-font-item\" dropdown-toggle ng-disabled=\"minder.queryCommandState('fontfamily') === -1\"><a href class=\"current-font-family\" title=\"{{ 'fontfamily' | lang: 'ui' }}\">{{ getFontfamilyName(minder.queryCommandValue('fontfamily')) || 'Font family' }}</a> <span class=\"caret\"></span></div><ul class=\"dropdown-menu font-list\"><li ng-repeat=\"f in fontFamilyList\" class=\"font-item-wrap\"><a ng-click=\"minder.execCommand('fontfamily', f.val)\" class=\"font-item\" ng-class=\"{ 'font-item-selected' : f == minder.queryCommandValue('fontfamily') }\" ng-style=\"{'font-family': f.val }\">{{ f.name }}</a></li></ul></div><div class=\"dropdown font-size-list\" dropdown><div class=\"dropdown-toggle current-font-item\" dropdown-toggle ng-disabled=\"minder.queryCommandState('fontsize') === -1\"><a href class=\"current-font-size\" title=\"{{ 'fontsize' | lang: 'ui' }}\">{{ minder.queryCommandValue('fontsize') || 'Font size' }}</a> <span class=\"caret\"></span></div><ul class=\"dropdown-menu font-list\"><li ng-repeat=\"f in fontSizeList\" class=\"font-item-wrap\"><a ng-click=\"minder.execCommand('fontsize', f)\" class=\"font-item\" ng-class=\"{ 'font-item-selected' : f == minder.queryCommandValue('fontsize') }\" ng-style=\"{'font-size': f + 'px'}\">{{ f }}</a></li></ul></div><span class=\"s-btn-icon font-bold\" ng-click=\"minder.queryCommandState('bold') === -1 || minder.execCommand('bold')\" ng-class=\"{'font-bold-selected' : minder.queryCommandState('bold') == 1}\" ng-disabled=\"minder.queryCommandState('bold') === -1\"></span> <span class=\"s-btn-icon font-italics\" ng-click=\"minder.queryCommandState('italic') === -1 || minder.execCommand('italic')\" ng-class=\"{'font-italics-selected' : minder.queryCommandState('italic') == 1}\" ng-disabled=\"minder.queryCommandState('italic') === -1\"></span><div class=\"font-color-wrap\"><span class=\"quick-font-color\" ng-click=\"minder.queryCommandState('forecolor') === -1 || minder.execCommand('forecolor', foreColor)\" ng-disabled=\"minder.queryCommandState('forecolor') === -1\">A</span> <span color-picker class=\"font-color\" set-color=\"setDefaultColor()\" ng-disabled=\"minder.queryCommandState('forecolor') === -1\"><span class=\"caret\"></span></span> <span class=\"font-color-preview\" ng-style=\"{ 'background-color': foreColor }\" ng-click=\"minder.queryCommandState('forecolor') === -1 || minder.execCommand('forecolor', foreColor)\" ng-disabled=\"minder.queryCommandState('forecolor') === -1\"></span></div><color-panel minder=\"minder\" class=\"inline-directive\"></color-panel></div>"
  );


  $templateCache.put('ui/directive/hyperLink/hyperLink.html',
    "<div class=\"btn-group-vertical\" dropdown is-open=\"isopen\" style=\"cursor:not-allowed\"><button type=\"button\" class=\"btn btn-default hyperlink\" title=\"{{ 'link' | lang:'ui' }}\" ng-class=\"{'active': isopen}\" style=\"cursor:not-allowed\" ng-disabled=\"minder.queryCommandState('HyperLink') === -1\"></button> <button type=\"button\" class=\"btn btn-default hyperlink-caption dropdown-toggle\" ng-disabled=\"minder.queryCommandState('HyperLink') === -1\" title=\"{{ 'link' | lang:'ui' }}\" style=\"cursor:not-allowed\" dropdown-toggle><span class=\"caption\">{{ 'link' | lang:'ui' }}</span> <span class=\"caret\"></span> <span class=\"sr-only\">{{ 'link' | lang:'ui' }}</span></button></div>"
  );


  $templateCache.put('ui/directive/imageBtn/imageBtn.html',
    "<div class=\"btn-group-vertical\" dropdown is-open=\"isopen\" style=\"cursor:not-allowed\"><button type=\"button\" class=\"btn btn-default image-btn\" title=\"{{ 'image' | lang:'ui' }}\" ng-class=\"{'active': isopen}\" style=\"cursor:not-allowed\" ng-disabled=\"minder.queryCommandState('Image') === -1\"></button> <button type=\"button\" class=\"btn btn-default image-btn-caption dropdown-toggle\" ng-disabled=\"minder.queryCommandState('Image') === -1\" title=\"{{ 'image' | lang:'ui' }}\" style=\"cursor:not-allowed\" dropdown-toggle><span class=\"caption\">{{ 'image' | lang:'ui' }}</span> <span class=\"caret\"></span> <span class=\"sr-only\">{{ 'image' | lang:'ui' }}</span></button></div>"
  );


  $templateCache.put('ui/directive/kityminderEditor/kityminderEditor.html',
    "<div class=\"minder-editor-container\"><div class=\"top-tab\" top-tab=\"minder\" editor=\"editor\" ng-if=\"minder\"></div><div search-box minder=\"minder\" ng-if=\"minder\"></div><div class=\"minder-editor\"></div><div class=\"km-note\" note-editor minder=\"minder\" ng-if=\"minder\"></div><div class=\"note-previewer\" note-previewer ng-if=\"minder\"></div><div class=\"navigator\" navigator minder=\"minder\" ng-if=\"minder\"></div></div>"
  );


  $templateCache.put('ui/directive/kityminderViewer/kityminderViewer.html',
    "<div class=\"minder-editor-container\"><div class=\"minder-viewer\"></div><div class=\"note-previewer\" note-previewer ng-if=\"minder\"></div><div class=\"navigator\" navigator minder=\"minder\" ng-if=\"minder\"></div></div>"
  );


  $templateCache.put('ui/directive/layout/layout.html',
    "<div class=\"readjust-layout\"><a ng-click=\"minder.queryCommandState('resetlayout') === -1 || minder.execCommand('resetlayout')\" class=\"btn-wrap\" ng-disabled=\"minder.queryCommandState('resetlayout') === -1\"><span class=\"btn-icon reset-layout-icon\"></span> <span class=\"btn-label\">{{ 'resetlayout' | lang: 'ui/command' }}</span></a></div>"
  );


  $templateCache.put('ui/directive/navigator/navigator.html',
    "<div class=\"nav-bar\"><div class=\"nav-btn zoom-in\" ng-click=\"minder.execCommand('zoomIn')\" title=\"{{ 'zoom-in' | lang : 'ui' }}\" ng-class=\"{ 'active' : getZoomRadio(zoom) == 0 }\"><div class=\"icon\"></div></div><div class=\"zoom-pan\"><div class=\"origin\" ng-style=\"{'transform': 'translate(0, ' + getHeight(100) + 'px)'}\" ng-click=\"minder.execCommand('zoom', 100);\"></div><div class=\"indicator\" ng-style=\"{\r" +
    "\n" +
    "             'transform': 'translate(0, ' + getHeight(zoom) + 'px)',\r" +
    "\n" +
    "             'transition': 'transform 200ms'\r" +
    "\n" +
    "             }\"></div></div><div class=\"nav-btn zoom-out\" ng-click=\"minder.execCommand('zoomOut')\" title=\"{{ 'zoom-out' | lang : 'ui' }}\" ng-class=\"{ 'active' : getZoomRadio(zoom) == 1 }\"><div class=\"icon\"></div></div><div class=\"nav-btn hand\" ng-click=\"minder.execCommand('hand')\" title=\"{{ 'hand' | lang : 'ui' }}\" ng-class=\"{ 'active' : minder.queryCommandState('hand') == 1 }\"><div class=\"icon\"></div></div><div class=\"nav-btn camera\" ng-click=\"minder.execCommand('camera', minder.getRoot(), 600);\" title=\"{{ 'camera' | lang : 'ui' }}\"><div class=\"icon\"></div></div><div class=\"nav-btn nav-trigger\" ng-class=\"{'active' : isNavOpen}\" ng-click=\"toggleNavOpen()\" title=\"{{ 'navigator' | lang : 'ui' }}\"><div class=\"icon\"></div></div></div><div class=\"nav-previewer\" ng-show=\"isNavOpen\"></div>"
  );


  $templateCache.put('ui/directive/noteBtn/noteBtn.html',
    "<div class=\"btn-group-vertical note-btn-group\" dropdown is-open=\"isopen\"><button type=\"button\" class=\"btn btn-default note-btn\" title=\"{{ 'note' | lang:'ui' }}\" ng-class=\"{'active': isopen}\" ng-click=\"addNote()\" ng-disabled=\"minder.queryCommandState('note') === -1\"></button> <button type=\"button\" class=\"btn btn-default note-btn-caption dropdown-toggle\" ng-disabled=\"minder.queryCommandState('note') === -1\" title=\"{{ 'note' | lang:'ui' }}\" dropdown-toggle><span class=\"caption\">{{ 'note' | lang:'ui' }}</span> <span class=\"caret\"></span> <span class=\"sr-only\">{{ 'note' | lang:'ui' }}</span></button><ul class=\"dropdown-menu\" role=\"menu\"><li><a href ng-click=\"addNote()\">{{ 'insertnote' | lang:'ui' }}</a></li><li><a href ng-click=\"minder.execCommand('note', null)\">{{ 'removenote' | lang:'ui' }}</a></li></ul></div>"
  );


  $templateCache.put('ui/directive/noteEditor/noteEditor.html',
    "<div class=\"panel panel-default\" ng-init=\"noteEditorOpen = false\" ng-show=\"noteEditorOpen\"><div class=\"panel-heading\"><h3 class=\"panel-title\">Note</h3><span>（<a class=\"help\" href=\"https://www.zybuluo.com/techird/note/46064\" target=\"_blank\">Support GFM writing grammar</a>）</span> <i class=\"close-note-editor glyphicon glyphicon-remove\" ng-click=\"closeNoteEditor()\"></i></div><div class=\"panel-body\"><div ng-show=\"noteEnabled\" ui-codemirror=\"{ onLoad: codemirrorLoaded }\" ng-model=\"noteContent\" ui-codemirror-opts=\"{\r" +
    "\n" +
    "                gfm: true,\r" +
    "\n" +
    "                breaks: true,\r" +
    "\n" +
    "                lineWrapping : true,\r" +
    "\n" +
    "                mode: 'gfm',\r" +
    "\n" +
    "                dragDrop: false,\r" +
    "\n" +
    "                lineNumbers:true\r" +
    "\n" +
    "             }\"></div><p ng-show=\"!noteEnabled\" class=\"km-note-tips\">Please select one node to add notes</p></div></div>"
  );


  $templateCache.put('ui/directive/notePreviewer/notePreviewer.html',
    "<div id=\"previewer-content\" ng-show=\"showNotePreviewer\" ng-style=\"previewerStyle\" ng-bind-html=\"noteContent\"></div>"
  );


  $templateCache.put('ui/directive/operation/operation.html',
    "<div class=\"km-btn-group operation-group\"><div class=\"km-btn-item edit-node\" ng-disabled=\"minder.queryCommandState('text') === -1\" ng-click=\"minder.queryCommandState('text') === -1 || editNode()\" title=\"{{ 'editnode' | lang:'ui/command' }}\"><i class=\"km-btn-icon\"></i> <span class=\"km-btn-caption\">{{ 'editnode' | lang:'ui/command' }}</span></div><div class=\"km-btn-item remove-node\" ng-disabled=\"minder.queryCommandState('RemoveNode') === -1\" ng-click=\"minder.queryCommandState('RemoveNode') === -1 || minder.execCommand('RemoveNode');\" title=\"{{ 'removenode' | lang:'ui/command' }}\"><i class=\"km-btn-icon\"></i> <span class=\"km-btn-caption\">{{ 'removenode' | lang:'ui/command' }}</span></div></div>"
  );


  $templateCache.put('ui/directive/priorityEditor/priorityEditor.html',
    "<ul class=\"km-priority tool-group\" ng-disabled=\"commandDisabled\"><li class=\"km-priority-item tool-group-item\" ng-repeat=\"p in priorities\" ng-click=\"commandDisabled || minder.execCommand('priority', p)\" ng-class=\"{ active: commandValue == p }\" title=\"{{ getPriorityTitle(p) }}\"><div class=\"km-priority-icon tool-group-icon priority-{{p}}\"></div></li></ul>"
  );


  $templateCache.put('ui/directive/progressEditor/progressEditor.html',
    "<ul class=\"km-progress tool-group\" ng-disabled=\"commandDisabled\"><li class=\"km-progress-item tool-group-item\" ng-repeat=\"p in progresses\" ng-click=\"commandDisabled || minder.execCommand('progress', p)\" ng-class=\"{ active: commandValue == p }\" title=\"{{ getProgressTitle(p) }}\"><div class=\"km-progress-icon tool-group-icon progress-{{p}}\"></div></li></ul>"
  );


  $templateCache.put('ui/directive/resourceEditor/resourceEditor.html',
    "<div class=\"resource-editor\"><div class=\"input-group\"><input class=\"form-control\" type=\"text\" ng-model=\"newResourceName\" ng-required ng-keypress=\"$event.keyCode == 13 && addResource(newResourceName)\" ng-disabled=\"!enabled\"> <span class=\"input-group-btn\"><button class=\"btn btn-default\" ng-click=\"addResource(newResourceName)\" ng-disabled=\"!enabled\">Add</button></span></div><div class=\"resource-dropdown clearfix\" id=\"resource-dropdown\"><ul class=\"km-resource\" ng-init=\"resourceListOpen = false\" ng-class=\"{'open': resourceListOpen}\"><li ng-repeat=\"resource in used\" ng-disabled=\"!enabled\" ng-blur=\"blurCB()\"><label style=\"background: {{resourceColor(resource.name)}}\"><input type=\"checkbox\" ng-model=\"resource.selected\" ng-disabled=\"!enabled\"> <span>{{resource.name}}</span></label></li></ul><div class=\"resource-caret\" click-anywhere-but-here=\"resourceListOpen = false\" is-active=\"resourceListOpen\" ng-click=\"resourceListOpen = !resourceListOpen\"><span class=\"caret\"></span></div></div></div>"
  );


  $templateCache.put('ui/directive/searchBox/searchBox.html',
    "<div id=\"search\" class=\"search-box clearfix\" ng-show=\"showSearch\"><div class=\"input-group input-group-sm search-input-wrap\"><input type=\"text\" id=\"search-input\" class=\"form-control search-input\" ng-model=\"keyword\" ng-keydown=\"handleKeyDown($event)\" aria-describedby=\"basic-addon2\"> <span class=\"input-group-addon search-addon\" id=\"basic-addon2\" ng-show=\"showTip\" ng-bind=\"'第 ' + curIndex + ' 条，共 ' + resultNum + ' 条'\"></span></div><div class=\"btn-group btn-group-sm prev-and-next-btn\" role=\"group\"><button type=\"button\" class=\"btn btn-default\" ng-click=\"doSearch(keyword, 'prev')\"><span class=\"glyphicon glyphicon-chevron-up\"></span></button> <button type=\"button\" class=\"btn btn-default\" ng-click=\"doSearch(keyword, 'next')\"><span class=\"glyphicon glyphicon-chevron-down\"></span></button></div><div class=\"close-search\" ng-click=\"exitSearch()\"><span class=\"glyphicon glyphicon-remove\"></span></div></div>"
  );


  $templateCache.put('ui/directive/searchBtn/searchBtn.html',
    "<div class=\"btn-group-vertical\" dropdown is-open=\"isopen\"><button type=\"button\" class=\"btn btn-default search\" title=\"{{ 'search' | lang:'ui' }}\" ng-class=\"{'active': isopen}\" ng-click=\"enterSearch()\"></button> <button type=\"button\" class=\"btn btn-default search-caption dropdown-toggle\" ng-click=\"enterSearch()\" title=\"{{ 'search' | lang:'ui' }}\"><span class=\"caption\">{{ 'search' | lang:'ui' }}</span> <span class=\"sr-only\">{{ 'search' | lang:'ui' }}</span></button></div>"
  );


  $templateCache.put('ui/directive/selectAll/selectAll.html',
    "<div class=\"btn-group-vertical\" dropdown is-open=\"isopen\"><button type=\"button\" class=\"btn btn-default select\" title=\"{{ 'selectall' | lang:'ui' }}\" ng-class=\"{'active': isopen}\" ng-click=\"select['all']()\"></button> <button type=\"button\" class=\"btn btn-default select-caption dropdown-toggle\" title=\"{{ 'selectall' | lang:'ui' }}\" dropdown-toggle><span class=\"caption\">{{ 'selectall' | lang:'ui' }}</span> <span class=\"caret\"></span> <span class=\"sr-only\">{{ 'selectall' | lang:'ui' }}</span></button><ul class=\"dropdown-menu\" role=\"menu\"><li ng-repeat=\"item in items\"><a href ng-click=\"select[item]()\">{{ 'select' + item | lang:'ui' }}</a></li></ul></div>"
  );


  $templateCache.put('ui/directive/styleOperator/styleOperator.html',
    "<div class=\"style-operator\"><a ng-click=\"minder.queryCommandState('clearstyle') === -1 || minder.execCommand('clearstyle')\" class=\"btn-wrap clear-style\" ng-disabled=\"minder.queryCommandState('clearstyle') === -1\"><span class=\"btn-icon clear-style-icon\"></span> <span class=\"btn-label\">{{ 'clearstyle' | lang: 'ui' }}</span></a><div class=\"s-btn-group-vertical\"><a class=\"s-btn-wrap\" href ng-click=\"minder.queryCommandState('copystyle') === -1 || minder.execCommand('copystyle')\" ng-disabled=\"minder.queryCommandState('copystyle') === -1\"><span class=\"s-btn-icon copy-style-icon\"></span> <span class=\"s-btn-label\">{{ 'copystyle' | lang: 'ui' }}</span></a> <a class=\"s-btn-wrap paste-style-wrap\" href ng-click=\"minder.queryCommandState('pastestyle') === -1 || minder.execCommand('pastestyle')\" ng-disabled=\"minder.queryCommandState('pastestyle') === -1\"><span class=\"s-btn-icon paste-style-icon\"></span> <span class=\"s-btn-label\">{{ 'pastestyle' | lang: 'ui' }}</span></a></div></div>"
  );


  $templateCache.put('ui/directive/templateList/templateList.html',
    "<div class=\"dropdown temp-panel\" dropdown on-toggle=\"toggled(open)\"><div class=\"dropdown-toggle current-temp-item\" ng-disabled=\"minder.queryCommandState('template') === -1\" dropdown-toggle><a href class=\"temp-item {{ minder.queryCommandValue('template') }}\" title=\"{{ minder.queryCommandValue('template') | lang: 'template' }}\"></a> <span class=\"caret\"></span></div><ul class=\"dropdown-menu temp-list\"><li ng-repeat=\"(key, templateObj) in templateList\" class=\"temp-item-wrap\"><a ng-click=\"minder.execCommand('template', key);\" class=\"temp-item {{key}}\" ng-class=\"{ 'temp-item-selected' : key == minder.queryCommandValue('template') }\" title=\"{{ key | lang: 'template' }}\"></a></li></ul></div>"
  );


  $templateCache.put('ui/directive/themeList/themeList.html',
    "<div class=\"dropdown theme-panel\" dropdown><div class=\"dropdown-toggle theme-item-selected\" dropdown-toggle ng-disabled=\"minder.queryCommandState('theme') === -1\"><a href class=\"theme-item\" ng-style=\"getThemeThumbStyle(minder.queryCommandValue('theme'))\" title=\"{{ minder.queryCommandValue('theme') | lang: 'theme'; }}\">{{ minder.queryCommandValue('theme') | lang: 'theme'; }}</a> <span class=\"caret\"></span></div><ul class=\"dropdown-menu theme-list\"><li ng-repeat=\"key in themeKeyList\" class=\"theme-item-wrap\"><a ng-click=\"minder.execCommand('theme', key);\" class=\"theme-item\" ng-style=\"getThemeThumbStyle(key)\" title=\"{{ key | lang: 'theme'; }}\">{{ key | lang: 'theme'; }}</a></li></ul></div>"
  );


  $templateCache.put('ui/directive/topTab/topTab.html',
    "<tabset><tab heading=\"{{ 'idea' | lang: 'ui/tabs'; }}\" ng-click=\"toggleTopTab('idea')\" select=\"setCurTab('idea')\"><undo-redo editor=\"editor\"></undo-redo><append-node minder=\"minder\"></append-node><arrange minder=\"minder\"></arrange><operation minder=\"minder\"></operation><hyper-link minder=\"minder\"></hyper-link><image-btn minder=\"minder\"></image-btn><note-btn minder=\"minder\"></note-btn><priority-editor minder=\"minder\"></priority-editor><progress-editor minder=\"minder\"></progress-editor><resource-editor minder=\"minder\"></resource-editor></tab><tab heading=\"{{ 'appearence' | lang: 'ui/tabs'; }}\" ng-click=\"toggleTopTab('appearance')\" select=\"setCurTab('appearance')\"><template-list minder=\"minder\" class=\"inline-directive\"></template-list><theme-list minder=\"minder\"></theme-list><layout minder=\"minder\" class=\"inline-directive\"></layout><style-operator minder=\"minder\" class=\"inline-directive\"></style-operator><font-operator minder=\"minder\" class=\"inline-directive\"></font-operator></tab><tab heading=\"{{ 'view' | lang: 'ui/tabs'; }}\" ng-click=\"toggleTopTab('view')\" select=\"setCurTab('view')\"><expand-level minder=\"minder\"></expand-level><select-all minder=\"minder\"></select-all><search-btn minder=\"minder\"></search-btn></tab><tab heading=\"{{ 'file' | lang: 'ui/tabs'; }}\" ng-click=\"toggleTopTab('file')\" select=\"setCurTab('file')\"><file-import minder=\"minder\"></file-import><file-save minder=\"minder\"></file-save></tab></tabset>"
  );


  $templateCache.put('ui/directive/undoRedo/undoRedo.html',
    "<div class=\"km-btn-group do-group\"><div class=\"km-btn-item undo\" ng-disabled=\"editor.history.hasUndo() == false\" ng-click=\"editor.history.hasUndo() == false || editor.history.undo();\" title=\"{{ 'undo' | lang:'ui' }}\"><i class=\"km-btn-icon\"></i></div><div class=\"km-btn-item redo\" ng-disabled=\"editor.history.hasRedo() == false\" ng-click=\"editor.history.hasRedo() == false || editor.history.redo()\" title=\"{{ 'redo' | lang:'ui' }}\"><i class=\"km-btn-icon\"></i></div></div>"
  );


  $templateCache.put('ui/dialog/hyperlink/hyperlink.tpl.html',
    "<div class=\"modal-header\"><h3 class=\"modal-title\">Links</h3></div><div class=\"modal-body\"><form><div class=\"form-group\" id=\"link-url-wrap\" ng-class=\"{true: 'has-success', false: 'has-error'}[urlPassed]\"><label for=\"link-url\">Link address：</label><input type=\"text\" class=\"form-control\" ng-model=\"url\" ng-blur=\"urlPassed = R_URL.test(url)\" ng-focus=\"this.value = url\" ng-keydown=\"shortCut($event)\" id=\"link-url\" placeholder=\"必填：以 http(s):// 或 ftp:// 开头\"></div><div class=\"form-group\" ng-class=\"{'has-success' : titlePassed}\"><label for=\"link-title\">Tips：</label><input type=\"text\" class=\"form-control\" ng-model=\"title\" ng-blur=\"titlePassed = true\" id=\"link-title\" placeholder=\"选填：鼠标在链接上悬停时提示的文本\"></div></form></div><div class=\"modal-footer\"><button class=\"btn btn-primary\" ng-click=\"ok()\">OK</button> <button class=\"btn btn-warning\" ng-click=\"cancel()\">Cancel</button></div>"
  );


  $templateCache.put('ui/dialog/imExportNode/imExportNode.tpl.html',
    "<div class=\"modal-header\"><h3 class=\"modal-title\">{{ title }}</h3></div><div class=\"modal-body\"><textarea type=\"text\" class=\"form-control single-input\" rows=\"8\" ng-keydown=\"shortCut($event);\" ng-model=\"value\" ng-readonly=\"type === 'export'\">\r" +
    "\n" +
    "    </textarea></div><div class=\"modal-footer\"><button class=\"btn btn-primary\" ng-click=\"ok()\" ng-disabled=\"type === 'import' && value == ''\">OK</button> <button class=\"btn btn-warning\" ng-click=\"cancel()\">Cancel</button></div>"
  );


  $templateCache.put('ui/dialog/image/image.tpl.html',
    "<div class=\"modal-header\"><h3 class=\"modal-title\">Images</h3></div><div class=\"modal-body\"><tabset><tab heading=\"Upload images\" active=\"true\"><form><div class=\"form-group\"><input type=\"file\" name=\"upload-image\" id=\"upload-image\" class=\"upload-image\" accept=\".jpg,.JPG,jpeg,JPEG,.png,.PNG,.gif,.GIF\" onchange=\"angular.element(this).scope().uploadImage()\"><label for=\"upload-image\" class=\"btn btn-primary\"><span>File select&hellip;</span></label></div><div class=\"form-group\" ng-class=\"{'has-success' : titlePassed}\"><label for=\"image-title\">Tips：</label><input type=\"text\" class=\"form-control\" ng-model=\"data.title\" ng-blur=\"titlePassed = true\" id=\"image-title\" placeholder=\"Optional\"></div><div class=\"form-group\"><label for=\"image-preview\">Image preview:</label><img class=\"image-preview\" id=\"image-preview\" ng-src=\"{{ data.url }}\" title=\"{{ data.title }}\" alt=\"{{ data.title }}\"></div></form></tab><tab heading=\"Other images\"><form><div class=\"form-group\" ng-class=\"{true: 'has-success', false: 'has-error'}[urlPassed]\"><label for=\"image-url\">Links：</label><input type=\"text\" class=\"form-control\" ng-model=\"data.url\" ng-blur=\"urlPassed = data.R_URL.test(data.url)\" ng-focus=\"this.value = data.url\" ng-keydown=\"shortCut($event)\" id=\"image-url\" placeholder=\"http(s)://\"></div><div class=\"form-group\" ng-class=\"{'has-success' : titlePassed}\"><label for=\"image-title\">Tips：</label><input type=\"text\" class=\"form-control\" ng-model=\"data.title\" ng-blur=\"titlePassed = true\" id=\"image-title\" placeholder=\"Optional\"></div><div class=\"form-group\"><label for=\"image-preview\">Image preview:</label><img class=\"image-preview\" id=\"image-preview\" ng-src=\"{{ data.url }}\" alt=\"{{ data.title }}\"></div></form></tab></tabset></div><div class=\"modal-footer\"><button class=\"btn btn-primary\" ng-click=\"ok()\">OK</button> <button class=\"btn btn-warning\" ng-click=\"cancel()\">Cancel</button></div>"
  );

}]);
