//directives support bindings to scope directly
var app = angular.module("app", []);

app.controller('emp', ['$scope', function($scope) {
	$scope.msg = "this is message"	;
}]);

app.directive('myInfoMsg', function() {
	return {
		template: "<strong>{{msg}}</strong>"
	};
});

