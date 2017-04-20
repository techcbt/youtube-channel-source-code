var app = angular.module("app", []);
app.controller("emp", ["$scope",function($scope){
	$scope.a = 10;
	$scope.b = 20;

	$scope.doSum = function(){		
		$scope.sum = parseInt($scope.a) + parseInt($scope.b);
	};
}]);