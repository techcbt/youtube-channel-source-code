//using service syntax
var app = angular.module("app", []);
app.controller('emp', ['$scope', 'calcService', function($scope, calcService){
	$scope.a = 10;
	$scope.b = 20;
	
	$scope.doSum = function(){
		//$scope.sum = parseInt($scope.a) + parseInt($scope.b);
		calcService.getSum($scope.a, $scope.b, function(data){
			$scope.sum = data;	
		});
	};
}])

app.service('calcService', ['$http', '$log', function($http, $log){
	$log.log("instantiating calcService..");
	this.getSum = function(a, b, cb){
		$http({
			url: 'http://localhost:4467/Sum?a=' + a + '&b=' + b,
			method: 'GET'
		})
		.then(function(resp){
			//success function
			$log.log(resp.data);
			cb(resp.data);
		}, function(resp){
			//failure function
			$log.error("ERROR occurred");
		});
	};
}]);