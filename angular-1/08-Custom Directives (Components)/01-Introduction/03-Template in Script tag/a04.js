//directive template in a separate <script> tag
var app = angular.module("app", []);

app.controller('emp', ['$scope', function($scope) {
	$scope.msg = "this is message"	;
}]);

app.directive('myInfoMsg', function() {
	return {
		templateUrl: "my-info-msg.html"
	};
});

