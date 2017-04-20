var app = angular.module('app', []);

app.controller('sample', ['$scope', function($scope) {

	$scope.a = 10;
	$scope.b = 20;
	$scope.p = 11;
	$scope.q = 22;	

}]);

app.directive('message', function(){

	return {
		templateUrl: 'info-msg.htm',
		//scope:{} 	//isloated scope (no inheritance from parent), no values displayed

		//expects string parameters for 'a' and 'b' members of directive scope
		//@ - stands for string or interpolated string and one-way binding (parent to directive scope)
		scope:{		
			a: '@',
			b: '@'
		},

		//accessing the isoloated scope in controller
		controller: function($scope, $element, $attrs){
			$scope.doProcess = function(){
				var r = parseInt($scope.a) + parseInt($scope.b);
				alert("Sum = " + r);	
			}			
		}
	}

});

app.directive('message2', function(){

	return {
		templateUrl: 'info-msg.htm',
		//expects string parameters for 'a' and 'b' members of directive scope, 
		//from 'm' and 'n' attributes in markup
		scope:{		
			a: '@m',
			b: '@n'
		},

		//accessing the isoloated scope in controller
		controller: function($scope, $element, $attrs){
			$scope.doProcess = function(){
				var r = parseInt($scope.a) + parseInt($scope.b);
				alert("Sum = " + r);	
			}			
		}		
	}

});