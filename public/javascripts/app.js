var app = angular.module('foreverFighter', ['ui.router']);

app.controller('CastCtrl', ['$scope', 'cast',
	function($scope, cast) {

			$scope.castdata = cast.people;

	}]);

app.controller('PhotoCtrl', ['$scope',
	function($scope) {

		$scope.photos = [
			"IMG_1855.JPG",
			"IMG_1857.PNG",
			"IMG_1859.PNG",
			"IMG_1879.JPG",
			"IMG_1881.JPG",
			"IMG_1882.JPG",
			"IMG_1884.JPG",
			"IMG_1887.JPG",
			"IMG_1888.JPG",
			"IMG_1898.PNG",
			"IMG_1902.PNG",
			"IMG_1903.PNG",
			"IMG_1904.PNG",
			"IMG_1907.PNG",
			"IMG_1911.JPG",
			"IMG_1916.JPG",
			"IMG_1917.JPG",
			"IMG_1920.PNG",
			"IMG_1921.PNG",
			"IMG_1924.PNG",
			"IMG_1949.PNG",
			"IMG_1950.PNG",
			"IMG_1952.PNG",
			"IMG_1953.PNG",
			"IMG_1954.PNG",
			"IMG_1956.PNG"
		];

		$scope._index = 0;

		$scope.isActive = function (index) {
			return $scope._index === index;
		};

		// show prev image
		$scope.showPrev = function () {
			$scope._index = ($scope._index > 0) ? --$scope._index : $scope.photos.length - 1;
		};

		// show next image
		$scope.showNext = function () {
			$scope._index = ($scope._index < $scope.photos.length - 1) ? ++$scope._index : 0;
		};

		// show a certain image
		$scope.showPhoto = function (index) {
			$scope._index = index;
		};


	}]);

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
	};

	o.getStory = function() {
		return $http.get('/storydata').success(function(data) {
			o.text = data;
		});
	};

	return o;
}]);

app.factory('cast', ['$http', function($http) {

	var o = {
		people: [
				{
					name: "Leland J. Buchanan",
					role: "Mike",
					bio: "lelandbio.txt",
					picture: "leland.jpg",
					biotext: "",
					width: 300,
					height: 300
				},
				{
					name: "Ed Stone",
					role: "Tony",
					bio: "edbio.txt",
					picture: "ed.jpg",
					biotext: "",
					width: 300,
					height: 300
				},
				{
					name: "Darryl Small",
					role: "Chris",
					bio: "darrylbio.txt",
					picture: "darryl.jpg",
					biotext: "",
					width: 300,
					height: 300
				},
				{
					name: "Zoe Thompson",
					role: "Granddaughter Maddie",
					bio: "zoebio.txt",
					picture: "zoe.jpg",
					biotext: "",
					width: 250,
					height: 300
				},
				{
					name: "Larry Keaton",
					role: "Doc. Morrison",
					bio: "larrybio.txt",
					picture: "larry.jpg",
					biotext: "",
					width : 350,
					height: 300
				},
				{
					name: "Susan Nelson",
					role: "Emily",
					bio: "susanbio.txt",
					picture: "susan.jpg",
					width: 300,
					height: 300
				},
				{
					name: "Mary Bruenn",
					role: "Annie",
					bio: "marybio.txt",
					picture: "mary.jpeg",
					width: 250,
					height: 300
				},
				{
					name: "Dennis Moore",
					role: "Danny",
					bio: "dennisbio.txt",
					picture: "dennis.jpg",
					width: 400,
					height: 300
				}
			],
		cached : false
	};

	o.getData = function() {
		return $http.get('/castdata/'+JSON.stringify(o.people)).success(function(data) {
			o.people = data;
		});
	}
	return o;
}]);

app.factory('bio', ['$http', function($http) {

	var o = {
		frontpagebio : ""
	};

	o.getFrontPageBio = function() {
		return $http.get('/bio').success(function(data) {
			o.frontpagebio = data[0];
		});
	};
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
			.state('trailer', {
				url: '/trailer',
				templateUrl: '/trailer.html',
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
		});

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
					}
				}]
			}
		});

		$stateProvider
		.state('production photos', {
			url: '/photos',
			templateUrl: '/photogallery.html',
			controller: 'PhotoCtrl'
		});

		$urlRouterProvider.otherwise('home');
	}]);
