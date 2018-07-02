angular.module('taaModule').factory('GroupFactory', [function() {
	var model = {
		groupList: [{
			"groupId": "2",
			"groupName": "grouptest1",
			"validFlag": true,
			"version": 4,
			"userNumber": 5
		}, {
			"groupId": "1",
			"groupName": "システムエグゼ",
			"validFlag": true,
			"version": 11,
			"userNumber": 4
		}],
		kubun: [{
			name: '無効',
			value: false
		}, {
			name: '有効',
			value: true
		}],
		listLang: [{
			id: 0,
			name: 'Japanese(日本語)',
		}, {
			id: 1,
			name: 'English(英語)',
		}],
	};
	return model;
}]);