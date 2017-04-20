app.config(["dataServiceProvider", function(dataServiceProvider) {
	dataServiceProvider.config('http://localhost:8000/api');
}]);

app.provider('dataService', function(){
	
	var baseUrl = '';
	this.config = function(url){
		baseUrl = url;
	};

	this.$get = ['$http', '$log', function($http, $log){
		var oDataService = {};	
		oDataService.getEmployees = function() {
			return $http({
				url: baseUrl + '/employees',
				method: 'GET'
			});
		};
		oDataService.getEmployeesByDeptno = function(deptno) {
			return $http({
				url: baseUrl + '/employees/dept/' + deptno,
				method: 'GET'
			});
		};		
		oDataService.getEmployee = function(empno) {
			return $http({
				url: baseUrl + '/employees/' + empno,
				method: 'GET'
			});
		};
		oDataService.getDepartment = function(deptno) {
			return $http({
				url: baseUrl + '/depts/' + deptno,
				method: 'GET'
			});
		};			
		return oDataService;		
	}];

});