activeAlerts = []

function checkForAlerts() {
	// hit server for alerts
	$.ajax({
		method: "GET",
		url: "http://45.55.19.184/receive"
	}).done(function (data) {
		//console.log(data['results'][0]);
		console.log("test");
		console.log(data);
		for (var i = 0; i < data['results'].length; i++) {
			//console.log("------");
			console.log(data['results'][i]['data']);
			processAlert(data['results'][i]);
		}
	});
}

function isActiveAlert(alertType) {
	if (activeAlerts.indexOf(alertType) != -1) {
		return true;
	}
	return false;
}

function processAlert(alert) {
	// determine alert type
	console.log(alert);
	if (alert['type'] === "lowgas" && !isActiveAlert(alert['type'])) {
		lowGasHandler();
		showAlert(alert);
	}
	else if (alert['type'] === "avgspeed" &&!isActiveAlert(alert['type'])) {
		avgSpeedHandler(alert);
	}
}

function avgSpeedHandler(alert) {
	console.log(alert['data']);
	//var speed = 30;
	alert['data'] = Math.floor((Math.random() * 80) + 1);
	$("#speedometer").text(alert['data'] + "mph");
	//console.log("rotate(-"+speed+"deg)");
	$("#speedometer").css("transform", "rotate(-"+alert['data']+"deg)");
}
function speedingHandler() {
	$("#red-alert-speed").text("Exceeding speed limit by 17 mph");
	$("#alert-speed").addClass("activate");
	$("#prompt-speed").click(function () {
		$("#alert-speed").removeClass("activate");
	})
}

var oldMarkers = []
var waypointCoords = []
function lowGasHandler() {
	// get geolocation and hit the search api for gas station
	for (var i = 0; i < oldMarkers.length; i++) {
		map.removeLayer(oldMarkers[i]);
	}
	console.log(toString(currentPos[0]));
	var url = "https://www.mapquestapi.com/search/v2/radius?origin="+currentPos[0]+","+currentPos[1]+"&radius=20&maxMatches=1&ambiguities=ignore&hostedData=mqap.ntpois|group_sic_code=?|554101&outFormat=json&key=lYrP4vF3Uk5zgTiGGuEzQGwGIVDGuy24"
	console.log(url);
	$.get(url, function(data, status) {
		console.log(data);
		for (var i = 0; i < data['resultsCount']; i++) {
			waypointCoords = [data['searchResults'][i]['shapePoints'][0], data['searchResults'][i]['shapePoints'][1]];
			oldMarkers.push(L.marker(waypointCoords).addTo(map));
		}
	});
	//showAlert(null, coords);
	// Add new points to map

	// Add alert type to activeAlerts
	//activeAlerts.push("lowgas");
	//showAlert();
}
//lowGasHandler(10);
function showAlert(alert) {
	console.log(alert);
	console.log("ALERt");
	if (alert['type'] == "lowgas") {
		$("#red-alert").html("Low gas (" + alert['data'] + "% left)");
		$("#prompt").html("Redirect to nearest gas station?");
		$("#alert").addClass("activate");
		$("#no").click(function() {
			$("#alert").removeClass("activate");
			for (var i = 0; i < oldMarkers.length; i++) {
				map.removeLayer(oldMarkers[i])
			}
			oldMarkers = [];
		});

		$("#yes").click(function() {
			console.log("yes touched");
			$("#alert").removeClass("activate");
			console.log(destinationStore);
			map.removeLayer(prevmql);
			map.removeLayer(oldMarkers[0]);
			oldMarkers = [];
			updateDirections(destinationStore, waypointCoords);
		});
	}
	// Make alert appear with given data

}
