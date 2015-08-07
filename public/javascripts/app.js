var app = angular.module('foreverFighter', ['ui.router']);

app.controller('CastCtrl', ['$scope', 'cast',
	function($scope, cast) {
		$scope.castdata = cast.people;
	}]);
/**
app.controller('CrewCtrl', ['$scope', 'crew',
	function($scope, crew) {
		$scope.crewdata = crew.crewdata
	}]);
*/
app.controller('MainCtrl', ['$scope', 'bio',
	function($scope, bio) {
		$scope.frontpagebio = bio.frontpagebio;
	}]);

app.controller('StoryCtrl', ['$scope', 'story',
	function($scope, story) {
		$scope.story = story.text;
	}]);

app.factory('story', ['$http', function($http) {

	var o = {
		text: ""
	}

	o.getStory = function() {
		return $http.get('/storydata').success(function(data) {
			o.text = data;
		});
	}

	return o;
}])

app.factory('crew', ['$http', function($http) {

	var o = {
		crewdata: [{name: "Caleb M Guyll",
					role: "Director of Photography",
					bio: "calebbio.txt",
					picture: "caleb.jpg",
					biotext: "",
					height: 300}]
	}

	o.getData = function() {
		return $http.get('/crewdata/'+JSON.stringify(o.crewdata)).success(function(data) {
			o.crewdata = data;
		})
	}

	return o;
}])

app.factory('cast', ['$http', function($http) {

	var o = {
		people: [{name: "Tiffany Nicole Thomas",
					role: "Annie",
					bio: "tiffanybio.txt",
					picture: "tiffany.jpg",
					biotext: "",
					height: 300},
				{name: "Leland J. Buchanan",
					role: "Mike",
					bio: "lelandbio.txt",
					picture: "leland.jpg",
					biotext: "",
					height: 300},
				{name: "Ed Stone",
					role: "Tony",
					bio: "edbio.txt",
					picture: "ed.jpg",
					biotext: "",
					height: 300}],
		cached : false
	}

	o.getData = function() {
		return $http.get('/crewdata/'+JSON.stringify(o.people)).success(function(data) {
			o.people = data;
		});
	}
	return o;
}]);

app.factory('bio', ['$http', function($http) {

	var o = {
		frontpagebio : ""
	}

	o.getFrontPageBio = function() {
		return $http.get('/bio').success(function(data) {
			o.frontpagebio = data[0];
		});
	}
	return o;
}]);

app.filter("sanitize", ['$sce', function($sce) {
  return function(htmlCode){
    return $sce.trustAsHtml(htmlCode);
  }
}]);

app.config([
	'$stateProvider',
	'$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {

		$stateProvider
		.state('home', {
			url: '/home',
			templateUrl: '/home.html',
		});

		$stateProvider
		.state('about', {
			url: '/about',
			templateUrl: '/about.html',
			controller: 'MainCtrl',
			resolve: {
				bioPromise : ['bio', function(bio) {
					return bio.getFrontPageBio();
				}]
			}
		});

		$stateProvider
		.state('story', {
			url: '/story',
			templateUrl: '/story.html',
			controller: 'StoryCtrl',
			resolve: {
				storyPromise : ['story', function(story) {
					return story.getStory();
				}]
			}
		})

		$stateProvider
		.state('trailer', {
			url: '/trailer',
			templateUrl: '/trailer.html'

		});

		$stateProvider
		.state('kickstarter', {
			url: '/kickstarter',
			templateUrl: '/kickstarter.html'
		})

		$stateProvider
		.state('cast', {
			url: '/cast',
			templateUrl: '/cast.html',
			controller: 'CastCtrl',
			resolve: {
				castPromise : ['cast', function(cast) {
					if (!cast.cached) {
						cast.cached = true;
						return cast.getData();
					} else {
						return;
					}
				}]
			}
		});

		$urlRouterProvider.otherwise('home');
	}]);