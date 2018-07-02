angular.module('taaModule').factory('predictionFactory', [function() {
	var model = {
		"datacolumnsScatter": [{
			"id": "y0",
			"type": "line",
			"color": "#4F81BD",
			"name": "性能テスト(FP:50)"
		}, {
			"id": "y1",
			"type": "line",
			"color": "#C7420E",
			"name": "負荷テスト\r\n(FP:30)"
		}, {
			"id": "y2",
			"type": "line",
			"color": "#82AE09",
			"name": "セキュリティテスト(FP:40)"
		}],
		"listScatterGridLineY": [0, 0.2, 0.4, 0.6, 0.8, 0, 0.2, 0.4, 0.6, 0.8, 1, 1.2],
		"listScatterXTickValue": [0, 0.2, 0.4, 0.6, 0.8, 1, 0, 0.2, 0.4, 0.6, 0.8, 1],
		"chartAxesValueXS": {
			"y0": "x0",
			"y1": "x1",
			"y2": "x2",
			"y3": "x3"
		},
		"dataColumns": [
			["x0", "0", "0.04", "0.06"],
			["y0", "0.02", "0.02", "0.02"],
			["x1", "0.03", "0.07", "0.1", "0.13", "0.17", "0.17", "0.17", "0.2", "0.23", "0.27", "0.3", "0.33"],
			["y1", "0", "0.03", "0.07", "0.1", "0.27", "0.27", "0.27", "0.27", "0.27", "0.27", "0.27", "0.27"],
			["x2", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0.05"],
			["y2", "0.1", "0.1", "0.1", "0.1", "0.1", "0.1", "0.1", "0.1", "0.1", "0.1", "0.1", "0.1"]
		],
		"regionXY": [{
			"axis": "x",
			"class": "regionXXX",
			"start": 0.6,
			"end": 0.7999999999999999
		}, {
			"axis": "y",
			"class": "regionXXX",
			"start": 0.5,
			"end": 0.7
		}, {
			"axis": "x",
			"class": "regionXXX",
			"start": 0.6,
			"end": 0.7999999999999999
		}, {
			"axis": "y",
			"class": "regionXXX",
			"start": 0.5,
			"end": 0.7
		}],
		"rangMaxY": 1,
		"rangMaxX": 1,
		"sizeWidthFlag": false,
		"form": {
			"regisDate": {
				"startDate": "2015/11/12",
				"endDate": "2015/12/25"
			},
			"scale": "",
			"snapShot": "2",
			"dateSnapShot": "2015/11/12",
			"targetValueIncident": 0.6,
			"targetZoneIncident": 0.1,
			"targetValueTest": 0.7,
			"targetZoneTest": 0.1
		},
		snapShot:1,
	};
	return model;
}]);