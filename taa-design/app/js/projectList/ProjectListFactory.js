angular.module('taaModule').factory('ProjectListFactory', [function() {
	var m = {
		knobColorList: ['#999', '#d9534f', '#337AB7', '#777777', '#5CB85C'],
		listMember: [{
			"userId": null,
			"userName": "h-seki",
			"firstName": "秀健",
			"lastName": "関",
			"groupName": "システムエグゼ",
			"roleId": null,
			"projectName": null,
			"projectId": null,
			"roleName": "テスト管理者"
		}, {
			"userId": null,
			"userName": "huy-du",
			"firstName": "NGUYEN",
			"lastName": "HUY DU",
			"groupName": null,
			"roleId": null,
			"projectName": null,
			"projectId": null,
			"roleName": "addnew12"
		}]
	};
	return m;
}]);