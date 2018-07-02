(function() {
  var module,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  module = angular.module('angularBootstrapNavTree', []);
  module.directive('focusable', function () {
      return {
          restrict: 'A',
          link: function (scope, element, attrs) {
              element.attr('tabindex', '0'); // make it focusable

             // var tag = attrs.tag ? scope.$eval(attrs.tag) : undefined; // get payload if defined
              //var onKeyHandler = attrs.onKey ? scope.$eval(attrs.onKey) : undefined;

          }
      };
  });
  module.directive('abnTree', [
    '$timeout', function($timeout) {
        //ng-href=\"{{row.branch.selected ? ' javascript:void(0)':undefined}}\"   
      return {
        restrict: 'E',
        template: "<div class=\"abnTree-container\"><ul  ng-style=\"{'min-width':abnWidth, 'width':abnWidth}\" class=\"nav nav-list nav-pills nav-stacked abn-tree abn-tree-list\">\n " +
                  " <li id=\"navigation\" ng-repeat=\"row in tree_rows | filter:{visible:true} track by row.branch.uid\" \n" +
                  "     ng-dblclick=\"row.branch.expanded = !row.branch.expanded\" \n "+
                  "   ng-animate=\"'abn-tree-animate'\" \n "+
                  "   ng-class=\"' ' + row.classes.join(' ') + (row.locked ? ' unsortable' : '') \" class=\"record abn-tree-row level-{{ row.level }} {{(row.branch.selected ? ' active':'')}}\"> \n" +
                  "   <input ng-init='focusToTextbox($index)' ng-keyup=\"keyInput($event, row)\" ng-if='row.showEditable' class=\"none-transition form-control form-control-xs form-control-edit\" type=\"text\" ng-model=\"row.labelCopy\" /><a ng-if='!row.showEditable' href='#' id=\"{{$index}}\" tabindex=\"{{row.branch.selected ? 0:-1}}\"   ng-click=\"user_clicks_branch(row.branch)\"> \n " +
                  "     <i ng-class=\"[{'glyphicon-triangle-right' : (row.branch.children.length > 0 && !row.branch.expanded && !row.branch.selected)}, {'triangle-bottom-right' : (row.branch.children.length > 0 && row.branch.expanded && !row.branch.selected)}, {'glyphicon-triangle-right': (row.branch.children.length > 0 && !row.branch.expanded && row.branch.selected)}, {'triangle-bottom-right1': (row.branch.children.length > 0 && row.branch.expanded && row.branch.selected)}]\" ng-click=\"row.branch.expanded = !row.branch.expanded\" class=\"indented tree-icon glyphicon \"> </i> \n " +
                  "     <span class=\"indented tree-label\" >{{ row.label }} </span> \n " +
                  "   </a>\n " +
                  " </li>\n " +
                  "</ul>"+
                  "<ul ng-if='showOption == true' ng-style=\"{'min-width':optionWidth, 'width':optionWidth}\" class=\"nav nav-list nav-pills nav-stacked abn-tree abn-tree-option \">\n " +
                  " <li id=\"navigation\" ng-repeat=\"row in tree_rows | filter:{visible:true} track by row.branch.uid\" \n" +
                  "    class=\"abn-tree-row \"> \n" +
                  "<span class=\"amount\">{{row.branch.children.length}}</span><div ng-if=\"showCheckBox == true\" class=\"label-checkbox\"><label >"+
                    "<input type=\"checkbox\" ng-model=\"row.branch.checked\">"+
                    "<span class=\"checkbox-material\">"+
                      "<span class=\"check\"></span>"+
                    "</span>"+
                  "</label></div>"+
                  "<div ng-if='showActionBtn == true' class=\"action-group action-group-xs\">"+
                  "<button ng-if='!row.showEditable' class=\"action-btn-group btn-group-edit\" ng-click=\"showEdit(row)\">"+
                    "<i class=\"glyphicon glyphicon-pencil\"></i>"+
                  "</button>"+
                  "<button ng-if='!row.showEditable' class=\"action-btn-group btn-group-remove\" href=\"#\" ng-click='removeTreeBranch(row)' >"+
                    "<i class=\"glyphicon glyphicon-trash\" ></i>"+
                  "</button>"+
                  "<button ng-if='row.showEditable' class=\"action-btn-group btn-group-ok\" ng-click=\"acceptEdit(row)\">"+
                    "<i class=\"glyphicon glyphicon-ok\"></i>"+
                  "</button>"+
                  "<button ng-if='row.showEditable' class=\"action-btn-group btn-group-cancel\" href=\"#\" ng-click='cancelEdit(row)' >"+
                    "<i class=\"glyphicon glyphicon-remove\"></i>"+
                  "</button>"+
                  "</div>"+
                  ""+
                  " </li>\n " +
                  "</ul>"+
                  "</div>",
        replace: true,
        scope: {
          treeData: '=',
          onSelect: '&',
          initialSelection: '@',
          treeControl: '=',
          hiddenPlust:'=',
          eventEnter:'&',
          abnWidth: '@',
          showOption: '=',
          optionWidth: '@',
          showCheckBox: '=',
          showActionBtn: '=',
          removeAction: '&',
          sortableDisabled: '@'
        },
        link: function(scope, element, attrs) {
          
          scope.$on('$destroy', function(evt) {
          });
          /**
          * [clickOnTextBox description]
          * @param  [type]  [description]
          * @return [type]  [description]
          */
          scope.focusToTextbox = function(index) {
            scope.timeoutFocusTextbox = setTimeout(function() {
              element.find('li:nth-of-type(' + (index + 1) + ') input').focus();
            }, 100);
          };
          //set sortable
          if (angular.isUndefined(scope.sortableDisabled)) {
            scope.sortableDisabled = 'true';
          }
          $(element).find('.abn-tree.abn-tree-list').sortable({
            items: "li:not(.unsortable)",
            placeholder: "holder-sortable",
            disabled: scope.sortableDisabled === 'true',
            start: function(event, ui) {
              var model = $(ui.item).scope();
              ui.item.startPos = ui.item.index();
              scope.$apply(function() {
                // set unable drag to children
                scope.lockDragToChild(scope.tree_rows, model.row.branch);
              });
              
              
            },
            stop: function(e, ui) {
              var model = $(ui.item).scope();
              var newIndex = ui.item.index(),
                oldIndex = ui.item.startPos;
                console.log('oldddddddddddddd', oldIndex);
                console.log('newwwwwwwwwwwwwwwwwww', newIndex);
              // filter real tree
              var newList = scope.tree_rows.filter(function(item) {
                return (item.visible == true);
              });
              if (newList != null && newList.length > 0) {
                // check not drag to children
                if (newList[newIndex].locked) {
                  $(element).find('.abn-tree.abn-tree-list').sortable('cancel');
                } else {
                  scope.processUpdateTree(newList, newList[ui.item.startPos].branch, newIndex, oldIndex);
                }
              }
              //unclock able drag
              scope.unlockDrag(scope.tree_rows);
            },
            'cancel': '.unsortable'
          });
          /**
          * [processUpdateTree description]
          * @param  [type]  [description]
          * @return [type]  [description]
          */
          scope.processUpdateTree = function(newList, itemDrag, newIndex, oldIndex){
            scope.treeDataCopy = angular.copy(scope.treeData);
            //find and remove itemold index in tree
            scope.isBreakFindAndRemoveOldIndex = false;
            scope.findAndRemoveItemIndexOld(scope.treeDataCopy, itemDrag);
            //insert oldItem to new index
            scope.insertOldItemToNewIndex(newList, scope.treeDataCopy, scope.itemSort, newIndex, oldIndex);
          };
          /**
          * [findAndRemoveItemIndexOld description]
          * @param  [type]  [description]
          * @return [type]  [description]
          */
          scope.findAndRemoveItemIndexOld = function(list, itemDrag) {
            for (var i = list.length - 1; i >= 0; i--) {
              //stop for when found index
              if (scope.isBreakFindAndRemoveOldIndex) {
                break;
              }
              var itemFor = list[i];
              if (itemFor.testSuiteId == itemDrag.testSuiteId) {
                scope.itemSort = itemFor;
                list.splice(i, 1);
                scope.isBreakFindAndRemoveOldIndex = true;
                break;
              } else if (itemFor.children.length > 0) {
                scope.findAndRemoveItemIndexOld(itemFor.children, itemDrag);
              }
            }
          };
          /**
          * [insertOldItemToNewIndex  description]
          * @param  [type] list, newItem [description]
          * @return [type]  [description]
          */
          scope.insertOldItemToNewIndex = function(newList, list, itemDrag, newIndex, oldIndex){
            if(newIndex === 0){
              itemDrag.parentId = null;
              itemDrag.level = 1;
              list.unshift(itemDrag);
            }else{
              // get item in newindex of real tree(scope.tree_rows)
              var itemIndexRealTree = newList[newIndex];
              // find parent node
              var length = newList.length;
              for (var i = 0; i < length; i++) {
                var itemFor = newList[i];
                if (itemFor.branch.testSuiteId == itemIndexRealTree.branch.parentId) {
                  itemDrag.parentId = itemFor.branch.testSuiteId;
                  itemDrag.level = itemIndexRealTree.level;
                  //insert item drag to newIndex of treeData
                  scope.isBreakInsertToNew = false;
                  scope.insertItemDragToNewIndex(itemFor, itemIndexRealTree, itemDrag, list, newIndex, oldIndex);
                  break;
                }
              }
            }

            scope.treeData = angular.copy(scope.treeDataCopy);
            

            scope.$digest();
            // set unselect all
            scope.tree_rows.forEach(function(item) {
              item.branch.selected = false;
            });
            scope.$digest();
          };
          /**
          * [insertItemDragToNewIndex description]
          * @param  [type]  [description]
          * @return [type]  [description]
          */
          scope.insertItemDragToNewIndex = function(itemParent, itemChild, itemDrag, treeData, newIndex, oldIndex) {
            for (var i = 0; i < treeData.length; i++) {
              if (scope.isBreakInsertToNew) {
                break;
              }
              var itemForTree = treeData[i];
              //find parent
              if (itemForTree.testSuiteId == itemParent.branch.testSuiteId) {
                // find child index
                for (var j = 0; j < itemForTree.children.length; j++) {
                  var itemForJ = itemForTree.children[j];
                  if (itemForJ.testSuiteId == itemChild.branch.testSuiteId) {
                    if(newIndex > oldIndex){
                      itemForTree.children.splice(j + 1, 0, itemDrag);
                    }else{
                      itemForTree.children.splice(j, 0, itemDrag);
                    }
                    scope.isBreakInsertToNew = true;
                    break;
                  }
                }
              } else if (itemForTree.children.length > 0) {
                scope.insertItemDragToNewIndex(itemParent, itemChild, itemDrag, itemForTree.children);
              }
            }
          };
          /**
          * [unlockDrag description]
          * @param  [type]  [description]
          * @return [type]  [description]
          */
          scope.unlockDrag = function() {
            $timeout(function(){
              angular.forEach(scope.tree_rows, function(itemChild) {
                itemChild.locked = false;
              })
            },1000); 
          };
          /**
          * [disbledToChild description]
          * @param  [type]  [description]
          * @return [type]  [description]
          */
          scope.lockDragToChild = function(list, item) {
            
            for (var i = 0; i < list.length; i++) {
              var itemFor = list[i].branch;
              if (itemFor.testSuiteId == item.testSuiteId) {
                list[i].locked = true;
                if(itemFor.children.length > 0){
                  for(var j = 0 ; j < itemFor.children.length ; j++){
                    var itemForJ = itemFor.children[j];
                         scope.lockDragToChild(list, itemForJ);
                  }
                }
                break;
              }
            }
          };
          /**
          * [keyInput description]
          * @param  [type]  [description]
          * @return [type]  [description]
          */
          scope.keyInput = function(e, row){
            if(e.keyCode == 13){
              scope.acceptEdit(row)
            }
          };
          if (scope.showActionBtn) {
            element.on('keyup', function(e) {
              if (e.keyCode == 113) {
                var length = scope.tree_rows.length;
                for (var i = 0; i < length; i++) {
                  var itemFor = scope.tree_rows[i];
                  if (itemFor.branch.selected) {
                    scope.showEdit(itemFor)
                    break;
                  }
                }
              }
              scope.$digest();
            });
            // scope.intervalFovus = setInterval(function() {
            //   $(element).find('li.active a').focus();
            // }, 1000);
          }
          scope.maxWidth = '100%';
          /**
          * [showEdit description]
          * @param  [type] index [description]
          * @return [type]  [description]
          */
          scope.showEdit = function(row) {
            row.showEditable = true;
            row.labelCopy = angular.copy(row.label);
          };
          /**
          * [cancelEdit description]
          * @param  [type]  [description]
          * @return [type]  [description]
          */
          scope.cancelEdit = function(row){
            row.showEditable = false;
          };
          /**
          * [acceptEdit description]
          * @param  [type] row [description]
          * @return [type]  [description]
          */
          scope.acceptEdit = function(row){
            scope.breakFindChildrenTreeAndRemove = false;
            scope.findChildrenTreeAndRename(scope.treeData, row.branch.testSuiteId, row);
            row.showEditable = false;
          };
          /**
           * [findChildrenTreeAndRename description]
           * @param  [type]  [description]
           * @return [type]  [description]
           */
          scope.findChildrenTreeAndRename = function(list, testSuiteId, row) {
            var length = list.length;
            for (var i = 0; i < length; i++) {
              if (scope.breakFindChildrenTreeAndRemove == true) {
                return;
              }
              var itemFor = list[i];
              if (itemFor.testSuiteId == testSuiteId) {
                itemFor.label = angular.copy(row.labelCopy);
                scope.breakFindChildrenTreeAndRemove = true;
                break;
              } else if (itemFor.children.length > 0) {
                scope.findChildrenTreeAndRename(itemFor.children, testSuiteId, row);
              }
            }
          };
          /**
          * [removeTreeBranch description]
          * @param  [type] row [description]
          * @return [type]  [description]
          */
          scope.removeTreeBranch = function(row){
            scope.removeAction({item:row.branch});
          };
          /**
          * [setWidthRow description]
          * @param  [type] row [description]
          * @return [type]  [description]
          */
          scope.setWidthRow = function(e) {
            scope.timeoutSetwidth = setTimeout(function() {
              $(element).find('li.active a').focus();
              var arr = angular.copy(scope.tree_rows)
              var level = Math.max.apply(Math, scope.tree_rows.map(function(o) {
                var level = 0;
                if (o.visible) {
                  level = o.level;
                }
                return level;
              }));
              if (level >= 3) {
                var widthAbnTree = element.find('ul.abn-tree-list')[0].offsetWidth;
                var currentWidh = ((level - 1) * 20) + 11 + element.find('ul.abn-tree-list .abn-tree-row.level-' + (level) + ' a span.tree-label')[0].offsetWidth;
                if (currentWidh > widthAbnTree) {
                  scope.maxWidth = (21 + currentWidh) + 'px';
                  element.find('ul.abn-tree-list .abn-tree-row a').css('width', scope.maxWidth);
                } else element.find('ul.abn-tree-list .abn-tree-row a').css('width', '100%');
              } else element.find('ul.abn-tree-list .abn-tree-row a').css('width', '100%');
            }, 100);
          };
          var error, expand_all_parents, expand_level, for_all_ancestors, for_each_branch, get_parent, n, on_treeData_change, select_branch, selected_branch, tree, on_initialSelection_change;
          error = function(s) {
            console.log('ERROR:' + s);
            debugger;
            return void 0;
          };
          element.bind("keydown keypress", function (event) {
              
              if(event.which === 38) { // up
                  //set focus next
                  var target = event.target.attributes.id.value;
                  target=parseInt(target)-1;
                  $("#"+target).focus();
                  tree.select_prev_branch();
              } else if (event.which === 40) { // down
                  var branch = tree.select_next_sibling();
                  //set focus next
                  var target = event.target.attributes.id.value;
                  target=parseInt(target)+1;
                  $("#"+target).focus(); 
              }else if (event.which === 37) { // left arrow
                  tree.collapse_branch();
                  if(selected_branch.testSuiteId == -1){
                      $("#0").focus();    
                  }else{
                      $("#"+selected_branch.idFocus).focus();
                  }
              }else if (event.which === 39) { // right arrow
                //check branch exist child
                  var  length = selected_branch.children.length;
                  if(length > 0){
                      var branch = tree.select_next_branch();
                      if(branch){
                          $timeout(function(){
                              //set focus next
                                 $("#"+selected_branch.idFocus).focus();
                            },105);
                      }
                  }
              }else if ((event.which === 13) || (event.which === 32)) { // enter and space
                  //console.log(event);
                  $timeout(function(){
                      return scope.eventEnter({
                          flag: true
                      });
                    });
              }else {
                return;
              }
              event.preventDefault();
            });
          
          if (attrs.iconExpand == null) {
            attrs.iconExpand = 'icon-plus  glyphicon glyphicon-plus  fa fa-plus';
          }
          if (attrs.iconCollapse == null) {
            //attrs.iconCollapse = 'icon-minus glyphicon glyphicon-minus fa fa-minus';
          }
          if (attrs.iconLeaf == null) {
            attrs.iconLeaf = 'icon-file  glyphicon glyphicon-file  fa fa-file';
          }
          if (attrs.expandLevel == null) {
            attrs.expandLevel = '3';
          }
          expand_level = parseInt(attrs.expandLevel, 10);
          if (!scope.treeData) {
            //alert('no treeData defined for the tree!');
            return;
          }
          if (scope.treeData.length == null) {
            if (treeData.label != null) {
              scope.treeData = [treeData];
            } else {
              //alert('treeData should be an array of root branches');
              return;
            }
          }
          for_each_branch = function(f) {
            var do_f, root_branch, _i, _len, _ref, _results;
            do_f = function(branch, level) {
              var child, _i, _len, _ref, _results;
              f(branch, level);
              if (branch.children != null) {
                _ref = branch.children;
                _results = [];
                for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                  child = _ref[_i];
                  _results.push(do_f(child, level + 1));
                }
                return _results;
              }
            };
            _ref = scope.treeData;
            _results = [];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              root_branch = _ref[_i];
              _results.push(do_f(root_branch, 1));
            }
            return _results;
          };
          selected_branch = null;
          select_branch = function(branch, e) {
            scope.setWidthRow(e);
            if (!branch) {
              if (selected_branch != null) {
                selected_branch.selected = false;
              }
              selected_branch = null;
              return;
            }
            if (branch !== selected_branch) {
              if (selected_branch != null) {
                selected_branch.selected = false;
              }
              branch.selected = true;
              selected_branch = branch;
              
              expand_all_parents(branch);
              if (branch.onSelect != null) {
                return $timeout(function() {
                  return branch.onSelect(branch);
                });
              } else {
                if (scope.onSelect != null) {
                  return $timeout(function() {
                    return scope.onSelect({
                      branch: branch
                    });
                  });
                }
              }
            }
          };
          scope.udlr = function(event){
              if (branch !== selected_branch) {
                  return select_branch(branch);
              }
          };
          scope.user_clicks_branch = function(branch) {
            if (branch !== selected_branch) {
              return select_branch(branch, event);
            }
          };
          get_parent = function(child) {
            var parent;
            parent = void 0;
            if(angular.isObject(child)){
                if (child.parent_uid) {
                    for_each_branch(function(b) {
                      if (b.uid === child.parent_uid) {
                        return parent = b;
                      }
                    });
                  }
            }
            return parent;
          };
          for_all_ancestors = function(child, fn) {
            var parent;
            parent = get_parent(child);
            if (parent != null) {
              fn(parent);
              return for_all_ancestors(parent, fn);
            }
          };
          expand_all_parents = function(child) {
            return for_all_ancestors(child, function(b) {
              return b.expanded = true;
            });
          };
          scope.tree_rows = [];
          on_treeData_change = function() {
            var add_branch_to_list, root_branch, _i, _len, _ref, _results;
            for_each_branch(function(b, level) {
              if (!b.uid) {
                return b.uid = "" + Math.random();
              }
            });
            console.log('UIDs are set.');
            for_each_branch(function(b) {
              var child, _i, _len, _ref, _results;
              if (angular.isArray(b.children)) {
                _ref = b.children;
                _results = [];
                for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                  child = _ref[_i];
                  _results.push(child.parent_uid = b.uid);
                }
                return _results;
              }
            });
            scope.tree_rows = [];
            for_each_branch(function(branch) {
              var child, f;
              if (branch.children) {
                if (branch.children.length > 0) {
                  f = function(e) {
                    if (typeof e === 'string') {
                      return {
                        label: e,
                        children: []
                      };
                    } else {
                      return e;
                    }
                  };
                  return branch.children = (function() {
                    var _i, _len, _ref, _results;
                    _ref = branch.children;
                    _results = [];
                    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                      child = _ref[_i];
                      _results.push(f(child));
                    }
                    return _results;
                  })();
                }
              } else {
                return branch.children = [];
              }
            });
            var idFocus = 1;
            add_branch_to_list = function(level, branch, visible) {
              var child, child_visible, tree_icon, _i, _len, _ref, _results;
              if (branch.expanded == null) {
                branch.expanded = false;
              }
              if (branch.classes == null) {
                branch.classes = [];
              }
              if (!branch.noLeaf && (!branch.children || branch.children.length === 0)) {
                tree_icon = attrs.iconLeaf;
                if (__indexOf.call(branch.classes, "leaf") < 0) {
                  branch.classes.push("leaf");
                }
              } else {
                if (branch.expanded) {
                  if(branch.selected){
                      tree_icon = attrs.iconCollapse1;    
                  }else{
                      tree_icon = attrs.iconCollapse;
                  }
                } else {
                  tree_icon = attrs.iconExpand;
                }
              }
              scope.tree_rows.push({
                level: level,
                branch: branch,
                label: branch.label,
                classes: branch.classes,
                tree_icon: tree_icon,
                visible: visible
              });
              if (branch.children != null) {
                _ref = branch.children;
                _results = [];
                for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                  child = _ref[_i];
                  child_visible = visible && branch.expanded;
                  child.show = child_visible;
                  //set id focus khi child_visible duoc chon 
                  if(child_visible){
                      child.idFocus = idFocus++;
                  }
                  _results.push(add_branch_to_list(level + 1, child, child_visible));
                }
                return _results;
              }
            };
            _ref = scope.treeData;
            _results = [];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              root_branch = _ref[_i];
              _results.push(add_branch_to_list(1, root_branch, true));
            }
            return _results;
          };
          scope.$watch('treeData', on_treeData_change, true);
          //check hidden plust
          flag_change = function(newVal, oldVal){
              if(!scope.hiddenPlust){
                  tree.collapse_all();
              }else{
                  tree.expand_all();
              }
          }
          scope.$watch('hiddenPlust',flag_change ,true);
          
          on_initialSelection_change = function(newVal, oldVal){
              if ( newVal ) {
                attrs.initialSelection = newVal
                if (attrs.initialSelection != null) {
                  for_each_branch(function(b) {
                    if (b.testSuiteId == attrs.initialSelection) {
                      //return $timeout(function() {
                        b.expanded = true;
                        return select_branch(b);
                      //});
                    }
                  });
                }
              }
            };
          scope.$watch('initialSelection', on_initialSelection_change, true);
          if (attrs.initialSelection != null) {
            for_each_branch(function(b) {
              if (b.label === attrs.initialSelection) {
                return $timeout(function() {
                  return select_branch(b);
                });
              }
            });
          }
          n = scope.treeData.length;
          console.log('num root branches = ' + n);
          for_each_branch(function(b, level) {
            b.level = level;
            return b.expanded = b.level < expand_level;
          });
          if (scope.treeControl != null) {
            if (angular.isObject(scope.treeControl)) {
              tree = scope.treeControl;
              tree.expand_all = function() {
                setTimeout(function() {
                  scope.setWidthRow();
                }, 100);
                /*return for_each_branch(function(b, level) {
                  return b.expanded = true;
                });*/
                  var listBranch = tree.get_first_branch();
                  var backBranch = selected_branch;
                  if(listBranch!=undefined){
                      for (i = 0; i < listBranch.children.length; i++){
                          if(listBranch.children[i].flag){
                              listBranch.children[i].expanded = true;
                              listBranch.children[i].flag = false;
                          }
                      }
                  }
              };
              tree.collapse_all = function() {
                setTimeout(function() {
                  scope.setWidthRow();
                }, 100);  
                /*return for_each_branch(function(b, level) {
                  return b.expanded = false;
                });*/
                  var listBranch = tree.get_first_branch();
                  var backBranch = selected_branch;
                  if(listBranch!=undefined){
                      for (i = 0; i < listBranch.children.length; i++){
                          if(listBranch.children[i].expanded){
                              listBranch.children[i].expanded = false;
                              listBranch.children[i].flag = true;
                          }
                      }
                  }
              };
              tree.get_first_branch = function() {
                n = scope.treeData.length;
                if (n > 0) {
                  return scope.treeData[0];
                }
              };
              tree.get_end_branch = function(b) {
                 // n = scope.treeData[0].children.length;
                  var lengthPa = scope.treeData.length;
                  if (lengthPa > 0) {
                    var lengthChild = scope.treeData[lengthPa - 1].children.length;
                    var endChild = scope.treeData[lengthPa-1].children[lengthChild-1];
                    if(endChild.expanded){
                        var lengthChild = endChild.children.length;
                       return endChild.children[lengthChild - 1];
                    }
                    return endChild;
                  }
                  
                };
              
              tree.select_first_branch = function() {
                var b;
                b = tree.get_first_branch();
                return tree.select_branch(b);
              };
              tree.get_selected_branch = function() {
                return selected_branch;
              };
              tree.get_parent_branch = function(b) {
                return get_parent(b);
              };
              tree.select_branch = function(b) {
                select_branch(b);
                return b;
              };
              tree.get_children = function(b) {
                return b.children;
              };
              tree.select_parent_branch = function(b) {
                var p;
                if (b == null) {
                  b = tree.get_selected_branch();
                }
                if (b != null) {
                  p = tree.get_parent_branch(b);
                  if (p != null) {
                    tree.select_branch(p);
                    return p;
                  }
                }
              };
              tree.add_branch = function(parent, new_branch) {
                if (parent != null) {
                  parent.children.push(new_branch);
                  parent.expanded = true;
                } else {
                  scope.treeData.push(new_branch);
                }
                return new_branch;
              };
              tree.add_root_branch = function(new_branch) {
                tree.add_branch(null, new_branch);
                return new_branch;
              };
              tree.expand_branch = function(b) {
                if (b == null) {
                  b = tree.get_selected_branch();
                }
                if (b != null) {
                  b.expanded = true;
                  return b;
                }
              };
              tree.collapse_branch = function(b) {
                if (b == null) {
                  b = selected_branch;
                }
                if(b.children.length == 0){
                    tree.select_parent_branch();
                }else{
                    if (b != null) {
                        if(b.expanded){
                            b.expanded = false;
                            selected_branch = null;
                            tree.select_branch(b);
                            return b;    
                        }else{
                            tree.select_parent_branch();
                        }
                      }    
                }
                
              };
             
              tree.get_siblings = function(b) {
                var p, siblings;
                if (b == null) {
                  b = selected_branch;
                }
                if (b != null) {
                  p = tree.get_parent_branch(b);
                  if (p) {
                    siblings = p.children;
                  } else {
                    siblings = scope.treeData;
                  }
                  return siblings;
                }
              };
              tree.get_next_sibling = function(b) {
                var i, siblings;
                if (b == null) {
                  b = selected_branch;
                }
                if (b != null) {
                  siblings = tree.get_siblings(b);
                  n = siblings.length;
                  i = siblings.indexOf(b);
                  if (i < n) {
                    return siblings[i + 1];
                  }
                }
              };
              tree.get_prev_sibling = function(b) {
                var i, siblings;
                if (b == null) {
                  b = selected_branch;
                }
                siblings = tree.get_siblings(b);
                n = siblings.length;
                i = siblings.indexOf(b);
                if (i > 0) {
                  return siblings[i - 1];
                }
              };
              tree.select_next_sibling = function(b) {
                var next;
                if (b == null) {
                  b = selected_branch;
                }
                if (b != null) {
                  //var endBranch = tree.get_end_branch(b);
                  var childBranch = tree.get_children(b);
                  //angular.isObject(childBranch) (endBranch.uid != b.uid) && (endBranch.testSuiteId != b.testSuiteId)
                  if(childBranch.length>0){
                      if(childBranch[0].show){
                          next = tree.get_next_sibling(b);
                          if(b.expanded){
                              return tree.select_next_branch(b);
                          }
                          if (next != null) {
                            return tree.select_branch(next);
                          }else{
                              next = tree.get_next_branch(b);
                              if(next.expanded){
                                  return tree.select_branch(next);                          
                              }else{
                                  var parent;
                                  var sib;
                                  do{
                                      parent = tree.get_parent_branch(b);
                                      if(parent == ''){
                                          return b;
                                      }
                                      sib = tree.get_next_sibling(parent);
                                      b = parent;
                                  }while(!angular.isObject(sib));
                                  
                                  return tree.select_branch(sib);
                              }
                              
                          }
                      }else{
                          tree.setEndBranchNext(b);
                      }
                  }else{
                      tree.setEndBranchNext(b);
                  }
                }
              };
              tree.setEndBranchNext = function(b){
                  var endBranch = tree.get_end_branch(b);
                  if(b.testSuiteId != -1){
                      if((endBranch.uid != b.uid) && (endBranch.testSuiteId != b.testSuiteId)){
                          next = tree.get_next_sibling(b);
                          if(b.expanded){
                              return tree.select_next_branch(b);
                          }
                          if (next != null) {
                            return tree.select_branch(next);
                          }else{
                              next = tree.get_next_branch(b);
                              if(next.expanded && (next.show===true)){
                                  return tree.select_branch(next);                          
                              }else{
                                  var parent;
                                  var sib;
                                  do{
                                      parent = tree.get_parent_branch(b);
                                      if(parent == ''){
                                          return b;
                                      }
                                      sib = tree.get_next_sibling(parent);
                                      b = parent;
                                  }while(!angular.isObject(sib));
                                  
                                  return tree.select_branch(sib);
                              }
                              
                          }
                      }
                  }
              };
              tree.select_prev_sibling = function(b) {
                var prev;
                if (b == null) {
                  b = selected_branch;
                }
                if (b != null) {
                  prev = tree.get_prev_sibling(b);
                  if (prev != null) {
                    return tree.select_branch(prev);
                  }
                }
              };
              tree.get_first_child = function(b) {
                var _ref;
                if (b == null) {
                  b = selected_branch;
                }
                if (b != null) {
                  if (((_ref = b.children) != null ? _ref.length : void 0) > 0) {
                    return b.children[0];
                  }
                }
              };
              tree.get_closest_ancestor_next_sibling = function(b) {
                var next, parent;
                next = tree.get_next_sibling(b);
                if (next != null) {
                  return next;
                } else {
                  //parent = tree.get_parent_branch(b);
                  //return tree.get_closest_ancestor_next_sibling(parent);
                    return b;
                }
              };
              tree.get_next_branch = function(b) {
                var next;
                if (b == null) {
                  b = selected_branch;
                }
                if (b != null) {
                  next = tree.get_first_child(b);
                  if (next != null) {
                    return next;
                  } else {
                    next = tree.get_closest_ancestor_next_sibling(b);
                    return next;
                  }
                }
              };
              tree.select_next_branch = function(b) {
                var next;
                if (b == null) {
                  b = selected_branch;
                }
                if (b != null) {
                  next = tree.get_next_branch(b);
                  if (next != null) {
                    tree.select_branch(next);
                    return next;
                  }
                }
              };
              tree.last_descendant = function(b) {
                var last_child;
                if (b == null) {
                  debugger;
                }
                n = b.children.length;
                if (n === 0) {
                  return b;
                } else {
                  last_child = b.children[n - 1];
                  if(last_child.expanded){
                      return tree.last_descendant(last_child);    
                  }else{
                      return last_child;
                  }
                  
                }
              };
              tree.get_prev_branch = function(b) {
                var parent, prev_sibling;
                if (b == null) {
                  b = selected_branch;
                }
                if (b != null) {
                  prev_sibling = tree.get_prev_sibling(b);
                  if (prev_sibling != null) {
                      if(prev_sibling.expanded){
                          return tree.last_descendant(prev_sibling);      
                      }else{
                          return tree.select_prev_sibling();
                      }
                    
                  } else {
                    parent = tree.get_parent_branch(b);
                    return parent;
                  }
                }
              };
              return tree.select_prev_branch = function(b) {
                var prev;
                if (b == null) {
                  b = selected_branch;
                }
                if (b != null) {
                  prev = tree.get_prev_branch(b);
                  if (prev != null) {
                    tree.select_branch(prev);
                    return prev;
                  }
                }
              };
            }
          }
        }
      };
    }
  ]);

}).call(this);
