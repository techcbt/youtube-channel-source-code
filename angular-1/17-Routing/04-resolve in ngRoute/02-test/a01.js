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
			result: function(dataService, $route, $q){
				var a = $route.current.params.a;
				var b = $route.current.params.b;
				return dataService.multiply(a, b).then(function(result){
					if(result.data > 200){
						return $q.reject('cannot have result more than 200');
					}
					else{
						return result;
					}
				});
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

app.controller('calcController', ['$scope', 'dataService', '$location',
	function($scope, dataService, $location){

		$scope.a = 0;
		$scope.b = 0;

		$scope.doAdd = function(){
			var path = '/calc/add/' + $scope.a + '/' + $scope.b;
			$location.url(path);		
		}

		$scope.doMultiply = function(){
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
		console.log('in $routeChangeStart');
		$rootScope.isLoading = true;
	});

	$rootScope.$on('$routeChangeSuccess', function(e, curr, prev){
		console.log('in $routeChangeSuccess');
		$rootScope.isLoading = false;
	});

	$rootScope.$on('$routeChangeError', function(e, curr, prev, rejection){
		console.log('in $routeChangeError - error:' + rejection);
		$rootScope.isLoading = false;

		if(curr.$$route.originalPath == "/calc/multiply/:a/:b"){ 
			$rootScope.error = rejection;
			$window.history.back();
		}

	});

	// $rootScope.$on('$locationChangeStart', function(e, currUrl, prevUrl, currState, PrevState){		
	// 	console.log('in $locationChangeStart url:' + currUrl);
	// });

	// $rootScope.$on('$locationChangeSuccess', function(e, currUrl, prevUrl, currState, PrevState){
	// 	console.log('in $locationChangeSuccess url:' + currUrl);
	// });	
}]);