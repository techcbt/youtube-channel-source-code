var app = angular.module('app', []);

app.controller('sample', ['$scope', function($scope) {

	$scope.a = 10;
	$scope.b = 20;

	$scope.doSum = function(x, y) {
		alert("Sum = " + (parseInt(x)+parseInt(y)));
	}

}]);

app.directive('message', function(){

	return {
		templateUrl: 'info-msg.htm',
		//& - function binding (call external function from directive)
		scope:{		
			extSum: '&'

			//third way (with third way in markup)
			//extSum: '&justSum'
		},

		controller: function($scope, $element, $attrs){
			
			$scope.doProcess = function(){
				$scope.extSum({m:$scope.p, n:$scope.q});
			};

			$scope.doProcess2 = function(){
				//$scope.extSum()($scope.p, $scope.q);
				$scope.extSum()($scope.p, $scope.q * $scope.$parent.a);
			}

		}


	}

});
