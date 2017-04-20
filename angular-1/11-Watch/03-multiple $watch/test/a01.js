var app = angular.module('app', []);

app.controller('emp', ['$scope', function($scope){
	$scope.a = 1;
	$scope.b = 2;
	$scope.c = 4;

	$scope.$watch('a', function(newValue, oldValue){ //watcher 4
		if(newValue != oldValue){
			$scope.b = $scope.a * 2;
		}		
	});

	$scope.$watch('b', function(newValue, oldValue){ //watcher 5
		if(newValue != oldValue){
			$scope.c = $scope.b * 2;
		}		
	});

	$scope.$watch('c', function(newValue, oldValue){ //watcher 6
		if(newValue != oldValue){
			console.log("updated C to " + newValue);
		}		
	});

}]);
