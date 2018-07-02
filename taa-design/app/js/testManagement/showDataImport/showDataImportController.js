angular.module('taaModule').controller('ShowDataImportController', ['$scope', '$window', function($scope, $window) {
	$scope.m = {};
	/**
	 * [init description]
	 * @param  [type]  [description]
	 * @return [type]  [description]
	 */
	$scope.init = function() {
		var testSuite = [{
				"id": 1,
				"text": "単体テスト"
			}, {
				"id": 1,
				"text": "結合テスト"
			}, {
				"id": 1031,
				"text": "システムテスト"
			}, {
				"id": 1032,
				"text": "シナリオテスト"
			}],
			testCase = [],
			testPlan = [];
		$('#hot').empty();
		var result = [{
			"importCode": null,
			"testPlanId": 863,
			"projectId": 333,
			"parentId": null,
			"testPlanName": "テスト計画名１",
			"testObjective": "テスト目的",
			"testObject": "テスト対象",
			"beginDate": "2016/04/01",
			"endDate": "2016/05/31",
			"staffCount": 2,
			"scaleUinitCode": 1,
			"approvals": null,
			"insidentDensityTargetValue": 0.5,
			"insidentDensityTargetZone": 0.1,
			"testDensityTargetValue": 0.3,
			"testDensityTargetZone": 0.1
		}];
		customizeTable.showTable(result.length, result, {}, 1, {}, {}, $window, testSuite, testCase, testPlan);
	};
}]);