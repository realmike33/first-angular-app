angular.module('Post', [])

.controller('PostController', function($scope, $log, requestFactory, $stateParams, $state){
	requestFactory.posts().then(function(results){
		$scope.test = results[$stateParams.id];	
	});
	console.log(requestFactory.posts(), "Here fool")
	
})
