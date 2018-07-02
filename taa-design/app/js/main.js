angular.module('taaModule', ['ui.router', 'ngAnimate', 'ui.bootstrap', 'gridshore.c3js.chart', 'angularBootstrapNavTree', 'xeditable', 'ngCkeditor']).config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
	$stateProvider.state('login', {
		url: '/Login',
		templateUrl: 'app/views/login/_login.html',
		controller: 'LoginController',
		title: 'Login'
	}).state('pwdReset', {
		url: '/PwdReset',
		templateUrl: 'app/views/PwdReset/_pwdReset.html',
		controller: 'PwdResetController',
		title: 'Reset password'
	}).state('main', {
		templateUrl: 'app/views/main/_main.html',
		controller: 'MainController'
	});
	$stateProvider.state('main.projectList', {
		url: '/ProjectList',
		views: {
			'content': {
				templateUrl: 'app/views/projectList/_projectList.html'
			}
		},
		title: 'Project List'
	});
	$stateProvider.state('main.projectDetail', {
		url: '/ProjectDetail',
		views: {
			'content': {
				templateUrl: 'app/views/projectDetail/_projectDetail.html'
			}
		},
		title: 'Project Detail'
	});
	$stateProvider.state('main.testManagement', {
		views: {
			'content': {
				templateUrl: 'app/views/testManagement/_testManagement.html'
			}
		},
		title: 'Test Management'
	});
	$stateProvider.state('main.testManagement.testStatusList', {
		url: '/TestStatusList',
		views: {
			'content-tab': {
				templateUrl: 'app/views/testManagement/testStatusList/_testStatusList.html'
			}
		},
		title: 'Test Status List'
	});
	$stateProvider.state('main.testManagement.import', {
		url: '/Import',
		views: {
			'content-tab': {
				templateUrl: 'app/views/testManagement/import/_import.html'
			}
		},
		title: 'Import'
	});
	$stateProvider.state('main.testManagement.showDataImport', {
		url: '/ShowDataImport',
		views: {
			'content-tab': {
				templateUrl: 'app/views/testManagement/showDataImport/_showDataImport.html'
			}
		},
		title: 'Show data imoprt'
	});
	$stateProvider.state('main.testChart', {
		views: {
			'content': {
				templateUrl: 'app/views/testChart/_testChart.html'
			}
		}
	});
	$stateProvider.state('main.testChart.testProgress', {
		url: '/TestProgress',
		views: {
			'content-chart': {
				templateUrl: 'app/views/testChart/testProgress/_testProgress.html'
			}
		},
		title: 'TestProgress'
	});
	$stateProvider.state('main.testChart.predictionProblem', {
		url: '/PredictionProblem',
		views: {
			'content-chart': {
				templateUrl: 'app/views/testChart/predictionProblem/_predictionProblem.html'
			}
		},
		title: 'TestProgress'
	});
	$stateProvider.state('main.testChart.causeAnalysis', {
		url: '/CauseAnalysis',
		views: {
			'content-chart': {
				templateUrl: 'app/views/testChart/causeAnalysis/_causeAnalysis.html'
			}
		},
		title: 'TestProgress'
	});
	$stateProvider.state('main.user', {
		url: '/User',
		views: {
			'content': {
				templateUrl: 'app/views/user/_user.html'
			}
		},
		title: 'User'
	});
	$stateProvider.state('main.userDetail', {
		url: '/UserDetail',
		views: {
			'content': {
				templateUrl: 'app/views/user/_userDetail.html'
			}
		},
		title: 'User Detail'
	});
	$stateProvider.state('main.group', {
		url: '/Group',
		views: {
			'content': {
				templateUrl: 'app/views/group/_group.html'
			}
		},
		title: 'Group'
	});
	$stateProvider.state('main.groupDetail', {
		url: '/GroupDetail',
		views: {
			'content': {
				templateUrl: 'app/views/group/_groupDetail.html'
			}
		},
		title: 'Group Detail'
	});
	$stateProvider.state('main.role', {
		url: '/Role',
		views: {
			'content': {
				templateUrl: 'app/views/role/_role.html'
			}
		},
		title: 'Role'
	});
	$stateProvider.state('main.requirement', {
		views: {
			'content': {
				templateUrl: 'app/views/requirement/_requirement.html'
			}
		},
		title: 'Requirement'
	});
	$stateProvider.state('main.requirement.list', {
		url: '/RequirementList',
		views: {
			'requirement': {
				templateUrl: 'app/views/requirement/requirementList/_requirementList.html'
			}
		},
		title: 'Requirement List'
	});
	$stateProvider.state('main.requirement.detail', {
		url: '/RequirementDetail',
		views: {
			'requirement': {
				templateUrl: 'app/views/requirement/requirementDetail/_requirementDetail.html'
			}
		},
		title: 'Requirement List'
	});
	$urlRouterProvider.otherwise('/Login');
	$locationProvider.html5Mode(true);
}]).controller('IndexController', ['$scope', '$state', function($scope, $state) {
	/**
	 * [init description]
	 * @param  [type] state [description]
	 * @return [type]  [description]
	 */
	$scope.init = function(state) {
		console.log(state);
		$state.go(state);
	};
}]);