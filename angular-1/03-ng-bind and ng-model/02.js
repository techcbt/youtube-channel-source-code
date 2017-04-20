var app = angular.module("app", []);
app.controller("emp", ["$scope", function($scope){
	$scope.a = 10;
	$scope.b = 20;

	$scope.doDoubleSum = function(){		
		$scope.a = $scope.a * 2;
		$scope.b = $scope.b * 2;
		$scope.sum = parseInt($scope.a) + parseInt($scope.b);
	};
}]);