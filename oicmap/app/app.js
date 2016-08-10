"use strict";
/**
 * Created by brother on 12/28/2014.
 */
angular.module('oicApp', [
	'ngRoute',
	'ui.router',
	'constants',
	'home',
	'nav'
])
	.config(['$routeProvider','$stateProvider','$locationProvider','$httpProvider','$urlRouterProvider', function ($routeProvider,$stateProvider,$locationProvider,$httpProvider,$urlRouterProvider) {
		$locationProvider.html5Mode(true);
		/*$httpProvider.defaults.cache = false;*/
		if (!$httpProvider.defaults.headers.get) {
			$httpProvider.defaults.headers.get = {};
		}
		$httpProvider.defaults.headers.get['If-Modified-Since'] = '0';
		$urlRouterProvider.otherwise("/");

		$stateProvider
			.state('home', {
				url: '/',
				views: {
					'home': {
						templateUrl: 'oicmap/app/home/home.tpl.html',
						controller: 'homeController'
					},
					'nav':{
						templateUrl: 'oicmap/app/nav/nav.tpl.html',
						controller: 'navController'
					}
				}
			})
	}])
	.controller('oicController', ['$scope','$route','CONFIG_BACKEND', function ($scope, $route, CONFIG_BACKEND) {

	}]);