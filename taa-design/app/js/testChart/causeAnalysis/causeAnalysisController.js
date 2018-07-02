angular.module('taaModule').controller('CauseAnalysisController', ['$scope','causeAnalysisFactory', function($scope, causeAnalysisFactory) {
	$scope.m = causeAnalysisFactory;
}]);