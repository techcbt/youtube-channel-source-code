var app = angular.module('app', ['ui.router']);

app.config(['$stateProvider', function($stateProvider, $urlRouterProvider){
	$stateProvider
	.state('employees', {
		url: '/employees',
		views:{
			'':{
				templateUrl: 'emp-layout.htm',
				controller: 'employeesController'
			},
			'emp-header@employees':{ 
				templateUrl: 'emp-header.htm'
			},
			'emp-list@employees': { 
				templateUrl: 'emp-list.htm',
			},
			'emp-detail@employees': {
				templateUrl: 'emp-detail.htm',
			}
		}		
	})	
	.state('root', {
		url: '/',
		template: '<strong>you are at root..click something else</strong>'
	})
	.state('otherwise',{
		url: "*path",
		template: '<strong>no route available</strong'
	})

}]);

app.controller('employeesController', ['$scope', 'dataService', 
	function($scope, dataService){

		$scope.isEmpListLoading = true;

		dataService.getEmployees().then(function(result){
			$scope.empList = result;
			$scope.isEmpListLoading = false;
		}); 

		$scope.showEmployeeDetails = function(empno){
			for(var i = 0; i < $scope.empList.data.length; i++){
				var oEmp = $scope.empList.data[i];
				oEmp.Selected = (oEmp.Empno == empno);
			}			

			$scope.isEmpDetailsLoading = true;	
			$scope.employee = undefined;
			dataService.getEmployee(empno).then(function(result){
				if(result.data.length > 0){
					$scope.employee = result.data[0];	
				}				
				$scope.isEmpDetailsLoading = false;
			}); 			
		};

	}]);
