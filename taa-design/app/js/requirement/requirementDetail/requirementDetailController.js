angular.module('taaModule').controller('RequirementDetailController', ['$scope', 'RequirementDetailFactory', '$uibModal', function($scope, RequirementDetailFactory, $uibModal) {
	$scope.m = RequirementDetailFactory;
	/**
	 * [init description]
	 * @param  [type]  [description]
	 * @return [type]  [description]
	 */
	$scope.init = function() {
		$scope.m.editorOptions = {
			language: 'ja',
			uiColor: '#000000',
			height: 250
		};
		$scope.createTree($scope.m.lstTestSuite);
	};
	/**
	 * [showModalRequirementClassEditDetail description]
	 * @param  [type]  [description]
	 * @return [type]  [description]
	 */
	$scope.showModalRequirementClassEditDetail = function() {
		var modalListMember = $uibModal.open({
			controller: 'RequirementDetailController',
			templateUrl: 'modalRequirementClassEdit-Detail.html',
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
		treeData.testSuiteId = -1;
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
				item.children.push(itemFor);
				dataTmp.splice(i, 1);
				$scope.setSubTree(itemFor, dataTmp);
			}
		}
	};
	/**
	* [showModalRequirementClassSelectDetail description]
	* @param  [type]  [description]
	* @return [type]  [description]
	*/
	$scope.showModalRequirementClassSelectDetail = function(){
		var modalListMember = $uibModal.open({
			controller: 'RequirementDetailController',
			templateUrl: 'modalRequirementClassSelect-Detail.html',
			size: 'lg'
		});
	};
	/**
	* [addTagList description]
	* @param  [type]  [description]
	* @return [type]  [description]
	*/
	$scope.addTagList = function(){
		$scope.m.tagList = [];
		$scope.m.classList.forEach(function(item){
		     if(item.registered){
		     	$scope.m.tagList.push(item);
		     }
		});
		$scope.$dismiss('cancel');
	};
}]);