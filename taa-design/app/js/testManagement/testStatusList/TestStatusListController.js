angular.module('taaModule').controller('TestStatusListController', ['$scope', function($scope) {
	$scope.m = {
		listTestSuite: [{
			"projectId": 332,
			"testSuiteId": 1035,
			"testSuiteName": "単体テスト",
			"staffCount": 4,
			"noOfCasesCompleted": 3,
			"noOfCasesByPlans": 3,
			"noOfCases": 3,
			"completedRate": 100,
			"totalRatre": 100,
			"noOfPreDay": 1,
			"testStatusCd": 4,
			"testStatusName": "実施済み",
			"noOfInsidents": 2,
			"noOfInsidentsCompleted": 2,
			"noOfRemainingDays": 0,
			"planBeginDate": "2015/11/12",
			"planEndDate": "2015/11/14",
			"executionsBeginDate": "2015/11/12",
			"executionsEndDate": "2015/12/01",
			"flagClickable": true,
			"flagCollapse": true,
			"testNumberCompleted": 3,
			"testNumberPlan": 3,
			"testNumber": 3,
			"percentageTestNumberCompleted": 100,
			"percentageTestNumberPlan": 0,
			"percentageTestNumber": 0,
			"percentageTestPlanCurrent": 100,
			"achievementRate": 100,
			"overallProgress": 100,
			"digestionNumber": 1,
			"layDayMin": 0,
			"insident": 66,
			"convergenceRate": 100,
			"processStatusNameId": "success",
			"processStatusName": "実施済み",
			"datacolumnsBar": [{
				"color": "#FF5454",
				"name": "検出数　　:　　2 件"
			}, {
				"id": "bar-2",
				"type": "bar",
				"color": "#79C447",
				"name": "終了数　　:　　2 件"
			}, {
				"id": "bar-3",
				"type": "bar",
				"color": "#36A9E1",
				"name": "残数　　　:　　0 件"
			}],
			"datapointsBar": [{
				"x": 1,
				"bar-2": 2,
				"bar-3": 0
			}]
		}, {
			"projectId": 332,
			"testSuiteId": 1036,
			"testSuiteName": "結合テスト",
			"staffCount": 4,
			"noOfCasesCompleted": 10,
			"noOfCasesByPlans": 12,
			"noOfCases": 29,
			"completedRate": 83,
			"totalRatre": 34,
			"noOfPreDay": 1,
			"testStatusCd": 1,
			"testStatusName": "間に合わない",
			"noOfInsidents": 8,
			"noOfInsidentsCompleted": 5,
			"noOfRemainingDays": 18,
			"planBeginDate": "2015/11/16",
			"planEndDate": "2015/12/25",
			"executionsBeginDate": "2015/11/16",
			"executionsEndDate": "2015/11/27",
			"flagClickable": true,
			"flagCollapse": true,
			"testNumberCompleted": 10,
			"testNumberPlan": 12,
			"testNumber": 29,
			"percentageTestNumberCompleted": 34,
			"percentageTestNumberPlan": 7,
			"percentageTestNumber": 59,
			"percentageTestPlanCurrent": 41,
			"achievementRate": 83,
			"overallProgress": 34,
			"digestionNumber": 1,
			"layDayMin": 1,
			"insident": 80,
			"convergenceRate": 62,
			"processStatusNameId": "danger",
			"processStatusName": "間に合わない",
			"datacolumnsBar": [{
				"color": "#FF5454",
				"name": "検出数　　:　　8 件"
			}, {
				"id": "bar-2",
				"type": "bar",
				"color": "#79C447",
				"name": "終了数　　:　　5 件"
			}, {
				"id": "bar-3",
				"type": "bar",
				"color": "#36A9E1",
				"name": "残数　　　:　　3 件"
			}],
			"datapointsBar": [{
				"x": 1,
				"bar-2": 5,
				"bar-3": 3
			}]
		}, {
			"projectId": 332,
			"testSuiteId": 1037,
			"testSuiteName": "システムテスト",
			"staffCount": 4,
			"noOfCasesCompleted": 2,
			"noOfCasesByPlans": 5,
			"noOfCases": 5,
			"completedRate": 40,
			"totalRatre": 40,
			"noOfPreDay": 2,
			"testStatusCd": 2,
			"testStatusName": "実施中",
			"noOfInsidents": 4,
			"noOfInsidentsCompleted": 4,
			"noOfRemainingDays": 1,
			"planBeginDate": "2015/12/01",
			"planEndDate": "2015/12/01",
			"executionsBeginDate": "2015/12/01",
			"executionsEndDate": "2015/12/01",
			"flagClickable": true,
			"flagCollapse": true,
			"testNumberCompleted": 2,
			"testNumberPlan": 5,
			"testNumber": 5,
			"percentageTestNumberCompleted": 40,
			"percentageTestNumberPlan": 60,
			"percentageTestNumber": 0,
			"percentageTestPlanCurrent": 100,
			"achievementRate": 40,
			"overallProgress": 40,
			"digestionNumber": 2,
			"layDayMin": 0.5,
			"insident": 200,
			"convergenceRate": 100,
			"processStatusNameId": "primary",
			"processStatusName": "実施中",
			"datacolumnsBar": [{
				"color": "#FF5454",
				"name": "検出数　　:　　4 件"
			}, {
				"id": "bar-2",
				"type": "bar",
				"color": "#79C447",
				"name": "終了数　　:　　4 件"
			}, {
				"id": "bar-3",
				"type": "bar",
				"color": "#36A9E1",
				"name": "残数　　　:　　0 件"
			}],
			"datapointsBar": [{
				"x": 1,
				"bar-2": 4,
				"bar-3": 0
			}]
		}, {
			"projectId": 332,
			"testSuiteId": 1038,
			"testSuiteName": "性能テスト",
			"staffCount": 4,
			"noOfCasesCompleted": 0,
			"noOfCasesByPlans": 0,
			"noOfCases": 0,
			"completedRate": 0,
			"totalRatre": null,
			"noOfPreDay": null,
			"testStatusCd": 3,
			"testStatusName": "未実施",
			"noOfInsidents": 0,
			"noOfInsidentsCompleted": 0,
			"noOfRemainingDays": 0,
			"planBeginDate": null,
			"planEndDate": null,
			"executionsBeginDate": null,
			"executionsEndDate": null,
			"flagClickable": false,
			"flagCollapse": false,
			"testNumberCompleted": 0,
			"testNumberPlan": 0,
			"testNumber": 0,
			"percentageTestNumberCompleted": null,
			"percentageTestNumberPlan": null,
			"percentageTestNumber": null,
			"percentageTestPlanCurrent": null,
			"achievementRate": 0,
			"overallProgress": 0,
			"digestionNumber": 0,
			"layDayMin": 0,
			"insident": 0,
			"convergenceRate": 0,
			"processStatusNameId": "default",
			"processStatusName": "未実施",
			"datacolumnsBar": [{
				"color": "#FF5454",
				"name": "検出数　　:　　0 件"
			}, {
				"id": "bar-2",
				"type": "bar",
				"color": "#79C447",
				"name": "終了数　　:　　0 件"
			}, {
				"id": "bar-3",
				"type": "bar",
				"color": "#36A9E1",
				"name": "残数　　　:　　0 件"
			}],
			"datapointsBar": [{
				"x": 1,
				"bar-2": 0,
				"bar-3": 0
			}]
		}]
	}
}]);