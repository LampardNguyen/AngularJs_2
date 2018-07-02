angular.module('taaModule').controller('MainController', ['$scope', '$state', 'commonService', '$uibModal', function($scope, $state, commonService, $uibModal) {
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
	/**
	 * [configUser description]
	 * @param  [type]  [description]
	 * @return [type]  [description]
	 */
	$scope.configUser = function() {
		$scope.m.listLang = [{
			id: 0,
			name: 'Japanese(日本語)',
		}, {
			id: 1,
			name: 'English(英語)',
		}];
		var modalListMember = $uibModal.open({
			controller: 'MainController',
			templateUrl: 'modalUserConfig.html',
			size: 'lg'
		});
	};
}]);