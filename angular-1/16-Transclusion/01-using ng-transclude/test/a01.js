var app = angular.module('app', []);

app.controller('sample', ['$scope', function($scope) {


}]);

//works, but cannot contain inner content in markup
app.directive('message1', function(){
	return {
		templateUrl: 'msg1.htm'
	}
});

//works and can contain inner content in markup
app.directive('message2', function(){
	return {
		templateUrl: 'msg2.htm',
		transclude: true //in this case, it uses 'ng-transclude' in template
	}
});

