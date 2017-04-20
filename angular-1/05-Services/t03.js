//using factory service syntax
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
}]);

app.provider('calcService', function(){
	
	var baseUrl = '';
	this.config = function(url){
		baseUrl = url;
	};

	this.$get = ['$http', '$log', function($http, $log){
		$log.log("instantiating calcService..");
		var oCalcService = {};	
		oCalcService.getSum = function(a, b, cb){
			$http({
				url: baseUrl + '/Sum?a=' + a + '&b=' + b,
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
		return oCalcService;		
	}];

});

app.config(["calcServiceProvider", function(calcServiceProvider) {
	calcServiceProvider.config('http://localhost:4467');
}]);
