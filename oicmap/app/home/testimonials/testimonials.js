/**
 * Created by brother on 1/6/2015.
 */
'use strict';
/**
 * Created by brother on 1/5/2015.
 */
angular.module('testimonials', ['ngSanitize'])
	.controller('testimonialsController', ['$scope','$sce', function ($scope,$sce) {
		$scope.TAG = 'testimonialsController';

		$scope.comments = [
			{
				id:0,
				name:"thang",
				comment: $sce.trustAsHtml("''Amazing app, I am not worried about the parking location in Royal City.<br> So I could save my time and health. Thanks a lot.''")
			},
			{
				id:1,
				name:"thang_1",
				comment: $sce.trustAsHtml("''It is smooth, easy to use. <br>Great ideal. Look forward to iOS app in the incoming time.''")
			},
			{
				id:2,
				name:"phong",
				comment: $sce.trustAsHtml("''Well I always use OIC map when I go to Royal City. Always helps me get the direction other than paper map or <br>guidebook when I'm stuck. The most complete mapping solution out there.''")
			}
		];

		$scope.currentComment = 0;
		$scope.selectComment = function(index){
			console.log(index);
			$scope.currentComment = index;
		};
	}]);