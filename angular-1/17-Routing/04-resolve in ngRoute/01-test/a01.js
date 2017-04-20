var app = angular.module('app', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider){
	$routeProvider
	.when('/calc', {
		templateUrl: 'calc.htm',
		controller: 'calcController'
	})
	.when('/calc/add/:a/:b', {
		templateUrl: 'calcResult.htm',
		controller: 'calcAddController'
	})
	.when('/calc/multiply/:a/:b', {
		templateUrl: 'calcResult.htm',
		controller: 'calcMultiplyController',
		resolve: {
			result: function(dataService, $route, $q) {
				var a = $route.current.params.a;
				var b = $route.current.params.b;
				var promise =  dataService.multiply(a, b);
				return promise;
			}
		}
	})	
	.when('/',{
		template: '<strong>Welcome to my app.</strong><br><i>Click one of the links from left panel</i>'
	})
	.otherwise({
		template: '<strong>No content available here..click one of the links from left panel</strong>'
	});
}]);

app.controller('calcController', ['$scope', 'dataService', '$location', '$rootScope',
	function($scope, dataService, $location, $rootScope){

	$scope.a = 0;
	$scope.b = 0;
	
	$scope.doAdd = function(){
		var path = '/calc/add/' + $scope.a + '/' + $scope.b;
		$location.url(path);		
	}

	$scope.doMultiply = function(){
		$rootScope.error = undefined;
		var path = '/calc/multiply/' + $scope.a + '/' + $scope.b;
		$location.url(path);
	}

}]);

app.controller('calcAddController', ['$scope', 'dataService', '$routeParams',
	function($scope, dataService, $routeParams){

	$scope.isLoading = true;

	dataService.add($routeParams.a, $routeParams.b).then(function(result){
		$scope.result = result;
		$scope.isLoading = false;
	});

}]);

app.controller('calcMultiplyController', ['$scope', 'result',
	function($scope, result){
		$scope.result = result;
}]);

app.run(['$rootScope', '$window', function($rootScope, $window){

	$rootScope.$on('$routeChangeStart', function(e, curr, prev){		
		//console.log('in $routeChangeStart');
		$rootScope.isLoading = true;
	});

	$rootScope.$on('$routeChangeSuccess', function(e, curr, prev){
		//console.log('in $routeChangeSuccess');
		$rootScope.isLoading = false;
	});

	$rootScope.$on('$routeChangeError', function(e, curr, prev, rejection){
		//console.log('in $routeChangeError: ' + rejection);
		$rootScope.isLoading = false;
		//console.log(curr);
		if(curr.$$route.originalPath == "/calc/multiply/:a/:b"){ 
			//-not a clean way, but there is no proper way either
			//-all work arounds are equally messy
			$rootScope.error = rejection;
			$window.history.back();
			//-the above may not be ideal.
			//-can enhance this, 
			//	-01-by changing to previous location url with previous values and error as route params and have them preloaded via scope
			//	-02-by changing to previous locatoin url withe previous values and error in rootScope and using those in controller
		}
		
	});

	// $rootScope.$on('$locationChangeStart', function(e, currUrl, prevUrl, currState, PrevState){		
	// 	console.log('in $locationChangeStart url:' + currUrl);
	// });

	// $rootScope.$on('$locationChangeSuccess', function(e, currUrl, prevUrl, currState, PrevState){
	// 	console.log('in $locationChangeSuccess url:' + currUrl);
	// });	

}]);