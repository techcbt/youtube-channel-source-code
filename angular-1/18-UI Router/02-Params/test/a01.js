var app = angular.module('app', ['ui.router']);

app.config(['$stateProvider', function($stateProvider){
	$stateProvider
	.state('firstMessage', {
		url: '/first-msg/:a/:b',
		//url: '/first-msg/{a}/{b}', //is also allowed		
		templateUrl: 'msg1.htm',
		controller: 'msg1'
	})
	.state('secondMessage', {
		url: '/second-msg/{a:[0-9]+}/{b}', //with braces, we can provide reg exp. (ex: match one or more digits for a)
		templateUrl: 'msg1.htm',
		controller: 'msg1'
	})
	.state('thirdMessage1', {
		url: '/third-msg/:a', //optional by default, goes here if one or none is provided
		templateUrl: 'msg1.htm',
		controller: 'msg1'
	})
	.state('thirdMessage2', {
		url: '/third-msg/:a/:b', //goes here if both are provided
		templateUrl: 'msg1.htm',
		controller: 'msg1'
	})
	.state('fourthMessage', {
		url: '/fourth-msg',
		templateUrl: 'msg1.htm',
		controller: 'msg1',
		params:{ //not available through URL (but available through ui-sref or $state.go)
			a: {value: '1'},
			b: {value: '2'}
		}
	})
	.state('fifthMessage', {
		url: '/fifth-msg/:a/:b',
		templateUrl: 'msg1.htm',
		controller: 'msg1',
		params:{ //default values would work only if there exists trailing slashes
			a: {value: '1'},
			b: {value: '2'}
		}
	})
	.state('sixthMessage', {
		url: '/sixth-msg/:a/:b',
		templateUrl: 'msg1.htm',
		controller: 'msg1',
		params:{ //default values would work even without trailing slashes
			a: {value: '1', squash: true},
			b: {value: '2', squash: true}
		}
	})	
	.state('seventhMessage', {
		url: '/seventh-msg/:a/:b',
		templateUrl: 'msg1.htm',
		controller: 'msg1',
		params:{ //can use any strings in place of default values in URL
			a: {value: '1', squash: '-'},
			b: {value: '2', squash: '~'}
		}
	})
	.state('eighthMessage', {
		url: '/eighth-msg?a&b', //query params
		templateUrl: 'msg1.htm',
		controller: 'msg1'		
	})
	.state('ninthMessage', {
		url: '/ninth-msg?a&b', //query params
		templateUrl: 'msg1.htm',
		controller: 'msg1',		
		params:{
			a: {value: '1'},
			b: {array: true}
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

app.controller('msg1', ['$scope', '$stateParams', function($scope, $stateParams){
	$scope.a = $stateParams.a;
	$scope.b = $stateParams.b;
}]);
