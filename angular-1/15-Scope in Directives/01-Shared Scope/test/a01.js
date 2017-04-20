var app = angular.module('app', []);

app.controller('sample', ['$scope', function($scope) {

	$scope.a = 10;
	$scope.b = 20;

}]);

//shares/uses parent scope
//no scope on its own
//scope id is same for both parent (controller) and child (directive)
app.directive('message', function() {

	return {
		templateUrl: 'info-msg.htm'
	}

});