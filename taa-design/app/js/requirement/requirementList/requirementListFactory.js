angular.module('taaModule').factory('RequirementListFactory', [function() {
	var model = {
		showOption:true,
		width:250,
		showContextMenu: false,
		showCheckBox:true,
		prioritizeColorList: ['#CCECFF', '', '#FFCCFF', '#FF98FF', '#FF66FF'],
		lstTestSuite: [{
			"req_category_id": 1,
			"testSuiteId": 810,
			"testPlanId": 845,
			"parentId": 0,
			"label": "原因分析1000",
			"children": "",
			"planScaleValue": null,
			"actualScaleValue": null
		}, {
			"req_category_id": 2,
			"testSuiteId": 811,
			"testPlanId": 845,
			"parentId": 810,
			"label": "原因分析1000-1",
			"children": "",
			"planScaleValue": null,
			"actualScaleValue": null
		}, {
			"req_category_id": 3,
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
		plusMinus: true,
		listRequirementFiltered:[],
		listRequirement: [],
		listRequirementSource: [{
			id: 1,
			req_category_id: 1,
			checked: true,
			requirementsNo: '2016-001',
			requirementsName: 'PB曲線の表示',
			requirementsContents: 'ほげほげ1.要件○○○について',
			requirementsState: 'アイデア',
			requirementsPriority: '高め',
			requirementsPriorityId: '2',
			requirementsDetails: '要件詳細',
			testSuiteNumber: 11,
			listTag: [{
				tagId: 1,
				tagName: '性能問題'
			}, {
				tagId: 2,
				tagName: '高め'
			}, {
				tagId: 3,
				tagName: '高め'
			}, {
				tagId: 4,
				tagName: '高め'
			}]
		}, {
			id: 2,
			req_category_id: 1,
			checked: false,
			requirementsNo: '2016-002',
			requirementsName: '原因分析の表示',
			requirementsContents: 'ほげほげ1.要件○○○について',
			requirementsState: '作成中',
			requirementsPriority: '低め',
			requirementsPriorityId: '0',
			requirementsDetails: '要件詳細',
			testSuiteNumber: 10,
			listTag: [{
				tagId: 1,
				tagName: 'アイデア'
			}, {
				tagId: 5,
				tagName: '高め'
			}, {
				tagId: 6,
				tagName: '高め'
			}, {
				tagId: 7,
				tagName: '高め'
			}]
		}, {
			id: 3,
			req_category_id: 1,
			checked: false,
			requirementsNo: '2016-003',
			requirementsName: '○○○の△△△を□□□する',
			requirementsContents: 'ほげほげ1.要件○○○について',
			requirementsState: '作成済',
			requirementsPriority: '高め',
			requirementsPriorityId: '2',
			requirementsDetails: '要件詳細',
			testSuiteNumber: 11,
			listTag: []
		}, {
			id: 4,
			req_category_id: 1,
			checked: false,
			requirementsNo: '2016-004',
			requirementsName: 'PB曲線の表示',
			requirementsContents: 'ほげほげ1.要件○○○について',
			requirementsState: '確定',
			requirementsPriority: '通常',
			requirementsPriorityId: '1',
			requirementsDetails: '要件詳細',
			testSuiteNumber: 5,
			listTag: [{
				tagId: 3,
				tagName: 'セキュリティ'
			}, {
				tagId: 5,
				tagName: '高め'
			}, {
				tagId: 6,
				tagName: '高め'
			}, {
				tagId: 9,
				tagName: '高め'
			}]
		}, {
			id: 5,
			req_category_id: 1,
			checked: false,
			requirementsNo: '2016-005',
			requirementsName: 'PB曲線の表示',
			requirementsContents: 'ほげほげ1.要件○○○について',
			requirementsState: 'アイデア',
			requirementsPriority: '低め',
			requirementsPriorityId: '0',
			requirementsDetails: '要件詳細',
			testSuiteNumber: 11,
			listTag: [{
				tagId: 1,
				tagName: 'タグ１'
			}, {
				tagId: 2,
				tagName: '高め'
			}, {
				tagId: 3,
				tagName: '高め'
			}, {
				tagId: 4,
				tagName: '高め'
			}]
		}, {
			id: 6,
			req_category_id: 2,
			checked: false,
			requirementsNo: '2016-005',
			requirementsName: 'PB曲線の表示',
			requirementsContents: 'ほげほげ1.要件○○○について',
			requirementsState: '確定',
			requirementsPriority: '今すぐ',
			requirementsPriorityId: '4',
			requirementsDetails: '要件詳細',
			testSuiteNumber: 11,
			listTag: []
		}, {
			id: 7,
			req_category_id: 2,
			checked: false,
			requirementsNo: '2016-006',
			requirementsName: 'PB曲線の表示',
			requirementsContents: 'ほげほげ1.要件○○○について',
			requirementsState: 'アイデア',
			requirementsPriority: '通常',
			requirementsPriorityId: '1',
			requirementsDetails: '要件詳細',
			testSuiteNumber: 3,
			listTag: []
		}, {
			id: 8,
			req_category_id: 2,
			checked: false,
			requirementsNo: '2016-007',
			requirementsName: 'PB曲線の表示',
			requirementsContents: 'ほげほげ1.要件○○○について',
			requirementsState: '確定',
			requirementsPriority: '通常',
			requirementsPriorityId: '1',
			requirementsDetails: '要件詳細',
			testSuiteNumber: 8,
			listTag: [{
				tagId: 1,
				tagName: 'タグ2'
			}, {
				tagId: 2,
				tagName: '高め'
			}, {
				tagId: 3,
				tagName: '高め'
			}, {
				tagId: 4,
				tagName: '高め'
			}]
		}, {
			id: 9,
			req_category_id: 2,
			checked: false,
			requirementsNo: '2016-008',
			requirementsName: 'PB曲線の表示',
			requirementsContents: 'ほげほげ1.要件○○○について',
			requirementsState: 'アイデア',
			requirementsPriority: '今すぐ',
			requirementsPriorityId: '4',
			requirementsDetails: '要件詳細',
			testSuiteNumber: 34,
			listTag: [{
				tagId: 1,
				tagName: 'タグ3'
			}, {
				tagId: 2,
				tagName: '高め'
			}, {
				tagId: 3,
				tagName: '高め'
			}, {
				tagId: 4,
				tagName: '高め'
			}]
		}, {
			id: 10,
			req_category_id: 2,
			checked: false,
			requirementsNo: '2016-009',
			requirementsName: 'PB曲線の表示',
			requirementsContents: 'ほげほげ1.要件○○○について',
			requirementsState: '完了',
			requirementsPriority: '低め',
			requirementsPriorityId: '0',
			requirementsDetails: '要件詳細',
			testSuiteNumber: 11,
			listTag: []
		}, {
			id: 11,
			req_category_id: 2,
			checked: false,
			requirementsNo: '2016-0010',
			requirementsName: 'PB曲線の表示',
			requirementsContents: 'ほげほげ1.要件○○○について',
			requirementsState: 'アイデア',
			requirementsPriority: '今すぐ',
			requirementsPriorityId: '4',
			requirementsDetails: '要件詳細',
			testSuiteNumber: 21,
			listTag: []
		}, {
			id: 12,
			req_category_id: 3,
			checked: false,
			requirementsNo: '2016-0011',
			requirementsName: 'PB曲線の表示',
			requirementsContents: 'ほげほげ1.要件○○○について',
			requirementsState: '確定',
			requirementsPriority: '低め',
			requirementsPriorityId: '0',
			requirementsDetails: '要件詳細',
			testSuiteNumber: 1,
			listTag: []
		}, {
			id: 13,
			req_category_id: 3,
			checked: false,
			requirementsNo: '2016-0012',
			requirementsName: 'PB曲線の表示',
			requirementsContents: 'ほげほげ1.要件○○○について',
			requirementsState: '完了',
			requirementsPriority: '低め',
			requirementsPriorityId: '0',
			requirementsDetails: '要件詳細',
			testSuiteNumber: 87,
			listTag: [{
				tagId: 1,
				tagName: '業務課XXXさん'
			}, {
				tagId: 2,
				tagName: '高め'
			}, {
				tagId: 3,
				tagName: '高め'
			}, {
				tagId: 4,
				tagName: '高め'
			}]
		}, {
			id: 14,
			req_category_id: 3,
			checked: false,
			requirementsNo: '2016-0011',
			requirementsName: 'PB曲線の表示',
			requirementsContents: 'ほげほげ1.要件○○○について',
			requirementsState: '確定',
			requirementsPriority: '急いで',
			requirementsPriorityId: '3',
			requirementsDetails: '要件詳細',
			testSuiteNumber: 1,
			listTag: []
		}],
		currentEdit: {
			name: 'SystemEXE'
		},
		classList: [{
			tagId: 1,
			tagName: '性能問題',
			requiment: 10,
			testSuite: 10,
			insident: 300
		}, {
			tagId: 2,
			tagName: '業務課XXXさん',
			requiment: 2,
			testSuite: 5,
			insident: 10
		}, {
			tagId: 3,
			tagName: 'セキュリティ',
			requiment: 9,
			testSuite: 9,
			insident: 90
		}, {
			tagId: 4,
			tagName: 'アイディア',
			requiment: 2,
			testSuite: 0,
			insident: 0
		}, {
			tagId: 5,
			tagName: 'タグ１',
			requiment: 0,
			testSuite: 0,
			insident: 0
		}, {
			tagId: 6,
			tagName: 'タグ２',
			requiment: 2,
			testSuite: 2,
			insident: 0
		}, {
			tagId: 7,
			tagName: 'タグ３',
			requiment: 3,
			testSuite: 3,
			insident: 0
		}, {
			tagId: 8,
			tagName: 'タグ４',
			requiment: 4,
			testSuite: 4,
			insident: 0
		}, {
			tagId: 9,
			tagName: 'タグ５',
			requiment: 5,
			testSuite: 5,
			insident: 0
		}, {
			tagId: 10,
			tagName: 'タグ６',
			requiment: 6,
			testSuite: 6,
			insident: 0
		}],
		optionColumn: [{
			id: '$',
			name: '---'
		}, {
			id: 'requirementsNo',
			name: '要件No'
		}, {
			id: 'requirementsName',
			name: '要件名'
		}, {
			id: 'requirementsContents',
			name: '要件内容'
		}, {
			id: 'requirementsState',
			name: '要件状態'
		}, {
			id: 'requirementsPriority',
			name: '要件優先度'
		}, {
			id: 'testSuiteNumber',
			name: 'テストスイート件数'
		}],
		columnSearch: {},
		search: '',
	};
	return model;
}]);