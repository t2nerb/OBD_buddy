// map will be the leaflet instance once initialMapRender is called in main()
var map;
// currentPos is in form [lat, long] w/ lat/long as floats
var currentPos = [];
//var fakeGeo = true;

window.onload = function () {
    // callback to rest of code once current position is set
    //setTimeout(getCurrentPosition())
    setTimeout(function() {
        $(".splash-screen").addClass("shrink");
    },0);
    getCurrentPosition(main);
    setInterval(function() {
        getCurrentPosition(updateMarker);
    }, 15000);

}

function main() {
    $("#splash").addClass("slide-up");
    setTimeout(function() {
        $("#splash").addClass("remove");
    },2000);
    initialMapRender(currentPos);
    //lowGasHandler(20);
    setInterval(function() {
        checkForAlerts();
    }, 5000);

    // for arrow click
    $("#destination-submit").click(function() {
        var destination = $("#destination-input").val();
        updateDirections(destination);
    });
    // for enter key press
    $('#destination-input').on('keypress', function (e) {
        if(e.which === 13){
           var destination = $("#destination-input").val();
           updateDirections(destination);
        }
    });
}

var prevmql;
var destinationStore;
function updateDirections(destination, waypoint) {
    var dir = MQ.routing.directions();
    var location_list = [];
    if (waypoint != null) {
        console.log("fired");
        location_list = [
            { latLng: { lat: currentPos[0], lng: currentPos[1] } },
            { latLng: { lat: waypoint[0], lng: waypoint[1] } },
            destination
        ]
    }
    else {
        location_list = [
            { latLng: { lat: currentPos[0], lng: currentPos[1] } },
            destination
        ]
    }
    console.log(location_list);
    dir.route({
        locations: location_list
    });
    if (prevmql != null) {
        map.removeLayer(prevmql);
    }
    var mql = MQ.routing.routeLayer({
        directions: dir,
        fitBounds: true
    });

    map.addLayer(mql);
    prevmql = mql;
    destinationStore = destination;
}

function getCurrentPosition(callback) {
    console.log("TEST");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            currentPos = [position.coords.latitude, position.coords.longitude]
            console.log(currentPos);
            if (callback != null) {
                callback();
            }
        });
    }
    else {
        alert("geolocation not supported :(");
    }
}

var pathOptions = {
    stroke: true,
    color: "#2C3E50",
    weight: 3,
    opacity: 1,
    fillColor: "#2C3E50",
    fillOpacity: 0.8
}
var prevMarker;
function initialMapRender() {
    map = L.map('map', {
        layers: MQ.mapLayer(),
        center: currentPos,
        zoom: 12
    });
    var marker = L.circleMarker(currentPos, pathOptions).addTo(map);
    prevMarker = marker;
}

function updateMarker() {
    map.panTo(currentPos);
    map.removeLayer(prevMarker);
    var marker = L.circleMarker(currentPos, pathOptions).addTo(map);
    prevMarker = marker;
}
