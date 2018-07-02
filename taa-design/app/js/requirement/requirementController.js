angular.module('taaModule').controller('RequirementController', ['$scope', 'RequirementFactory', '$uibModal', '$state', function($scope, RequirementFactory, $uibModal, $state) {
	$scope.$state = $state;
	$scope.m = RequirementFactory;
	
	/**
	 * [init description]
	 * @param  [type]  [description]
	 * @return [type]  [description]
	 */
	$scope.init = function() {
		$scope.createTree($scope.m.lstTestSuite);
	};
	/**
	 * [showModalTagList description]
	 * @param  [type]  [description]
	 * @return [type]  [description]
	 */
	$scope.showModalTagList = function() {
		var modalListMember = $uibModal.open({
			controller: 'RequirementController',
			templateUrl: 'modalTagList.html',
			size: 'lg'
		});
	};
	/**
	 * [showModalRequirementClass description]
	 * @param  [type]  [description]
	 * @return [type]  [description]
	 */
	$scope.showModalRequirementClass = function() {
		var modalListMember = $uibModal.open({
			controller: 'RequirementController',
			templateUrl: 'modalRequirementClassEdit.html',
			size: 'lg'
		});
	};
	/**
	 * [createTree description]
	 * @param  [type] data [description]
	 * @return [type]  [description]
	 */
	$scope.createTree = function(data) {
		var dataTmp = angular.copy(data);
		var treeData = {
			"testSuiteId": 0,
			"testPlanId": null,
			"parentId": null,
			"label": "SystemEXE",
			"children": [],
			"planScaleValue": null,
			"actualScaleValue": null
		};
		$scope.setSubTree(treeData, dataTmp);
		// treeData.testSuiteId = -1;
		$scope.m.treeList2 = angular.copy([treeData]);
	};
	/**
	 * [setSubTree description]
	 * @param  [type] item, data [description]
	 * @return [type]  [description]
	 */
	$scope.setSubTree = function(item, dataTmp) {
		for (var i = dataTmp.length - 1; i >= 0; i--) {
			var itemFor = dataTmp[i];
			if (item.testSuiteId == itemFor.parentId) {
				if (item.children == '') {
					item.children = [];
				}
				itemFor.parentId = item.testSuiteId;
				item.children.push(itemFor);
				dataTmp.splice(i, 1);
				$scope.setSubTree(itemFor, dataTmp);
			}
		}
	};
	/**
	* [removeTagList description]
	* @param  [type]  [description]
	* @return [type]  [description]
	*/
	$scope.removeTagList = function(index, item){
		$scope.m.selectedTagIndex = index;
		var modalRemoveProject = $uibModal.open({
			controller: 'RequirementController',
			templateUrl: 'modalConfirmRemoveTaglist.html',
			size: 'sm'
		});
	};
	/**
	 * [cancelRemoveTagList description]
	 * @param  [type]  [description]
	 * @return [type]  [description]
	 */
	$scope.cancelRemoveTagList = function() {
		$scope.$dismiss('cancel');
	};
	/**
	 * [confirmRemoveTagList description]
	 * @param  [type]  [description]
	 * @return [type]  [description]
	 */
	$scope.confirmRemoveTagList = function() {
		$scope.$close();
		$scope.m.listTag.splice($scope.m.selectedProjectIndex, 1);
	};
	/**
	* [removeTreeTag description]
	* @param  [type]  [description]
	* @return [type]  [description]
	*/
	$scope.removeTreeTag = function(item){
		$scope.m.breakFindChildrenTreeAndRemove = false;
		$scope.m.selectedTreeTag = item;
		var modalRemoveProject = $uibModal.open({
			controller: 'RequirementController',
			templateUrl: 'modalConfirmRemoveTreeTaglist.html',
			size: 'sm'
		});
	};
	/**
	 * [cancelRemoveTreeTagList description]
	 * @param  [type]  [description]
	 * @return [type]  [description]
	 */
	$scope.cancelRemoveTreeTagList = function() {
		$scope.$dismiss('cancel');
	};
	/**
	 * [confirmRemoveTreeTagList description]
	 * @param  [type]  [description]
	 * @return [type]  [description]
	 */
	$scope.confirmRemoveTreeTagList = function() {
		$scope.$close();
		$scope.findChildrenTreeAndRemove($scope.m.treeList2, $scope.m.selectedTreeTag.testSuiteId);
	};
	/**
	* [findChildrenTreeAndRemove description]
	* @param  [type]  [description]
	* @return [type]  [description]
	*/
	$scope.findChildrenTreeAndRemove = function(list, testSuiteId){
		for (var i = list.length - 1; i >= 0; i--) {
			if($scope.m.breakFindChildrenTreeAndRemove == true){
				return;
			}
			var itemFor = list[i];
			if (itemFor.testSuiteId == testSuiteId) {
				list.splice(i, 1);
				$scope.m.breakFindChildrenTreeAndRemove = true;
				break;
			}else if(itemFor.children.length > 0){
				$scope.findChildrenTreeAndRemove(itemFor.children, testSuiteId);
			}
		}
	};	
}]);