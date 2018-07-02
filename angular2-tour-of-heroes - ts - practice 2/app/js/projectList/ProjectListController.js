angular.module('taaModule').controller('ProjectListController', ['$scope', 'commonService', 'ProjectListFactory', '$state', '$uibModal', function($scope, commonService, ProjectListFactory, $state, $uibModal) {
	$scope.m = ProjectListFactory;
	/**
	 * [init description]
	 * @param  [type] params [description]
	 * @return [type] [description]
	 */
	$scope.init = function(params) {
		// get data list show
		$scope.m.optionShow = angular.copy(commonService.m.optionShow);
		//default select list show
		$scope.m.selectShow = 10;
		commonService.getAllProject().then(function(result) {
			$scope.m.projectList = result;
		}, function(err) {});
	};
	/**
	 * [AddNewProject description]
	 * @param  [type]  [description]
	 * @return [type]  [description]
	 */
	$scope.AddNewProject = function() {
		$state.go('main.projectDetail');
	};
	/**
	 * [cancelRemoveProject description]
	 * @param  [type]  [description]
	 * @return [type]  [description]
	 */
	$scope.cancelRemoveProject = function() {
		$scope.$dismiss('cancel');
	};
	/**
	 * [confirmRemoveProject description]
	 * @param  [type]  [description]
	 * @return [type]  [description]
	 */
	$scope.confirmRemoveProject = function() {
		$scope.$close();
		$scope.m.projectList.splice($scope.m.selectedProjectIndex, 1);
	};
	/**
	 * [clickOnRemoveProject description]
	 * @param  [type] item [description]
	 * @return [type]  [description]
	 */
	$scope.clickOnRemoveProject = function(item, index) {
		$scope.m.selectedProjectIndex = index;
		var modalRemoveProject = $uibModal.open({
			controller: 'ProjectListController',
			templateUrl: 'modalConfirmRemoveProject.html',
			size: 'sm'
		});
	};
}]);