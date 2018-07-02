angular.module('taaModule').controller('TestManagementController', ['$scope', '$state', function($scope, $state) {
	$scope.$state = $state;
	$scope.m = {
		listStatusName:['デフォルト','間に合わない','実施中','未実施','実施済み','すべて']
	}
}]);