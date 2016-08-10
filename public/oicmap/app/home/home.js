'use strict';
/**
 * Created by brother on 1/5/2015.
 */
angular.module('home', ['value','summary','features','testimonials','notify','social','duScroll'])
	.value('duScrollDuration', 500)
	.value('duScrollOffset', 30)
	.controller('homeController', ['$scope','$location', '$anchorScroll','$document', function ($scope,$location,$anchorScroll,$document) {
		$scope.TAG = 'homeController';

		$scope.scrollTo = function(id){
			console.log("test");
			var someElement = angular.element(document.getElementById(id));
			$document.scrollToElementAnimated(someElement);
		};
	}]);