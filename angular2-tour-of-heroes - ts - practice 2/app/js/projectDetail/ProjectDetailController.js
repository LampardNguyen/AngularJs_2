angular.module('taaModule').controller('ProjectDetailController', ['$scope', '$uibModal', 'commonService', 'ProjectDetailFactory', function($scope, $uibModal, commonService, ProjectDetailFactory) {
	$scope.m = ProjectDetailFactory;
	/**
	 * [init description]
	 * @param  [type]  [description]
	 * @return [type]  [description]
	 */
	$scope.init = function() {
		// get data list show
		$scope.m.optionShow = angular.copy(commonService.m.optionShow);
		//default select list show
		$scope.m.selectShowUserList = 10;
		//init member list
		$scope.m.memberList = [];
	};
	/**
	 * [functionName description]
	 * @param  [type] params [description]
	 * @return [type] body [description]
	 */
	$scope.openModalChooseUser = function() {
		$scope.m.userList = commonService.m.userList;
		var modalRemoveProject = $uibModal.open({
			controller: 'ProjectDetailController',
			templateUrl: 'modalChooseUser.html',
			size: 'lg'
		});
	};
	/**
	 * [openModalChooseRole description]
	 * @param  [type] item [description]
	 * @return [type]  [description]
	 */
	$scope.openModalChooseRole = function(item) {
		$scope.m.userSelected = item;
		var modalRemoveProject = $uibModal.open({
			controller: 'ProjectDetailController',
			templateUrl: 'modalChooseRole.html',
			size: 'sm',
			backdrop: false
		});
	};
	/**
	 * [chooseRole description]
	 * @param  [type] item [description]
	 * @return [type] body [description]
	 */
	$scope.chooseRole = function(item) {
		var newList = $scope.m.listRole.filter(function(item) {
			return (item.roleId == $scope.m.userSelected.roleId);
		});
		if (newList != null && newList.length > 0) {
			$scope.m.userSelected.roleName = newList[0].roleName;
		}
		$scope.m.userSelected.registered = true;
		$scope.$close();
	};
	/**
	 * [applyAddUser description]
	 * @param  [type]  [description]
	 * @return [type]  [description]
	 */
	$scope.applyAddUser = function() {
		$scope.m.memberList = [];
		$scope.m.userList.forEach(function(item) {
			if (item.registered) {
				$scope.m.memberList.push(item);
			}
		});
		$scope.$close();
	};
	/**
	 * [removeMember description]
	 * @param  [type] index [description]
	 * @return [type]  [description]
	 */
	$scope.removeMember = function(index, item) {
		$scope.m.memberList.splice(index, 1);
		for (var i = $scope.m.userList.length - 1; i >= 0; i--) {
			var itemFor = $scope.m.userList[i];
			if (item.userId == itemFor.userId) {
				itemFor.registered = false;
			}
		}
	};
	/**
	 * [changeRoleMember description]
	 * @param  [type] item [description]
	 * @return [type]  [description]
	 */
	$scope.changeRoleMember = function(item) {
		// get role name
		var newList = $scope.m.listRole.filter(function(itemRole) {
			return (item.roleId == itemRole.roleId);
		});
		if (newList != null && newList.length > 0) {
			item.roleName = newList[0].roleName;
		}
		// set role name for list user
		for (var i = $scope.m.userList.length - 1; i >= 0; i--) {
			var itemFor = $scope.m.userList[i];
			if (item.userId == itemFor.userId) {
				itemFor.roleName = item.roleName;
			}
		}
	};
	/**
	 * [clickCheckbox description]
	 * @param  [type] item [description]
	 * @return [type]  [description]
	 */
	$scope.clickCheckbox = function(item) {
		if (!item.roleId) {
			$scope.m.userSelected = item;
			var modalRemoveProject = $uibModal.open({
				controller: 'ProjectDetailController',
				templateUrl: 'modalChooseRole.html',
				size: 'sm',
				backdrop: false
			});
		}
	};
	/**
	 * [closeChooseRole description]
	 * @param  [type]  [description]
	 * @return [type]  [description]
	 */
	$scope.closeChooseRole = function() {
		if (!$scope.m.userSelected.roleId) {
			$scope.m.userSelected.registered = false;
		}
		$scope.$dismiss('cancel');
	};
}]);