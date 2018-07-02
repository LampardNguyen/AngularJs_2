angular.module('taaModule').factory('causeAnalysisFactory', [function() {
	var model = {
		"datapointsBarLine": [{
			"x": "異常終了",
			"bar": 1,
			"line1": "100"
		}, {
			"x": "異常終了",
			"bar": 1,
			"line1": "100"
		}],
		"datacolumnsBarLine": [{
			"id": "bar",
			"type": "bar",
			"color": "#4F81BD",
			"name": "インシデント数"
		}, {
			"id": "line1",
			"type": "line",
			"color": "#D0084B",
			"name": "累積比率"
		}],
		"dataxBL": {
			"id": "x"
		},
		"listBarAndLineGridLineY": [0, 1, 0, 1],
		"listChartAxisY2Tick": [0, 20, 40, 60, 80, 100, 120],
		"sizeWidthFlag": false,
		"typeProcess": [{
			"index": 0,
			"value": "事象"
		}, {
			"index": 1,
			"value": "原因"
		}, {
			"index": 2,
			"value": "工程"
		}, {
			"index": 3,
			"value": "テスト担当者"
		}],
	};
	return model;
}]);