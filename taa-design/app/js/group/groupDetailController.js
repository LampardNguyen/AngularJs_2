angular.module('taaModule').controller('GroupDetailController', ['$scope', 'GroupFactory', 'commonService', '$uibModal', function($scope, GroupFactory, commonService, $uibModal) {
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
	 * [functionName description]
	 * @param  [type] params [description]
	 * @return [type] body [description]
	 */
	$scope.openModalChooseUser = function() {
		$scope.m.selectShowUserList = 10;
		$scope.m.userList = commonService.m.userList;
		var modalRemoveProject = $uibModal.open({
			controller: 'GroupDetailController',
			templateUrl: 'modalChooseUser.html',
			size: 'lg'
		});
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
}]);