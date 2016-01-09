angular.module('vermilionApp')
	.controller('todoController', ['$scope', '$timeout', function($scope, $timeout) {
		$scope.items = (localStorage["todos"] == null) ? [] : JSON.parse(localStorage["todos"]);
		$scope.$timeout = $timeout;

		$scope.add = function() {
			$scope.items.unshift({text:$scope.text, done:false});
			$scope.text = '';
			localStorage["todos"] = JSON.stringify($scope.items);
		};

		$scope.count = function() {
			var num = 0;
			angular.forEach($scope.items, function(item) {
				num += 1;
			});
			return num;
		};

		$scope.done = function() {
			for (i = 0; i < $scope.items.length; i++) {
				if ($scope.items[i].done) {
					$scope.items.splice(i,1);
					break;
				}
			}

			localStorage["todos"] = JSON.stringify($scope.items);
		};
	}]);
