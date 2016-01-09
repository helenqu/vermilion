angular.module('vermilionApp')
	.controller('clockController', ['$scope', '$timeout', function($scope, $timeout) {
		var today = new Date();
		$scope.current_hour = today.getHours();
		$scope.current_minute = today.getMinutes();
		$scope.current_second = today.getSeconds();
		$scope.tick_interval = 1000;

		$scope.current_day = today.getDate();
		$scope.current_month = today.getMonth();
		$scope.current_year = today.getFullYear();
		$scope.$timeout = $timeout;

		$scope.tick = function() {
			var today = new Date();
			var hour = today.getHours();
			var minute = today.getMinutes();
			var second = today.getSeconds();
			$scope.current_hour = (hour > 12) ? (hour - 12) : hour;
			$scope.current_minute = checkTime(minute);
			$scope.current_second = checkTime(second);
			$timeout($scope.tick, $scope.tick_interval);
		};

		$scope.month = function() {
			var months = ['january', 'february', 'march', 'april', 'may',
				'june', 'july', 'august', 'september', 'october', 'november',
				'december'];
			var today = new Date();
			var month = today.getMonth();
			$scope.current_month = months[month];
		}

		function checkTime(i) {
			return (i < 10) ? ("0" + i) : i;
		};

		$scope.tick();
		$scope.month();
	}]);
	