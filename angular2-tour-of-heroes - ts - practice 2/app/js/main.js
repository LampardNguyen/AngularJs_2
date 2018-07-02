angular.module('taaModule', ['ui.router', 'ngAnimate', 'ui.bootstrap', 'gridshore.c3js.chart']).config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
	$stateProvider.state('login', {
		url: '/Login',
		templateUrl: 'app/views/login/_login.html',
		controller: 'LoginController',
		title: 'Login'
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
		url: '/TestManagement',
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
		title: 'Test Status List'
	});
	$stateProvider.state('main.testManagement.showDataImport', {
		url: '/ShowDataImport',
		views: {
			'content-tab': {
				templateUrl: 'app/views/testManagement/showDataImport/_showDataImport.html'
			}
		},
		title: 'Test Status List'
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