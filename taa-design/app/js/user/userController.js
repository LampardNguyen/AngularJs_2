angular.module('taaModule').controller('UserController', ['$scope', 'commonService', '$uibModal', 'UserFactory', '$state', function($scope, commonService, $uibModal, UserFactory, $state) {
	$scope.m = UserFactory;
	/**
	 * [init description]
	 * @param  [type]  [description]
	 * @return [type]  [description]
	 */
	$scope.init = function() {
		// get data list show
		$scope.m.optionShow = angular.copy(commonService.m.optionShow);
		//default select list show
		$scope.m.selectShow = 10;
	};
	/**
	 * [clickOnRemoveUser description]
	 * @param  [type] item [description]
	 * @return [type]  [description]
	 */
	$scope.clickOnRemoveUser = function(item, index) {
		$scope.m.selectedUserIndex = index;
		var modalRemoveUser = $uibModal.open({
			controller: 'UserController',
			templateUrl: 'modalConfirmRemoveUser.html',
			size: 'sm'
		});
	};
	/**
	 * [cancelRemoveProject description]
	 * @param  [type]  [description]
	 * @return [type]  [description]
	 */
	$scope.cancelRemoveUser = function() {
		$scope.$dismiss('cancel');
	};
	/**
	 * [confirmRemoveProject description]
	 * @param  [type]  [description]
	 * @return [type]  [description]
	 */
	$scope.confirmRemoveUser = function() {
		$scope.$close();
		$scope.m.userList.splice($scope.m.selectedUserIndex, 1);
	};
	/**
	* [AddNewUser description]
	* @param  [type]  [description]
	* @return [type]  [description]
	*/
	$scope.AddNewUser = function(){
		$state.go('main.userDetail');
	};
}]);