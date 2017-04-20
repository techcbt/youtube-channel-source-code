var app = angular.module('app', []);

app.controller('sample', ['$scope', function($scope) {

}]);

app.directive('message1', function(){
	return {
		templateUrl: 'msg1.htm',
		transclude: true,		
		controller: function($scope, $element, $attrs, $transclude){
			//$transclude(<no callback>) - creates instance of (to be) transcluded content
			//creates only once (if not created earlier)
			//reuses the same, once created

			//with not commenting any of the following lines, 
			//the transcluded content is moved from innerPanel1 to innerPanel2
			$element.find('#innerPanel1').append($transclude()); //creates transcluded content instance
			$element.find('#innerPanel2').append($transclude()); //reuses the same (moves from innerPanel1 to innerPanel2)

			//commenting one of the above lines would work with no issues
		}		
	}
});

app.directive('message2', function(){
	return {
		templateUrl: 'msg1.htm',
		transclude: true,		
		controller: function($scope, $element, $attrs, $transclude){
			//$transclude(<with callback>) - called "clone attach function" or "clone linking function"

			//creates/clones instance of transcluded content every time
			$transclude(function(transEl){
				$element.find('#innerPanel1').append(transEl);
			});

			//creates/clones instance of transcluded content every time
			$transclude(function(transEl){
				$element.find('#innerPanel2').append(transEl);
			});

			//good for multiple transclusions (and RECOMMENDED PATTERN)
		}		
	}
});