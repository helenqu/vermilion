angular.module('vermilionApp')
	.controller('favoritesController', ['$scope', function($scope) {
		var default0 = ["Facebook", "https://www.facebook.com"];
		var default1 = ["Mail", "https://www.gmail.com"];
		var default2 = ["Google", "https://www.google.com"];
		var default3 = ["Pinterest", "https://www.pinterest.com"];
		var default4 = ["Weather", "https://www.forecast.io"];

		$scope.fave0 = (localStorage["fave0"] != null) ? JSON.parse(localStorage["fave0"]) : ["",""];
		$scope.fave1 = (localStorage["fave1"] != null) ? JSON.parse(localStorage["fave1"]) : ["",""];
		$scope.fave2 = (localStorage["fave2"] != null) ? JSON.parse(localStorage["fave2"]) : ["",""];
		$scope.fave3 = (localStorage["fave3"] != null) ? JSON.parse(localStorage["fave3"]) : ["",""];
		$scope.fave4 = (localStorage["fave4"] != null) ? JSON.parse(localStorage["fave4"]) : ["",""];
		
		$scope.getFavoritesData = function() {
			var faves = document.getElementById("favorites-form");
			var i;
			for (i = 0; i < faves.length-1; i += 2) {
				var currentFave = "fave" + i/2;
				if (faves.elements[i].value != currentFave[0] || faves.elements[i+1].value != currentFave[1]) {
					var titleElement = (faves.elements[i].value != "") ? 
						faves.elements[i].value : "";
					var urlElement = (faves.elements[i+1].value != "") ? 
						faves.elements[i+1].value : "";
					if (urlElement != "" && !(urlElement.substring(0,4) === ("http"))) {
						urlElement = "https://" + urlElement;
					}
					var updatedFave = [titleElement, urlElement];
					$scope[currentFave] = updatedFave;
					localStorage[currentFave] = JSON.stringify(updatedFave);
				}
			};
			location.reload()
		};

		$scope.updateIcon = function(location, default_icon) {
			if (location[0] == "") {
				return "img/app-icons/" + default_icon + ".png";
			} else {
				if (location[0].toLowerCase() === default_icon) {
					return "img/app-icons/" + default_icon + ".png";
				} else {
					return "img/icon-" + location[0].substring(0,1).toLowerCase() + '.png';
				}
			}
		}
	}]);

var links = $(".link");
var button_main = $(".main");
var reverse = $((links).get().reverse());

function expand(button_main, reverse) {
	button_main.addClass('animate');
	reverse.each(function(i) {
		var current = $(this);
		setTimeout(function() {
			current.addClass('animate');
		}, 50*i);
	});
	return Date.now();
}

function collapse(button_main, links) {
	links.each(function(i) {
		var current = $(this);
		setTimeout(function() {
			current.removeClass('animate');
		}, 50*i);
	});
	button_main.removeClass('animate');
	return Date.now();
}

$(document).ready(function() {
	var last_enter = 0;
	var last_leave = 0;
	$("#quicklinks-container").on('mouseenter', function() {
		var current_time_enter = Date.now();
		if (current_time_enter - last_leave <= 200) {
			return;
		}
		last_enter = expand(button_main, reverse);
	});

	$("#quicklinks-container").on('mouseleave', function() {
		var current_time = Date.now();
		if (current_time - last_enter <= 200) {
			setTimeout(collapse(button_main, links), 200);
		}
		last_leave = collapse(button_main, links);
	});
});
