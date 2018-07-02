angular.module('taaModule').controller('RoleController', ['$scope', 'commonService', '$uibModal', 'RoleFactory', '$state', '$timeout', function($scope, commonService, $uibModal, RoleFactory, $state, $timeout) {
	$scope.m = RoleFactory;
	/**
	 * [scrollAnimate description]
	 * @param  [type] position [description]
	 * @return [type] body [description]
	 */
	$scope.scrollAnimate = function(position) {
		setTimeout(function() {
			$('.table-responsive-content').animate({
				scrollLeft: position
			}, 'slow');
		}, 500);
	};
	/**
	 * [init description]
	 * @param  [type]  [description]
	 * @return [type]  [description]
	 */
	$scope.init = function() {};
	/**
	 * [clickOnRemoveRole description]
	 * @param  [type] item [description]
	 * @return [type]  [description]
	 */
	$scope.clickOnRemoveRole = function(index) {
		$scope.m.selectedRoleIndex = index;
		var modalRemoveRole = $uibModal.open({
			controller: 'RoleController',
			templateUrl: 'modalConfirmRemoveRole.html',
			size: 'sm'
		});
	};
	/**
	 * [cancelRemoveRole description]
	 * @param  [type]  [description]
	 * @return [type]  [description]
	 */
	$scope.cancelRemoveRole = function() {
		$scope.$dismiss('cancel');
	};
	/**
	 * [confirmRemoveRole description]
	 * @param  [type]  [description]
	 * @return [type]  [description]
	 */
	$scope.confirmRemoveRole = function() {
		$scope.$close();
		$scope.m.listHeader.splice($scope.m.selectedRoleIndex, 1);
		$scope.m.listBody.forEach(function(item) {
			item.listRoleId.splice($scope.m.selectedRoleIndex, 1);
		});
	};
	/**
	 * [addNewRole description]
	 * @param  [type]  [description]
	 * @return [type]  [description]
	 */
	$scope.addNewRole = function() {
		$scope.m.status = 'new';
		$scope.m.listBody.forEach(function(item) {
			item.listRoleId.push({
				"roleId": null,
				"permissionId": null,
				"containt": false,
				"statusFlg": true
			})
		});
		$scope.scrollAnimate(9999);
	};
	/**
	 * [cancelAdd description]
	 * @param  [type]  [description]
	 * @return [type]  [description]
	 */
	$scope.cancelAdd = function() {
		$scope.m.status = null;
		$scope.m.listBody.forEach(function(item) {
			item.listRoleId.splice(item.listRoleId.length - 1, 1);
		});
	};
	/**
	 * [editRole description]
	 * @param  [type] item [description]
	 * @return [type]  [description]
	 */
	$scope.editRole = function(role, index) {
		$scope.m.status = 'edit';
		role.status = 'edit';
		$timeout(function() {
			$scope.m.listBody.forEach(function(item) {
				item.listRoleId[index].statusFlg = true;
			});
		}, 100);
		$scope.scrollAnimate($('.header-role-' + index).position().left);
	};
	/**
	 * [cancelEdit description]
	 * @param  [type] role, index [description]
	 * @return [type]  [description]
	 */
	$scope.cancelEdit = function(role, index) {
		$scope.m.status = null;
		role.status = null;
		$timeout(function() {
			$scope.m.listBody.forEach(function(item) {
				item.listRoleId[index].statusFlg = false;
			});
		}, 100);
	};
}]);