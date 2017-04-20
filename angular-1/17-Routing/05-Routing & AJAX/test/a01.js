var app = angular.module('app', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider){
	$routeProvider
	.when('/employees/:deptno?', {
		templateUrl: 'emp-list.htm',
		controller: 'empController'
	})
	.when('/empDetails/:empno', {
		templateUrl: 'emp-details.htm',
		controller: 'empDetailsController'
	})	
	.when('/',{
		template: '<strong>Welcome to my app.</strong><br><i>Click one of the links from left panel</i>'
	})
	.otherwise({
		template: '<strong>No content available here..click one of the links from left panel</strong>'
	});
}]);

app.controller('empController', ['$scope', 'dataService', '$location', '$routeParams', '$route', 
	function($scope, dataService, $location, $routeParams, $route){

		if($routeParams.deptno){
			$scope.deptno = $routeParams.deptno;
			dataService.getEmployeesByDeptno($routeParams.deptno).then(function(result){
				$scope.result = result;
			});
		}
		else{
			dataService.getEmployees().then(function(result){
				$scope.result = result;
			});	
		}
		

		$scope.showDetails = function(emp){
			//console.log(emp);
			$location.url('/empDetails/' + emp.Empno);
		}

		$scope.refresh = function(){
			$route.reload();
		}

		$scope.search = function(){
			if($scope.deptno != undefined){
				if($scope.deptno == null || $scope.deptno == ""){				
					$route.updateParams({deptno: null});				
				}
				else{
					$route.updateParams({deptno: $scope.deptno});
				}	
			}
		}
	}]);


app.controller('empDetailsController', ['$scope', 'dataService', '$routeParams', '$location', '$route', 
	function($scope, dataService, $routeParams, $location, $route){

		dataService.getEmployee($routeParams.empno).then(function(result){
			$scope.employee = result.data[0];
		});
		
		$scope.goBack = function(){
			$location.url('/employees');	
		}
		
		$scope.refresh = function(){
			//console.log($route);
			$route.reload();
		}
	}]);

