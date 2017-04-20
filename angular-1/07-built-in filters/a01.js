var app = angular.module("app", []);
app.controller('emp', ['$scope', 'empService', '$filter', function($scope, empService, $filter){
	$scope.doSearch = function(){
		empService.findEmployeeById($scope.searchEmpno, function(r){
			$scope.empno = r.empno;
			$scope.ename = r.ename;
			$scope.sal = r.sal;
			$scope.deptno = r.deptno;
			$scope.hiredate = r.hiredate;
			$scope.dob = r.dob;
			$scope.salAbove7k = parseInt(r.sal) > 7000;
			
			////using uppercase filter in controller
			//var uppercaseFilter = $filter("uppercase");
			//$scope.ENAME = uppercaseFilter(r.ename);

			//getting uppercase ename from service
			$scope.ENAME = r.ENAME;
		});		
	};

}]);

app.service('empService', ['$http', '$log', '$filter', function($http, $log, $filter){
	this.findEmployeeById = function(empno, cb){
		$http({
			url: 'http://localhost:8000/api/employees/' + empno,
			method: 'GET'
		}).then(function(resp){
			//$log.log(resp.data);

			//using uppercase filter in service
			var uppercaseFilter = $filter("uppercase");
			resp.data.ENAME = uppercaseFilter(resp.data.ename);

			cb(resp.data);
		},function(resp){
			$log.error("ERROR occurred");
		});
	};
}]);
