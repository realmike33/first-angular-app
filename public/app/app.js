var app = angular.module('redditApp', [
	'ui.router',
	'Post'
]);

app.config(function($stateProvider, $urlRouterProvider){
	$stateProvider
	.state('home', {
		templateUrl: '/app/app.html',
		controller: 'AppController',
		url: '/'
	})
	.state('post', {
		templateUrl: '/app/post/post.html',
		controller: 'PostController',
		url: '/post/:id'
	});
	$urlRouterProvider.otherwise('/');
});

app.controller('AppController', function($http, $scope, $sce, requestFactory, $state){
	console.log(requestFactory, 'Here');
	requestFactory.posts().then(function(results){
		$scope.data = results;
	})
	$scope.test = function(index){
		requestFactory.indexs(index);
	}
	$scope.trust = function(src){
		return $sce.trustAsResourceUrl(src);
	}
	$scope.go = function(index){
		$state.go('post', {id: index});
	}
});

app.factory('requestFactory', function($http){
	var arrayIndex = [];
	$http.get('http://www.reddit.com/.json')
		.then(function(results){
			arrayIndex.push(results.data.data.children);
	})
	return {
		indexs: function(index){
			arrayIndex.push(index);
		},
		posts: function(){
			return $http.get('http://www.reddit.com/.json')
				.then(function(results){
					arrayIndex.push(results.data.data.children);
					return results.data.data.children;
			})
		},
		arrayIndex: arrayIndex
	};
})

