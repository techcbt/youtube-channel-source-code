var app = angular.module("app", []);
app.controller('emp', ['$scope', 'empService', function($scope, empService){
	empService.getEmployees(function(r){
		$scope.employees = r;
	});		
}]);

app.service('empService', ['$http', '$log', function($http, $log){
	this.getEmployees = function(cb){
		$http({
			url: 'http://localhost:8000/api/employees',
			method: 'GET'
		}).then(function(resp){
			//$log.log(resp.data);
			cb(resp.data);
		},function(resp){
			$log.error("ERROR occurred");
		});
	};
}]);
