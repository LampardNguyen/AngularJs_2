angular.module('taaModule').controller('TestProgressController', ['$scope', 'TestProgressFactory', 'commonService', '$uibModal', function($scope, TestProgressFactory, commonService, $uibModal) {
	$scope.m = TestProgressFactory;
	/**
	 * [init description]
	 * @param  [type]  [description]
	 * @return [type]  [description]
	 */
	$scope.init = function() {
		// get data list show
		$scope.m.optionShow = angular.copy(commonService.m.optionShow);
		//default select list show
		$scope.m.selectShowUserList = 10;
	};
	/**
	 * [showInfo description]
	 * @param  [type] data [description]
	 * @return [type]  [description]
	 */
	$scope.showInfo = function(data) {
		if(data.value == 0){
			return;
		}
		var modalRemoveProject = $uibModal.open({
			controller: 'TestProgressController',
			templateUrl: 'modalInfo.html',
			size: 'lg'
		});
	};
}]);