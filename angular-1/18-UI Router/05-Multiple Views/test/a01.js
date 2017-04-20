var app = angular.module('app', ['ui.router']);

app.config(['$stateProvider', function($stateProvider, $urlRouterProvider){
	$stateProvider
	.state('sample01', {
		url: '/sample01',
		templateUrl: 'msg1.htm',
		controller: 'msg1'
	})
	.state('sample02', { //same as above
		url: '/sample02',
		views: {
			'': { //unnamed ui-view
				templateUrl: 'msg1.htm',
				controller: 'msg1'
			}
		}
		
	})
	.state('employees', {
		url: '/employees',
		views:{
			'emp-header':{
				templateUrl: 'emp-header.htm'
			},
			'emp-list': {
				templateUrl: 'emp-list.htm',
				controller: 'empListController'
			}
		}		
	})	
	.state('employeeDetails', {
		url: '/employees/:empno',
		views:{
			'emp-header':{
				templateUrl: 'emp-header.htm'
			},
			'emp-detail': {
				templateUrl: 'emp-detail.htm',
				controller: 'empDetailController'
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

app.controller('msg1', ['$scope', function($scope){
	$scope.a = 10;
	$scope.b = 20;
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