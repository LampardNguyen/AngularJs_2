angular.module('taaModule').controller('GroupController', ['$scope', 'commonService', '$uibModal', 'GroupFactory', '$state', function($scope, commonService, $uibModal, GroupFactory, $state) {
	$scope.m = GroupFactory;
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
	$scope.clickOnRemoveGroup = function(item, index) {
		$scope.m.selectedGroupIndex = index;
		var modalRemoveUser = $uibModal.open({
			controller: 'GroupController',
			templateUrl: 'modalConfirmRemoveGroup.html',
			size: 'sm'
		});
	};
	/**
	 * [cancelRemoveProject description]
	 * @param  [type]  [description]
	 * @return [type]  [description]
	 */
	$scope.cancelRemoveGroup = function() {
		$scope.$dismiss('cancel');
	};
	/**
	 * [confirmRemoveProject description]
	 * @param  [type]  [description]
	 * @return [type]  [description]
	 */
	$scope.confirmRemoveGroup = function() {
		$scope.$close();
		$scope.m.groupList.splice($scope.m.selectedGroupIndex, 1);
	};
	/**
	* [AddNewUser description]
	* @param  [type]  [description]
	* @return [type]  [description]
	*/
	$scope.AddNewGroup = function(){
		$state.go('main.groupDetail');
	};
	/**
	* [openModalUser description]
	* @param  [type]  [description]
	* @return [type]  [description]
	*/
	$scope.openModalUser = function(){
		var modalRemoveUser = $uibModal.open({
			controller: 'GroupController',
			templateUrl: 'modalUser.html',
			size: 'lg'
		});
	};
}]);