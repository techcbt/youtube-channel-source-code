var app = angular.module('app', []);

app.controller('emp', ['$scope', function($scope){
	$scope.o = {
		a: 1,
		b: 2,
		c: 4
	};

	// //following would not work (watches on reference, but not on properties)
	// $scope.$watch('o', function(newValue, oldValue){ 
	// 	if(newValue != oldValue){
	// 		$scope.o.c = $scope.o.a * $scope.o.b;
	// 	}		
	// }); //reference watch


	// //following works (watches on properties and even nested objects)
	// $scope.$watch('o', function(newValue, oldValue){ 
	// 	if(newValue != oldValue){
	// 		$scope.o.c = $scope.o.a * $scope.o.b;
	// 	}		
	// }, true); //deep watch or equality watch


	//following works (individual watches on primitives)
	$scope.$watchGroup(['o.a', 'o.b'], function(newValue, oldValue){ 
		if(newValue != oldValue){
			$scope.o.c = $scope.o.a * $scope.o.b;
		}		
	}); //still reference watch

}]);
