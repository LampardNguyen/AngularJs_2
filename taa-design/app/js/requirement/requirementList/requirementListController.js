angular.module('taaModule').controller('RequirementListController', ['$scope', 'RequirementListFactory', 'commonService', '$uibModal', '$filter', function($scope, RequirementListFactory, commonService, $uibModal, $filter) {
	$scope.m = RequirementListFactory;
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
		$scope.createTree($scope.m.lstTestSuite);
		// default optionColumn
		$scope.m.selectColumn = '$';

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
		$scope.m.treeList = angular.copy([treeData]);
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
	 * [selectedTestSuit description]
	 * @param  [type] item [description]
	 * @return [type]  [description]
	 */
	$scope.selectedTestSuit = function(item) {
		$scope.m.testSuiteIdSelected = item.testSuiteId;
	};
	$scope.naviTreeHandler = function(branch) {
		$scope.m.arrCategory = [];
		$scope.getCategory(branch);
		var listRequirement = [];
		$scope.m.arrCategory.forEach(function(item) {
			var objectFilter = $filter('filter')($scope.m.listRequirementSource, {
				'req_category_id': item
			});
			if (angular.isDefined(objectFilter) && objectFilter != null && objectFilter.length > 0) {
				listRequirement = listRequirement.concat(objectFilter);
			}
		});
		$scope.m.listRequirement = listRequirement;
	};
	/**
	 * [getCategory description]
	 * @param  [type] item [description]
	 * @return [type]  [description]
	 */
	$scope.getCategory = function(branch) {
		if (branch.req_category_id) {
			$scope.m.arrCategory.push(branch.req_category_id);
		}
		if (branch.children.length > 0) {
			branch.children.forEach(function(itemBranch) {
				$scope.getCategory(itemBranch);
			});
		}
	};
	//event enter
	$scope.eventEnter = function(flag) {};
	/**
	 * [changeAllRow description]
	 * @param  [type]  [description]
	 * @return [type]  [description]
	 */
	$scope.changeAllRow = function() {
		angular.forEach($scope.m.listRequirement, function(item) {
			item.checked = $scope.m.checkAll;
		})
	};
	/**
	 * [openModalRequirementClassSelect description]
	 * @param  [type]  [description]
	 * @return [type]  [description]
	 */
	$scope.openModalRequirementClassSelect = function(indexRow, listTag) {
		var modalListMember = $uibModal.open({
			controller: 'RequirementListController',
			templateUrl: 'modalRequirementClassSelect.html',
			size: 'lg'
		});
		$scope.m.currentRowIndex = indexRow;
		$scope.m.classList.forEach(function(itemChild) {
			itemChild.registered = false;
		});
		listTag.forEach(function(item) {
			for (var i = $scope.m.classList.length - 1; i >= 0; i--) {
				var forItem = $scope.m.classList[i];
				if (forItem.tagId == item.tagId) {
					forItem.registered = true;
				}
			}
		});
		$scope.showOnlyCheck();
	};
	/**
	 * [acceptChangeTaglist description]
	 * @param  [type]  [description]
	 * @return [type]  [description]
	 */
	$scope.acceptChangeTaglist = function() {
		var taglist = [];
		$scope.m.classListFilter.forEach(function(item) {
			if (item.registered) {
				taglist.push({
					tagId: item.tagId,
					tagName: item.tagName
				})
			}
		});
		$scope.m.listRequirement[$scope.m.currentRowIndex].listTag = taglist;
		$scope.$dismiss('cancel');
	};
	/**
	 * [openContext description]
	 * @param  [type]  [description]
	 * @return [type]  [description]
	 */
	$scope.openContext = function() {
		$scope.m.showContextMenu = true;
		$('.contextmenu.context-requirement-list').css({
			'top': event.y,
			'left': event.x
		});
	};
	/**
	 * [checkDisabled description]
	 * @param  [type]  [description]
	 * @return [type]  [description]
	 */
	$scope.checkDisabled = function() {
		return $scope.m.listRequirement.some(function(item) {
			return (item.checked == true);
		});
	};
	/**
	 * [showOnlyCheck description]
	 * @param  [type]  [description]
	 * @return [type]  [description]
	 */
	$scope.showOnlyCheck = function() {
		if ($scope.m.tagRegistered) {
			$scope.m.classListFilter = $filter('filter')($scope.m.classList, {
				'registered': $scope.m.tagRegistered
			});
		} else {
			$scope.m.classListFilter = angular.copy($scope.m.classList);
		}
	};
	/**
	* [openModalEditStageChange description]
	* @param  [type]  [description]
	* @return [type]  [description]
	*/
	$scope.openModalEditStageChange = function(){
		$uibModal.open({
			controller: 'RequirementListController',
			templateUrl: 'modalEditStageChange.html',
			size: 'lg'
		});
	};
}]);