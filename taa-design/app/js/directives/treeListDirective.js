angular.module('taaModule').directive('treeList', function($parse) {
	return {
		restrict: 'A',
		template: '<ul class="nav" ng-class="{\'child-menu\' : source[0].testSuiteId != 0}">'
					+ '<li ng-repeat="item in source | orderBy:\'testSuiteId\'" ng-class="{\'has-child\' : item.children.length > 0, \'active\': selected == item.testSuiteId, \'open-child\' : item.open}">'
						+ '<i ng-click="openChild(item)" ng-if="item.children.length > 0" class="glyphicon pull-left" ng-class="{\'glyphicon-chevron-down\':item.open, \'glyphicon-chevron-right\': !item.open}"></i><a ng-click="selectedItem(item)">'
							+ '<span class="text-long">{{item.label}}</span>'
						+ '</a>'
						+ '<div tree-list ng-if="item.open" selected="{{selected}}" source="item.children" on-selected="selectedItem(item)" class="slide-left" ></div>'
					+ '</li>'
				+ '</ul>',
		scope: {
			onSelected: '&',
			source: '=',
			selected: '@'
		},
		link: function(scope, iElement, iAttrs) {
			/**
			* [selectedItem description]
			* @param  [type] item [description]
			* @return [type]  [description]
			*/
			scope.selectedItem = function(item){
				var itemTmp = angular.copy(item);
				itemTmp.children = [];
				scope.onSelected({item:itemTmp});
			};
			/**
			* [openChild description]
			* @param  [type] item [description]
			* @return [type]  [description]
			*/
			scope.openChild = function(item){
				item.open = !item.open;
			};
		}
	};
});