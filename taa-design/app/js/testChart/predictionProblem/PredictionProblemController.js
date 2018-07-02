angular.module('taaModule').controller('PredictionProblemController', ['$scope', 'predictionFactory', function($scope, predictionFactory) {
	$scope.m = predictionFactory;
}]);