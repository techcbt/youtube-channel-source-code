var app = angular.module('app', []);

app.controller('sample', ['$scope', function($scope) {

	$scope.a = 10;
	$scope.b = 20;

	//overwritten/replaced by 'message' directive
	//further overwritten by 'message2' directive
	$scope.changeValueB = function(){
		$scope.b = 30; //becomes 50 after overwritings
	}	

}]);


//replaces 'changeValueB' of parent (affects everywhere)
//adds 'changeValueA' to parent (availble everywhere)
app.directive('message', function() {

	return {
		templateUrl: 'info-msg.htm',

		controller: function($scope, $element, $attrs){

			//you can execute this from console
			//1.select controller element
			//2.angular.element($0).scope().changeValueA()
			//3.angular.element($0).scope().$apply()
			$scope.changeValueA = function(){ 
				$scope.a = 5;
			}

			$scope.changeValueB = function(){
				$scope.b = 40;
			}
		}
	}

});

//further replaces 'changeValueB' of parent (affects everywhere)
//this is the latest and overwrites everything else previously
app.directive('message2', function() {

	return {
		templateUrl: 'info-msg.htm',

		controller: function($scope, $element, $attrs){
			$scope.changeValueB = function(){
				$scope.b = 50;
			}
		}
	}

});