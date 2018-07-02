angular.module('taaModule').controller('ImportController', ['$scope', function($scope) {
	$scope.m = {};
	/**
	 * [openBrowser description]
	 * @param  [type]  [description]
	 * @return [type]  [description]
	 */
	$scope.openBrowser = function(event) {
		setTimeout(function() {
			angular.element('#fileZone').trigger('click');
		}, 100);
	};
}]);