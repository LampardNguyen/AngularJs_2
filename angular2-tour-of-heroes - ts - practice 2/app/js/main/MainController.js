angular.module('taaModule').controller('MainController', ['$scope', '$state', 'commonService', function($scope, $state, commonService) {
	$scope.m = commonService;
	/**
	 * [logout description]
	 * @param  [type] state [description]
	 * @return [type]  [description]
	 */
	$scope.logout = function(state) {
		$state.go(state);
	};
	/**
	 * [init description]
	 * @param  [type]  [description]
	 * @return [type]  [description]
	 */
	$scope.init = function() {};
}]);