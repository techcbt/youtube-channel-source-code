var app = angular.module('app', ['ui.router']);

app.config(['$stateProvider', function($stateProvider, $urlRouterProvider){
	$stateProvider
	.state('employees', {
		//Acts as parent.
		//No url/route necessary.
		//This state/views are automatically rendered by children (with their own routes/urls)
		abstract: true,     
		views:{
			'':{
				templateUrl: 'emp-layout.htm'
			},
			'emp-header@employees':{ //render the emp-header-info.htm view in 'ui-view=emp-header' of 'employees' state (which is emp-layout.htm)
			templateUrl: 'emp-header-info.htm'
		},
	}		
})
	.state('employees.list',{
		//inherits from parent "employees" (nested state)
		//automatically includes parent while rendering the route
		url:'/employees',
		views:{
			'emp-list': { //render the emp-list-info.htm view in 'ui-view=emp-list' (of parent state)
			templateUrl: 'emp-list-info.htm',
			controller: 'empListController'
		}
	}
})	
	.state('details', {
		//inherits from parent "employees" (just another way instead of "employees.details")
		//automatically includes parent while rendering the route
		parent: 'employees',
		url: '/employees/:empno',
		views:{
			'emp-detail': {//render the emp-detail-info.htm view in 'ui-view=emp-detail' (of parent state)
			templateUrl: 'emp-detail-info.htm',
			controller: 'empDetailController'
		},
		'dept-detail@details': {//render dept-detail-info.htm view in 'ui-view=dept-detail' available in emp-detail-info.htm (of 'details' state)
			templateUrl: 'dept-detail-info.htm',
			controller: 'deptDetailController'
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

app.controller('empListController', ['$scope', 'dataService',
	function($scope, dataService){

		$scope.isLoading = true;

		dataService.getEmployees().then(function(result){
			$scope.result = result;
			$scope.isLoading = false;
		}); 

	}]);

app.controller('empDetailController', ['$scope', 'dataService', '$stateParams',
	function($scope, dataService, $stateParams){

		$scope.isLoading = true;
		$scope.isNotFound = false;
		dataService.getEmployee($stateParams.empno).then(function(result){
			if(result.data.length > 0){
				$scope.employee = result.data[0];
			}
			else{
				$scope.isNotFound = true;
			}
			
			$scope.isLoading = false;
		}); 

	}]);

app.controller('deptDetailController', ['$scope', 'dataService',
	function($scope, dataService){

		$scope.$parent.$watch('employee', function(newValue, oldValue){
			if(newValue && newValue.Deptno){
				$scope.isDeptLoading = true;
				$scope.isDeptNotFound = false;
				dataService.getDepartment(newValue.Deptno).then(function(result){
					if(result.data.length > 0){
						$scope.dept = result.data[0];	
					}
					else{
						$scope.isDeptNotFound = true;
					}
					
					$scope.isDeptLoading = false;
				}); 	
			}
		}, true);

	}]);