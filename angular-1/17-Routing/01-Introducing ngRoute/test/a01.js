var app = angular.module('app', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider){
	$routeProvider
	.when('/first-msg', {
		templateUrl: 'msg1.htm',
		controller: 'message1',
		caseInsensitiveMatch: true //case insensitive route
	})
	.when('/second-msg', {
		templateUrl: 'msg2.htm',
		controller: 'message2'
	})
	.when('/third-msg', {
		template: '<strong>this is third message (with no template)</strong>',
		//redirectTo: '/first-msg' //redirects to this route (no template shown) - optional
		redirectTo: function(params, path, search){ //just another way of redirection
			// console.log(params);
			// console.log(path);
			// console.log(search);
			alert('Sorry! not implemented yet...will take you to first message now');
			return '/first-msg';
		}
	})
	.when('/',{
		template: '<strong>click one of the links from left panel </strong>'
	})
	.otherwise({
		template: '<strong>No content available here..click one of the links from left panel</strong>'
	});
	//.otherwise('/') //or redirect to root
}]);

app.controller('message1', ['$scope', function($scope){
	$scope.a = 10;
	$scope.b = 20;
}]);

app.controller('message2', ['$scope', function($scope){
	$scope.c = 10;
	$scope.d = 20;
}]);