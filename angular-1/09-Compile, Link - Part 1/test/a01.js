var app = angular.module('app', []);

app.controller('msg', ['$scope', function($scope){
	$scope.a = 5; //this is available to directive, by default
}]);

app.directive('message', function($interpolate){
	return{

		//executes before controller and only once (before cloning of template happens)
		compile: function(tElement, tAttributes){ 
			//no scope available
			//tElement is the ref to template (not to instances/clones of template)
			//can manipulate DOM of template (will be replicated in every clone)
			//cannot play with data/events/inspects of clones
			//operations which can be shared among all instances/clones of template
			console.log(tAttributes.text + " -In compile..");
			return {

				//executed after controller, for every clone
				pre: function(scope, iElement, iAttributes, controller){
					//scope initialized

					//iElement is the ref to element that will appear in DOM
					//template is not linked to the scope yet (bindings are not setup)

					//safe to:-
					//safe to set data and even child data (child elements/directives are not ready yet)

					//unsafe to:-
					//access child elements (they are not linked/ready yet)

					//scope can be manipulated
					//scope.a = 20; //overwrites 10 from directive controller
					console.log(iAttributes.text + " -In pre..");
				},

				//executed after pre, for every clone
				post: function(scope, iElement, iAttributes, controller){
					//template linked to scope
					//iElement updated with data bound values
					//all chidren directives are linked

					//safe to:-
					//attach event handlers
					//inspect child elements
					//any watches on scope etc.

					//unsafe to:-
					//set data for child elements (as they are already set)

					//scope can be manipulated (for current element)
					//scope.a = 30; //overwrites 20 from pre
					console.log(iAttributes.text + " -In Post..");
				}

			}
		},

		//executed before pre, for every clone (obviously after compile)
		controller: function($scope, $element, $attrs){
			//mainly used to set data
			//never access DOM here...it is not recommended

			//code to initialize/manipulate scope object is good here
			//$scope.a = 10; //overwrites 5 from main controller
			console.log($attrs.text + " -In controller..");
		},

	}
});