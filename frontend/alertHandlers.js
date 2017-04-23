activeAlerts = []

function checkForAlerts() {
	// hit server for alerts
	$.ajax({
		method: "GET",
		url: "http://45.55.19.184/receive"
	}).done(function (data) {
		for (var alert in results) {
			processAlert(alert);
		}
	});
}

function processAlert(alert) {
	// determine alert type
	if (alert.type === "lowgas" && !isActiveAlert(alert.type)) {
		lowGasHandler();
		showAlert(alert);
	}
}

function isActiveAlert(alertType) {
	if (activeAlerts.indexOf(alertType) != -1) {
		return true;
	}
	return false;
}

var oldMarkers = []
function lowGasHandler() {
	// get geolocation and hit the search api for gas station
	for (var i = 0; i < oldMarkers.length; i++) {
		map.removeLayer(oldMarkers[i]);
	}
	console.log(toString(currentPos[0]));
	var url = "https://www.mapquestapi.com/search/v2/radius?origin="+currentPos[0]+","+currentPos[1]+"&radius=3&maxMatches=5&ambiguities=ignore&hostedData=mqap.ntpois|group_sic_code=?|554101&outFormat=json&key=lYrP4vF3Uk5zgTiGGuEzQGwGIVDGuy24"
	console.log(url);
	$.get(url, function(data, status) {
		console.log(data);
		for (var i = 0; i < data['resultsCount']; i++) {
			var coords = [data['searchResults'][i]['shapePoints'][0], data['searchResults'][i]['shapePoints'][1]];
			oldMarkers.push(L.marker(coords).addTo(map));
		}
	});

	// Add new points to map

	// Add alert type to activeAlerts
	activeAlerts.push("lowgas");
	showAlert();
}
//lowGasHandler(10);
function showAlert(alert) {
	console.log("ALERt");
	// Make alert appear with given data
	var html = `
	<div class="alert-card">
		<div class="red-alert">
			Low gas
		</div>
		<div class="prompt">
			Redirect to nearest gas station?
		</div>
		<div class="answer">
			<div class="no" id="no">
				NO
			</div>
			<div class="yes" id="no">
				YES
			</div>
		</div>
	</div>
	`;
	$("body").append(html);
	$("#no").click(function() {
		$(".alert-card").remove();
	});
	$("#yes").click(function() {
		$(".alert-card").remove();
	});
}
