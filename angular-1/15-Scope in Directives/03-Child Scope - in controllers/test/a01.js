var app = angular.module('app', []);

app.controller('sample', ['$scope', function($scope) {

	$scope.a = 10;
	$scope.b = 20;

	$scope.o = {
		p: 100,
		q: 200
	}
}]);

app.controller('sample2', ['$scope', function($scope) {

	$scope.c = 30;
	$scope.d = 40;

}]);


