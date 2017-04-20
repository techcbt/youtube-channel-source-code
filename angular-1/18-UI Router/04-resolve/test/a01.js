var app = angular.module('app', ['ui.router']);

app.config(['$stateProvider', function($stateProvider){
	$stateProvider
	.state('calc', {
		url: '/calc',
		templateUrl: 'calc.htm',
		controller: 'calcController',
	})
	.state('add', {
		url: '/add/:a/:b',
		templateUrl: 'result.htm',
		controller: 'addController',
		params:{
			a: {
				value: null,
				squash: true
			},			
			b: {
				value: null,
				squash: true
			}
		},
		data: {
			multiplier: 10
		}
	})
	.state('multiply', {
		url: '/multiply/:a/:b',
		templateUrl: 'result.htm',
		controller: 'multiplyController',
		resolve:{
			result: function(dataService, $stateParams){
				var a = $stateParams.a;
				var b = $stateParams.b;

				var promise = dataService.multiply(a,b);
				return promise;
			}
		},
		onEnter: function(result){
			console.log('onEnter');
		},
		onExit: function(result){
			console.log('onExit');
		},
		params:{
			a: {
				value: null,
				squash: true
			},			
			b: {
				value: null,
				squash: true
			}
		},
		data: {
			multiplier: 10
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

app.controller('calcController', ['$scope', '$state',
	function($scope, $state){

		$scope.a = 0;	
		$scope.b = 0;	

		$scope.doAdd = function(){
			$state.go('add', {
				a: $scope.a,
				b: $scope.b,
			})
		}

		$scope.doMultiply = function(){
			$state.go('multiply', {
				a: $scope.a,
				b: $scope.b,
			})
		}

	}]);

app.controller('addController', ['$scope', '$state', '$stateParams', 'dataService',
	function($scope, $state, $stateParams, dataService){

		$scope.goBack = function(){
			$state.go('calc');
		}

		if($stateParams.a){
			$scope.a = $stateParams.a;
			//$scope.a = $state.current.params.a; //or this
			//$scope.a = $state.params.a; //or this
		}

		if($stateParams.b){
			$scope.b = $stateParams.b;
		}
		
		$scope.multiplier = 1;
		if($state.current.data.multiplier){
			$scope.multiplier =	$state.current.data.multiplier;
		}

		if($stateParams.a && $stateParams.b){
			$scope.isLoading = true;
			dataService.add($stateParams.a, $stateParams.b).then(function(result){				
				$scope.result = result;					
				$scope.isLoading = false;
			}); 
		}


	}]);

app.controller('multiplyController', ['$scope', '$state', 'result',
	function($scope, $state, result){

		$scope.goBack = function(){
			$state.go('calc');
		}
		
		$scope.multiplier = 1;
		if($state.current.data.multiplier){
			$scope.multiplier =	$state.current.data.multiplier;
		}

		$scope.result = result;					


	}]);

app.run(['$rootScope', function($rootScope){

	$rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams, options) {
		console.log('in $stateChangeStart');
		if (toState.resolve) {
			$rootScope.isLoading = true;	
		}
		
	});

	$rootScope.$on('$stateChangeSuccess', function(e, toState, toParams, fromState, fromParams) {
		console.log('in $stateChangeSuccess');
		if (toState.resolve) {
			$rootScope.isLoading = false;	
		}
		
	});

	$rootScope.$on('$stateChangeError', function(e, toState, toParams, fromState, fromParams, error) {
		console.log('in $stateChangeError');
		$rootScope.isLoading = false;
	});

	$rootScope.$on('$stateNotFound', function(e, unfoundState, fromState, fromParams) {
		console.log('in $stateNotFound');
		$rootScope.isLoading = false;
	});
	
	$rootScope.$on('$viewContentLoading', function(e, viewConfig) {
		console.log('in $viewContentLoading ');
	});

	$rootScope.$on('$viewContentLoaded', function(e, viewConfig) {
		console.log('in $viewContentLoaded ');
	});

}]);