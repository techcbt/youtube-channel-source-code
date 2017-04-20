var app = angular.module('app', ['ui.router']);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
	$stateProvider
	.state('firstMessage', {
		url: '/first-msg',
		templateUrl: 'msg1.htm',
		controller: 'msg1'
	})
	.state('secondMessage', {
		url: '/second-msg',
		templateUrl: 'msg2.htm',
		controller: 'msg2'
	})
	.state('root', {
		url: '/',
		template: '<strong>you are at root..click something else</strong>'
	})
	// .state('otherwise',{
	// 	url: "*path",
	// 	template: '<strong>no route available</strong'
	// });

	$urlRouterProvider.otherwise('/'); //redirects to '/' when no round is found (just another way)

}]);

app.controller('msg1', ['$scope', function($scope){
	$scope.a = 10;
	$scope.b = 20;
}]);


app.controller('msg2', ['$scope', function($scope){
	$scope.c = 30;
	$scope.d = 40;
}]);