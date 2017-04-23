// map will be the leaflet instance once initialMapRender is called in main()
var map;
// currentPos is in form [lat, long] w/ lat/long as floats
var currentPos;

window.onload = function () {
    // callback to rest of code once current position is set
    getCurrentPosition(main);
}

function main() {

    initialMapRender(currentPos);

    // for arrow click
    $("#destination-submit").click(function() {
        var destination = $("#destination-input").val();
        updateDirections(currentPos, destination);
    });
    // for enter key press
    $('#destination-input').on('keypress', function (e) {
        if(e.which === 13){
           var destination = $("#destination-input").val();
           updateDirections(currentPos, destination);
        }
    });
}

var prevmql;
function updateDirections(currPos, destination) {
    console.log(currPos);
    var dir = MQ.routing.directions();
    dir.route({
        locations: [
            { latLng: { lat: currPos[0], lng: currPos[1] } },
            destination
        ]
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
}

function getCurrentPosition(callback) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            currentPos = [position.coords.latitude, position.coords.longitude]
            callback();
        });
    }
    else {
        alert("geolocation not supported :(");
    }
}

function initialMapRender(currPos) {
    map = L.map('map', {
        layers: MQ.mapLayer(),
        center: currPos,
        zoom: 8
    });
    var marker = L.circleMarker(currPos).addTo(map);
}
