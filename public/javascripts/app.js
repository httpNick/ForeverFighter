var app = angular.module('foreverFighter', ['ui.router']);

app.controller('UpdateCtrl', ['$scope', 'updates',
	function($scope, updates) {
		$scope.text = updates.text;
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

app.config([
	'$stateProvider',
	'$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {

		$stateProvider
		.state('home', {
			url: '/home',
			templateUrl: '/home.html'
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