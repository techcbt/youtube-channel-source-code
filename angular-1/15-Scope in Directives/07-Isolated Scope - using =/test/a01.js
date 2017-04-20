var app = angular.module('app', []);

app.controller('sample', ['$scope', function($scope) {

	$scope.emp = {
		empno: 1001,
		ename: 'Jag'
	}

}]);

app.directive('message', function(){

	return {
		templateUrl: 'info-msg.htm',
		//= - stands for object and two-way binding (parent to directive scope and vice-versa)
		scope:{		
			employee: '='
			//or following with change in markup
			//employee:'=oEmp'
		}
	}

});
