var app = angular.module('app', []);

app.controller('sample', ['$scope', function($scope) {


}]);

//transclusion using link function
app.directive('message3', function(){
	return {
		templateUrl: 'msg3.htm',
		transclude: true,		
		link: function(scope, iElement, iAttributes, controller, transclude){
			//transclude() - returns the transcluded content from view
			iElement.find('#innerPanel').append(transclude());
		}		
	}
});

//transclusion using directive controller
app.directive('message4', function(){
	return {
		templateUrl: 'msg3.htm',
		transclude: true,		
		controller: function($scope, $element, $attrs, $transclude){
			$element.find('#innerPanel').append($transclude());
		}		
	}
});

