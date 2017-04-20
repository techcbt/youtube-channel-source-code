var app = angular.module('app', []);

app.controller('msg', ['$scope', function($scope){
	$scope.data = [

	{v:17, r:0},
	{v:24, r:0},
	{v:32, r:0},
	{v:48, r:0}

	];

	$scope.getTotal = function(){
		var s = 0;
		for (var i = $scope.data.length - 1; i >= 0; i--) {
			var o = $scope.data[i];
			s += o.r;
		}
		return s;
	}

}]);

app.directive('message', function(){
	return{
		templateUrl: 'info-msg.htm',

		compile: function(tElement, tAttributes){
			return	function(scope, iElement, iAttributes, controller){
				//iElement.find("#btnSum").on('click', scope.btnClick);				
			}
		},

		controller: function($scope, $element, $attrs){												
			$scope.btnClick = function(){
				$scope.o.r = $scope.o.v * $scope.o.v;

				//--following is necessary for on click in post link function above
				//$scope.$apply(); //does for all scopes
				//$scope.$digest(); //does for current scope only
			};
		}
	}
});