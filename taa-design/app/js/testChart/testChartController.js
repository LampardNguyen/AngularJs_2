angular.module('taaModule').controller('TestChartController', ['$scope', '$state', function($scope, $state) {
	$scope.m = {
		lstTestSuite: [{
			"testSuiteId": 810,
			"testPlanId": 845,
			"parentId": 0,
			"label": "原因分析1000",
			"children": "",
			"planScaleValue": null,
			"actualScaleValue": null
		}, {
			"testSuiteId": 811,
			"testPlanId": 845,
			"parentId": 810,
			"label": "原因分析1000-1",
			"children": "",
			"planScaleValue": null,
			"actualScaleValue": null
		}, {
			"testSuiteId": 812,
			"testPlanId": 845,
			"parentId": 810,
			"label": "原因分析1000-2",
			"children": "",
			"planScaleValue": null,
			"actualScaleValue": null
		}, {
			"testSuiteId": 813,
			"testPlanId": 845,
			"parentId": 0,
			"label": "データパターン1",
			"children": "",
			"planScaleValue": null,
			"actualScaleValue": null
		}, {
			"testSuiteId": 814,
			"testPlanId": 845,
			"parentId": 0,
			"label": "データパターン2",
			"children": "",
			"planScaleValue": null,
			"actualScaleValue": null
		}, {
			"testSuiteId": 815,
			"testPlanId": 845,
			"parentId": 0,
			"label": "データパターン3",
			"children": "",
			"planScaleValue": null,
			"actualScaleValue": null
		}, {
			"testSuiteId": 816,
			"testPlanId": 845,
			"parentId": 0,
			"label": "データパターン4",
			"children": "",
			"planScaleValue": null,
			"actualScaleValue": null
		}, {
			"testSuiteId": 817,
			"testPlanId": 845,
			"parentId": 816,
			"label": "データパターン4-1",
			"children": "",
			"planScaleValue": null,
			"actualScaleValue": null
		}, {
			"testSuiteId": 818,
			"testPlanId": 845,
			"parentId": 817,
			"label": "データパターン4-1-1",
			"children": "",
			"planScaleValue": null,
			"actualScaleValue": null
		}, {
			"testSuiteId": 819,
			"testPlanId": 845,
			"parentId": 818,
			"label": "データパターン4-1-1-1",
			"children": "",
			"planScaleValue": null,
			"actualScaleValue": null
		}, {
			"testSuiteId": 820,
			"testPlanId": 845,
			"parentId": 819,
			"label": "データパターン4-1-1-1-1",
			"children": "",
			"planScaleValue": null,
			"actualScaleValue": null
		}],
		testSuiteIdSelected: null,
		naviTree: {},
		initial: '',
		plusMinus: true
	};
	$scope.$state = $state;
	/**
	 * [init description]
	 * @param  [type]  [description]
	 * @return [type]  [description]
	 */
	$scope.init = function() {
		$scope.createTree($scope.m.lstTestSuite);
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
		$scope.m.treeList = [treeData]
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
		console.log('ccccccccccccccccccccccc', branch);
	};
	//event enter
	$scope.eventEnter = function(flag) {
		
	};
}]);