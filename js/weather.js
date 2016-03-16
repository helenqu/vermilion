angular.module('vermilionApp')
	.controller('weatherController', ['$scope', function($scope) {
		var current_temperature = null;
		var current_weather = null;
		$scope.current_city = null;
		$scope.display = null;

		$scope.getWeather = function(position) {
			var url = "http://api.openweathermap.org/data/2.5/weather?lat=" 
			+ position.coords.latitude + "&lon="
			+ position.coords.longitude + "&APPID=7a833e9cb6bc6135674e66297d45af40";

			$.get(url, function(data) {
				console.log(data.weather);
				$scope.current_city = (data.name).toUpperCase();
				current_temperature = Math.round(1.8*(data.main.temp-273.15) + 32);
				current_weather = (data.weather[0].main).toUpperCase();
				$scope.display = current_weather + ", " + current_temperature + "F";
			})
		}

		$scope.errorHandler = function(err) {
			if (err.code == 1) {
		       console.log("Error: Access is denied!");
		    } else if (err.code == 2) {
		       console.log("Error: Position is unavailable!");
		    }
		}

		$scope.getLocation = function() {
			var weather_container = document.getElementById("weather-container");
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition($scope.getWeather, $scope.errorHandler);
			} 
		}

		window.onload = $scope.getLocation();
	}]);