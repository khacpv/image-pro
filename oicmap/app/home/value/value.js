/**
 * Created by brother on 1/6/2015.
 */
'use strict';
/**
 * Created by brother on 1/5/2015.
 */
angular.module('value', ['ngAnimate','ngTouch'])
	.controller('valueController', ['$scope','$interval', function ($scope,$interval) {
		$scope.TAG = 'valueController';
		$scope.direction = 'left';
		$scope.currentIndex = 0;
		$scope.phoneUrls = [
			'resources/images/screen-shoot-2.png',
			'resources/images/screen-shoot-3.png',
			'resources/images/screen-shoot-4.png'
		];
		$scope.phoneUrl = $scope.phoneUrls[0];
		var interval = $interval(function() {
			$scope.prevSlide();
		},3000);

		$scope.clearInterval = function(){
			$interval.cancel(interval);
			interval = undefined;
		};

		$scope.$on('$destroy', function() {
			// Make sure that the interval is destroyed too
			$scope.clearInterval();
		});

		$scope.setCurrentSlideIndex = function (index) {
			$scope.direction = (index > $scope.currentIndex) ? 'left' : 'right';
			$scope.currentIndex = index;
			$scope.clearInterval();
		};

		$scope.isCurrentSlideIndex = function (index) {
			return $scope.currentIndex === index;
		};

		$scope.prevSlide = function () {
			$scope.direction = 'left';
			$scope.currentIndex = ($scope.currentIndex < $scope.phoneUrls.length - 1) ? ++$scope.currentIndex : 0;
		};

		$scope.nextSlide = function () {
			$scope.direction = 'right';
			$scope.currentIndex = ($scope.currentIndex > 0) ? --$scope.currentIndex : $scope.phoneUrls.length - 1;
		};
		
		$scope.iconClick = function(type){
			alert('comming soon');
		}
	}])
	.animation('.slide-animation', function () {
		return {
			beforeAddClass: function (element, className, done) {
				var scope = element.scope();

				if (className == 'ng-hide') {
					var finishPoint = element.parent().width();
					if(scope.direction !== 'right') {
						finishPoint = -finishPoint;
					}
					TweenMax.to(element, 0.5, {left: finishPoint, onComplete: done });
				}
				else {
					done();
				}
			},
			removeClass: function (element, className, done) {
				var scope = element.scope();

				if (className == 'ng-hide') {
					element.removeClass('ng-hide');

					var startPoint = element.parent().width();
					if(scope.direction === 'right') {
						startPoint = -startPoint;
					}

					TweenMax.fromTo(element, 0.5, { left: startPoint }, {left: 0, onComplete: done });
				}
				else {
					done();
				}
			}
		};
	});