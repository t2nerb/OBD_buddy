activeAlerts = []

function checkForAlerts() {
	// hit server for alerts


	// if alert is ready for us, process
	for (var alert in results) {
		processAlert(alert)
	}
}

function processAlert(alert) {
	// determine alert type
	if (alert.type === "lowgas" && !isActiveAlert(alert.type)) {
		lowGasHandler(alert.data);
		showAlert(alert);
	}
}

isActiveAlert(alertType) {
	if (activeAlerts.indexOf(alertType) != -1) {
		return true;
	}
	return false;
}

function lowGasHandler(percentage) {
	// get geolocation and hit the search api for gas station

	// Add new points to map

	// Add alert type to activeAlerts
	activeAlerts.append("lowgas")


}

function showAlert(alert) {
	// Make alert appear with given data
}