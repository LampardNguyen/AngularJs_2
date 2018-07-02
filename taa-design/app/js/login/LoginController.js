angular.module('taaModule').controller('LoginController', ['$scope', 'commonService', '$state', function($scope, commonService, $state) {
	$scope.m = commonService;
	$scope.m.password = '';
	/**
	 * [sumbitLogin description]
	 * @param  [type]  [description]
	 * @return [type]  [description]
	 */
	$scope.sumbitLogin = function() {
		var params = {
			username: $scope.m.username,
			password: $scope.m.password
		}
		$scope.m.validateLogin = commonService.checkValidateLogin(params);
		if (!$scope.m.validateLogin && commonService.checkLogin(params)) {
			$state.go('main.projectList');
		}
	};
}]);