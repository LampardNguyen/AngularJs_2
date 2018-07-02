angular.module('taaModule').directive('ngRightClick', function($parse) {
	return function(scope, element, attrs) {
		var itemRow = $parse(attrs.rowRightClick)(scope);
		var source = $parse(attrs.sourceRightClick)(scope);
		var fn = $parse(attrs.ngRightClick);
		element.bind('contextmenu', function(event) {
			if (!itemRow.checked) {
				angular.forEach(source, function(item) {
					item.checked = false;
				})
			}
			itemRow.checked = true;
			scope.$apply(function() {
				event.preventDefault();
				fn(scope, {
					$event: event
				});
			});
		});
	};
});
angular.module('taaModule').directive('checkClosePopup', function($parse, $document) {
	return {
		restrict: 'A',
		scope: {
			ngIf: '=',
			ngShow: '='
		},
		link: function(scope, iElement, iAttrs) {
			scope.eventName = 'click.' + iAttrs.id;
			if (iAttrs.ngShow) {
				scope.$watch('ngShow', function(newValue) {
					if (newValue == true) {
						scope.showHide(function(result) {
							scope.$apply(function() {
								scope.ngShow = result;
							});
						});
					} else {
						$document.off(scope.eventName);
					}
				});
			} else if (iAttrs.ngIf) {
				scope.$watch('ngIf', function(newValue) {
					if (newValue == true) {
						scope.showHide(function(result) {
							scope.ngIf = result;
							scope.$digest();
						});
					} else {
						$document.off(scope.eventName);
					}
				});
			}
			scope.getElement = function(element, target) {
				var ele = $(target).closest('div.contextmenu');
				if ((ele.data('id') == iAttrs.id && ele.length) || iAttrs.id == $(target).context.id) {
					return true;
				} else {
					return false;
				}
			};
			scope.showHide = function(fnCallback) {
				$document.on(scope.eventName, function(event) {
					var element = scope.getElement(iElement, event.target);
					var isShow = null;
					if (element) {
						isShow = true;
					} else {
						isShow = false;
						$document.off(scope.eventName);
					}
					(fnCallback || angular.noop)(isShow);
				});
			};
		}
	}
});