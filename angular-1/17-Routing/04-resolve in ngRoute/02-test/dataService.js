app.config(["dataServiceProvider", function(dataServiceProvider) {
	dataServiceProvider.config('http://localhost:8000/api');
}]);

app.provider('dataService', function(){
	
	var baseUrl = '';
	this.config = function(url){
		baseUrl = url;
	};

	this.$get = ['$http', '$log', '$q', function($http, $log, $q){
		var oDataService = {};	
		
		oDataService.add = function(a, b){
			return $http({
				url: baseUrl + '/add/' + a + '/' + b,
				method: 'GET'
			});
		};
	
		oDataService.multiply = function(a, b){
			return $http({
				url: baseUrl + '/multiply/' + a + '/' + b,
				method: 'GET'
			});
		}

		return oDataService;		
	}];

});