angular.module('taaModule').controller('UserDetailController', ['$scope', 'UserFactory', function($scope, UserFactory) {
	$scope.m = UserFactory;
	/**
	* [init description]
	* @param  [type]  [description]
	* @return [type]  [description]
	*/
	$scope.init = function(){
		$scope.m.confirm = true;
	};
}]);