var app = angular.module('app', []);

app.controller('calc1', ['$scope', '$rootScope', function($scope, $rootScope){
	$scope.a = 10;
	$scope.b = 20;

	$scope.doCalc1Emit1 = function(){
		$scope.$emit("MyCalc1Emit1Event");
	};

	$scope.doCalc1Broadcast1 = function(){
		$scope.$broadcast("MyCalc1Broadcast1Event");
	};

	$scope.doCalc1BroadcastRoot = function(){
		$rootScope.$broadcast("MyCalc1Broadcast1Root");
	};

	$scope.$on("MyCalc1Emit1Event", function(e, data){
		console.log("calc1.MyCalc1Emit1Event");
	});

	$rootScope.$on("MyCalc1Emit1Event", function(e, data){
		console.log("root.calc1.MyCalc1Emit1Event");
	});

	$scope.$on("MyCalc1Broadcast1Event", function(e, data){
		console.log("calc1.MyCalc1Broadcast1Event");
	});

	// //does not work (broadcast does not go to parent/root)
	// $rootScope.$on("MyCalc1Broadcast1Event", function(e, data){
	// 	console.log("root.calc1.MyCalc1Broadcast1Event");
	// });	

	$scope.$on("MyCalc1Broadcast1Root", function(e, data){
		console.log("calc1.MyCalc1Broadcast1Root");
	});

	$rootScope.$on("MyCalc1Broadcast1Root", function(e, data){
		console.log("root.calc1.MyCalc1Broadcast1Root");
	});	

	$scope.$on("MyChild1Calc1Emit1Event", function(e, data){
		console.log("calc1.MyChild1Calc1Emit1Event");
	});

	$rootScope.$on("MyChild1Calc1Emit1Event", function(e, data){
		console.log("root.calc1.MyChild1Calc1Emit1Event");
	});

	// //does not work (emitting directly to root)
	// $scope.$on("MyChild1Calc1EmitRoot", function(e, data){
	// 	console.log("calc1.MyChild1Calc1EmitRoot");
	// });

	$rootScope.$on("MyChild1Calc1EmitRoot", function(e, data){
		console.log("root.calc1.MyChild1Calc1EmitRoot");
	});

	$scope.$on("MyChild1Calc1Emit2Event", function(e, data){
		console.log("calc1.MyChild1Calc1Emit2Event");
		$scope.a = data.a;
		$scope.b = data.b;
	});

}]);

app.controller('calc2', ['$scope', '$rootScope', function($scope, $rootScope){
	$scope.c = 30;
	$scope.d = 40;

	// //does not work (as emit does not go to sibling)
	// $scope.$on("MyCalc1Emit1Event", function(e, data){
	// 	console.log("calc2.MyCalc1Emit1Event");
	// });

	$rootScope.$on("MyCalc1Emit1Event", function(e, data){
		console.log("root.calc2.MyCalc1Emit1Event");
	});

	// //does not work (broadcast does not go to sibling)
	// $scope.$on("MyCalc1Broadcast1Event", function(e, data){
	// 	console.log("calc2.MyCalc1Broadcast1Event");
	// });

	// //does not work (broadcast does not go to parent/root)
	// $rootScope.$on("MyCalc1Broadcast1Event", function(e, data){
	// 	console.log("root.calc2.MyCalc1Broadcast1Event");
	// });	

	$scope.$on("MyCalc1Broadcast1Root", function(e, data){
		console.log("calc2.MyCalc1Broadcast1Root");
	});

	$rootScope.$on("MyCalc1Broadcast1Root", function(e, data){
		console.log("root.calc2.MyCalc1Broadcast1Root");
	});	

	// //does not work (child of another sibling will not fire this)
	// $scope.$on("MyChild1Calc1Emit1Event", function(e, data){
	// 	console.log("calc2.MyChild1Calc1Emit1Event");
	// });

	$rootScope.$on("MyChild1Calc1Emit1Event", function(e, data){
		console.log("root.calc2.MyChild1Calc1Emit1Event");
	});

	// //does not work (emitting directly to root)
	// $scope.$on("MyChild1Calc1EmitRoot", function(e, data){
	// 	console.log("calc2.MyChild1Calc1EmitRoot");
	// });

	$rootScope.$on("MyChild1Calc1EmitRoot", function(e, data){
		console.log("root.calc2.MyChild1Calc1EmitRoot");
	});
}]);

app.controller('child1calc1', ['$scope', '$rootScope', function($scope, $rootScope){
	$scope.a = 10;
	$scope.b = 20;

	$scope.doChild1Calc1Emit1 = function(){
		$scope.$emit("MyChild1Calc1Emit1Event");
	};

	$scope.doChild1Calc1EmitRoot = function(){
		$rootScope.$emit("MyChild1Calc1EmitRoot");
	};

	$scope.doChild1Calc1Emit2 = function(){
		$scope.$emit("MyChild1Calc1Emit2Event", {a: 100, b: 200});
	};

	// //does not work (as emit does not go to child/nested)
	// $scope.$on("MyCalc1Emit1Event", function(e, data){
	// 	console.log("child1calc1.MyCalc1Emit1Event");
	// });

	$rootScope.$on("MyCalc1Emit1Event", function(e, data){
		console.log("root.child1calc1.MyCalc1Emit1Event");
	});

	$scope.$on("MyCalc1Broadcast1Event", function(e, data){
		console.log("child1calc1.MyCalc1Broadcast1Event");
	});

	// //does not work (broadcast does not go to parent/root)
	// $rootScope.$on("MyCalc1Broadcast1Event", function(e, data){
	// 	console.log("root.child1calc1.MyCalc1Broadcast1Event");
	// });	

	$scope.$on("MyCalc1Broadcast1Root", function(e, data){
		console.log("child1calc1.MyCalc1Broadcast1Root");
	});

	$rootScope.$on("MyCalc1Broadcast1Root", function(e, data){
		console.log("root.child1calc1.MyCalc1Broadcast1Root");
	});	

	$scope.$on("MyChild1Calc1Emit1Event", function(e, data){
		console.log("child1calc1.MyChild1Calc1Emit1Event");
	});

	$rootScope.$on("MyChild1Calc1Emit1Event", function(e, data){
		console.log("root.child1calc1.MyChild1Calc1Emit1Event");
	});

	// //does not work (emitting directly to root)
	// $scope.$on("MyChild1Calc1EmitRoot", function(e, data){
	// 	console.log("child1calc1.MyChild1Calc1EmitRoot");
	// });

	$rootScope.$on("MyChild1Calc1EmitRoot", function(e, data){
		console.log("root.child1calc1.MyChild1Calc1EmitRoot");
	});
}]);

app.run(['$rootScope', function($rootScope){

	$rootScope.$on("MyCalc1Emit1Event", function(e, data){
		console.log("root.MyCalc1Emit1Event");
	});

	// //does not work (broadcast does not go to parent/root)
	// $rootScope.$on("MyCalc1Broadcast1Event", function(e, data){
	// 	console.log("root.MyCalc1Broadcast1Event");
	// });	


	$rootScope.$on("MyCalc1Broadcast1Root", function(e, data){
		console.log("root.MyCalc1Broadcast1Root");
	});	


	$rootScope.$on("MyChild1Calc1Emit1Event", function(e, data){
		console.log("root.MyChild1Calc1Emit1Event");
	});

	$rootScope.$on("MyChild1Calc1EmitRoot", function(e, data){
		console.log("root.calc1.MyChild1Calc1EmitRoot");
	});
}]);