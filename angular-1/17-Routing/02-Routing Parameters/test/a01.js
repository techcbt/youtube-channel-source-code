var app = angular.module('app', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider){
	$routeProvider
	.when('/sumurl/:a/:b', {
		templateUrl: 'sumurl.htm',
		controller: 'sumurl'
	})
	.when('/suminput', {
		templateUrl: 'suminput.htm',
		controller: 'suminput'
	})	
	.when('/sumfour/:a/:b/:c?/:d?', {
		templateUrl: 'sumfour.htm',
		controller: 'sumfour'
	})
	.when('/calc/:option/:a?/:b?', {
		redirectTo: function(params, path, search){
			console.log(params); //all params as part of route
			console.log(path); //current route/url path
			console.log(search); //query string
			if(params.option == "sum"){
				return '/sumurl/' + (params.a - 0) + '/' + (params.b - 0);
			}
			else if(params.option == "input") {
				return '/suminput';
			}
			else{
				return '/';
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

app.controller('sumurl', ['$scope', '$routeParams', function($scope, $routeParams){
	$scope.a = $routeParams.a;	
	$scope.b = $routeParams.b;	
}]);

app.controller('suminput', ['$scope', '$location', '$interpolate', function($scope, $location, $interpolate){
	$scope.a = 0;	
	$scope.b = 0;	

	$scope.doSum = function(){
		//$location.path($interpolate('/sumurl/{{a}}/{{b}}')($scope));
		//or
		$location.url($interpolate('/sumurl/{{a}}/{{b}}')($scope));
	};
}]);

app.controller('sumfour', ['$scope', '$routeParams', function($scope, $routeParams){
	$scope.a = $routeParams.a;	
	$scope.b = $routeParams.b;	
	$scope.c = $routeParams.c;	
	$scope.d = $routeParams.d;	
}]);
