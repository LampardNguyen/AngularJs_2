angular.module('taaModule').factory('ProjectDetailFactory', [function() {
	var m = {
		listRole: [{
			"roleId": 1,
			"roleName": "テスト管理者"
		}, {
			"roleId": 2,
			"roleName": "テスト設計者"
		}, {
			"roleId": 3,
			"roleName": "テスター"
		}, {
			"roleId": 4,
			"roleName": "エンドユーザー"
		}, {
			"roleId": 5,
			"roleName": "初期"
		}, {
			"roleId": 7,
			"roleName": "テスト管理者1"
		}, {
			"roleId": 10,
			"roleName": "test"
		}, {
			"roleId": 11,
			"roleName": "test3"
		}, {
			"roleId": 25,
			"roleName": "addnew12"
		}]
	};
	return m;
}]);