var app = angular.module("app", []);
app.controller('emp', ['$scope', '$http', '$log', function($scope, $http, $log){
	$scope.a = 10;
	$scope.b = 20;

	$scope.doSum = function(){
		//$scope.sum = parseInt($scope.a) + parseInt($scope.b);
		$http({
			method: 'GET',
			url: 'http://localhost:4467/Sum?a=' + $scope.a + '&b=' + $scope.b
		}).then(function (resp){
			debugger;			
			$log.log(resp.data);
			$scope.sum = resp.data;
		}, 
		function(resp){
			$log.error("ERROR!");
			debugger;
		});
	};
}])