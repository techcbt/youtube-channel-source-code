var app = angular.module('app', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider){
	$routeProvider
	.when('/calc/:option?/:a?/:b?', {
		templateUrl: 'calc.htm',
		controller: 'calcController'
	})
	.when('/',{
		template: '<strong>Welcome to my app.</strong><br><i>Click one of the links from left panel</i>'
	})
	.otherwise({
		template: '<strong>No content available here..click one of the links from left panel</strong>'
	});
}]);

app.controller('calcController', ['$scope', '$location', '$routeParams', 'dataService', '$route',
	function($scope, $location, $routeParams, dataService, $route){
		console.log('in controller..');

		$scope.a = 0;
		$scope.b = 0;

		if($routeParams.a){
			$scope.a = $routeParams.a;
		}

		if($routeParams.b){
			$scope.b = $routeParams.b;
		}

		if($routeParams.option && $routeParams.a && $routeParams.b){
			if($routeParams.option == "add"){
				console.log('service call started..')
				$scope.isLoading = true;
				dataService.add($routeParams.a, $routeParams.b).then(function(result){
					console.log('service call completed..')
					$scope.isLoading = false;
					$scope.result = result;
				});		
			}
			else if ($routeParams.option == "multiply") {
				dataService.multiply($routeParams.a, $routeParams.b).then(function(result){
					$scope.result = result;
				});	
			}
			else{
				$location.url('/calc');	
			}
		}

		$scope.doAdd = function(){

			var path = '/calc/add/' + $scope.a + '/' + $scope.b;
			//console.log($location.path());
			
			//--> force reload route
			//$route.current.regexp.test(path) //tests for route path (not with path param values)
			if($location.path() == path){ //tests for route path and param values
				$route.reload();
			}
			else{
				$location.url(path);
			}
		}

		$scope.doMultiply = function(){
			//will not reload route if the param values are same
			$location.url('/calc/multiply/' + $scope.a + '/' + $scope.b);
		}

		$scope.doUpdateResults = function(){
			//console.log($route);
			
			//$route.reload(); //refreshes based on current params (not new params)

			//will reload if and only if a or b gets changed 
			$route.updateParams({
				a: $scope.a, 
				b: $scope.b
			});
		}		

	}]);

app.run(['$rootScope', function($rootScope){
	//$routeChangeStart
	//$routeChangeSuccess
	//$routeChangeError
	//$routeUpdate

	//just for now
	var getPathFromRoute = function getPathFromRoute(routeObj)
	{
		var path = "";
		if(routeObj && routeObj.$$route){
		    path = routeObj.$$route.originalPath;
		    var keys = routeObj.$$route.keys;
		    var value;       
		    for (var i = 0; i < keys.length; i++) {
		        if(angular.isDefined(keys[i]) && angular.isDefined(keys[i].name)){
		            value = routeObj.pathParams[keys[i].name];
		            if(value)
		            {
		            	var regEx = new RegExp(":" + keys[i].name, "gi");
		            	path = path.replace(regEx, value.toString());            	
		            }
		            
		        }
		    }     
		}
	    return path;
	}; 

	$rootScope.$on('$routeChangeStart', function(e, curr, prev) {
		//console.log('in $routeChangeStart - ' + curr.$$route.originalPath);
		console.log('in $routeChangeStart - ' + getPathFromRoute(prev) + ' -> ' + getPathFromRoute(curr));
	});

	$rootScope.$on('$routeChangeSuccess', function(e, curr, prev) {
		console.log('in $routeChangeSuccess - ' + getPathFromRoute(prev) + ' -> ' + getPathFromRoute(curr));
	});

	$rootScope.$on('$locationChangeStart', function(e, currUrl, prevUrl, currState, PrevState) {
		console.log('in $locationChangeStart - ' + prevUrl + ' -> ' + currUrl);
	});

	$rootScope.$on('$locationChangeSuccess', function(e, currUrl, prevUrl, currState, PrevState) {
		console.log('in $locationChangeSuccess - ' + prevUrl + ' -> ' + currUrl);
	});	

}]);