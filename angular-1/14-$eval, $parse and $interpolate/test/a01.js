var app = angular.module('app', []);

app.controller('sample', ['$scope', '$parse', '$interpolate', function($scope, $parse, $interpolate){

	$scope.a = 10;
	$scope.b = 20;

	$scope.o = {
		info: {
			ename: 'Jag'
		}
	}

	$scope.demoEval = function(){
		////--normal way of working with expressions
		//alert("Result: " + $scope.a * $scope.b);
		
		////--evaluate ng expression dynamically and returns value, based on scope
		//alert("Result: " + $scope.$eval("a * b")); 

		////--eval based on other values, beyond scope or overriding scope
		//alert("Result: " + $scope.$eval("a * b * 3 * c", {b:5, c:2})); 

		////--modify scope while evaluating
		// var r = $scope.$eval(function(scope, locals){
		// 	scope.c = locals.i
		// 	return scope.a * scope.b;
		// }, {i: 2}); 
		// alert("Result: " + r * $scope.c);

		//can go through nested objects/properties
		//alert("Name: " + $scope.$eval("o.info.ename"));
	};



	$scope.demoParse = function(){
		////--normal way of working with expressions
		//alert("Result: " + $scope.a * $scope.b);
		
		////--always returns a function to evaluate against a context
		//var f = $parse("a * b"); //returns function also called template function (no evaluation yet)
		//var r = f($scope); //function evaluates based on $scope context
		//alert("Result: " + r);
		
		//alert("Result: " + f({a:5,b:6})); //the function can be executed multiple times with diff contexts
		
		//alert("Result: " + $parse("a * b")($scope)) //inline usage		
		
		////--eval based on other values, beyond scope or overriding scope
		//alert("Result: " + $parse("a * b * 3 * c")($scope, {b:5, c:2})); 

		////--can go through nested objects/properties
		//alert("Name: " + $parse("o.info.ename")($scope));

		////--can be used to modify scope values
		//$parse("o.info.ename").assign($scope, 'TechCBT'); //replaces 'ename' with 'TechCBT' (digest cycle triggered)
		//alert("Name: " + $parse("o.info.ename")($scope));		

		////--$eval internally uses $parse
	};

	$scope.demoInterpolate = function(){
		////--normal way of working with expressions
		//alert("Result: " + $scope.a * $scope.b);
		
		////--always returns a function to evaluate against a context
		////--can contain a mix of literals and angular expressions, even multiple
		////--filters can also be used
		//var f = $interpolate("Result: {{a * b}}"); //returns function also called template function (no evaluation yet)
		//var r = f($scope); //function evaluates based on $scope context
		//alert(r);
		
		//alert(f({a:5,b:6})); //the function can be executed multiple times with diff contexts

		//alert($interpolate("Result: {{a * b}}")($scope)) //inline usage
		//alert($interpolate("Result: {{a * b | currency:'USD$'}}")($scope)) //with filter

		////--$interpolate internally uses $parse
	};	

}]);

