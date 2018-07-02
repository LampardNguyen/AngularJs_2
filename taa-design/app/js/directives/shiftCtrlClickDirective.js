angular.module('taaModule').directive('ctrlShiftClick', function($parse) {
	var lastIndex = null;
	var lastLength = null;
	return {
		restrict: 'A',
		link: function(scope, iElement, iAttrs) {
			scope.dataList = $parse(iAttrs.ctrlShiftClick)(scope);
			// lastLength = angular.copy(scope.dataList.length);
			scope.$watch(iAttrs.ctrlShiftClick + '.length', function(newValue, oldValue) {
				if (newValue && oldValue) {
					scope.dataList = $parse(iAttrs.ctrlShiftClick)(scope);
					if (lastLength != scope.dataList.length) {
						lastLength = angular.copy(scope.dataList.length);
						angular.forEach(scope.dataList, function(item) {
							item.checked = false;
						})
						lastIndex = null;
					}
				}
			});
			iElement.find('td:not(.label-checkbox)').on('click', funcClick);

			function funcClick(e) {
				var index = angular.copy(+iAttrs.index);
				scope.$apply(function() {
					if (e.shiftKey && lastIndex !== null) {
						angular.forEach(scope.dataList, function(item) {
							item.checked = false;
						})
						var lastIndexTmp = angular.copy(lastIndex);
						var tmpIndex = angular.copy(lastIndexTmp);
						if (lastIndexTmp > index) {
							lastIndexTmp = angular.copy(index);
							index = angular.copy(tmpIndex);
						}
						for (var i = lastIndexTmp; i <= index; i++) {
							scope.dataList[i].checked = true;
						}
						// lastIndex = null;
					} else if (e.ctrlKey) {
						scope.dataList[+iAttrs.index].checked = !scope.dataList[+iAttrs.index].checked;
						lastIndex = +iAttrs.index;
					}
					// else if ((e.shiftKey && lastIndex === null)) {
					// 	scope.dataList[+iAttrs.index].checked = true;
					// 	lastIndex = +iAttrs.index;
					// }
					else {
						angular.forEach(scope.dataList, function(item) {
							item.checked = false;
						})
						scope.dataList[+iAttrs.index].checked = true;
						lastIndex = +iAttrs.index;
					}
				});
			};
		},
	};
});