var app = angular.module('foreverFighter', ['ui.router']);

app.controller('UpdateCtrl', ['$scope', 'updates',
	function($scope, updates) {
		$scope.text = updates.text;
	}]);

app.controller('MainCtrl', ['$scope', 'bio',
	function($scope, bio) {
		$scope.frontpagebio = bio.frontpagebio;
	}]);

app.factory('updates', ['$http', function($http) {

	var o = {
		text : ""
	}

	o.getUpdates = function() {
		return $http.get('/db').success(function(data) {
			o.text = data;
		});
	}
	return o;
}]);

app.factory('bio', ['$http', function($http) {

	var o = {
		frontpagebio : ""
	}

	o.getFrontPageBio = function() {
		console.log("got to get request");
		return $http.get('/bio').success(function(data) {
			o.frontpagebio = data;
		});
	}
	return o;
}]);

app.config([
	'$stateProvider',
	'$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {

		$stateProvider
		.state('home', {
			url: '/home',
			templateUrl: '/home.html',
			controller: 'MainCtrl',
			resolve: {
				bioPromise : ['bio', function(bio) {
					return bio.getFrontPageBio();
				}]
			}
		});

		$stateProvider
		.state('about', {
			url: '/about',
			templateUrl: '/about.html',
		});

		$stateProvider
		.state('updates', {
			url: '/updates',
			templateUrl: '/updates.html',
			controller: 'UpdateCtrl',
			resolve: {
				updatePromise : ['updates', function(updates) {
					return updates.getUpdates();
				}]
			}
		});

		$urlRouterProvider.otherwise('home');
	}]);