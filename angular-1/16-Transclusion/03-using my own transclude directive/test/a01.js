var app = angular.module('app', []);

app.controller('sample', ['$scope', function($scope) {


}]);

app.directive('message4', function(){
	return {
		templateUrl: 'msg4.htm',
		transclude: true
	}
});

//my own transclude directive - similar to ng-transclude
app.directive('myTransclude', function(){
	return {
		link: function(scope, el, attr, ctrl, transclude){
			el.append(transclude());
		}
	}
});