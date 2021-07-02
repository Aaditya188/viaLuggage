function singleMap() {
    var markerIcon = {
        url: 'images/marker2.png',
    }
    var myLatLng = {
        lng: $('#singleMap').data('longitude'),
        lat: $('#singleMap').data('latitude'),
    };
    var single_map = new google.maps.Map(document.getElementById('singleMap'), {
        zoom: 14,
        center: myLatLng,
        scrollwheel: false,
        zoomControl: false,
        fullscreenControl: true,
        mapTypeControl: false,
        scaleControl: false,
        panControl: false,
        navigationControl: false,
        streetViewControl: true,
        styles: [{
            "featureType": "landscape",
            "elementType": "all",
            "stylers": [{
                "color": "#f2f2f2"
            }]
        }]
    });
    var marker = new google.maps.Marker({
        position: myLatLng,
        map: single_map,
        icon: markerIcon,
        title: 'Location'
    });
    if ($(".controls-mapwn").length) {

        var input = document.getElementById('pac-input');
        var searchBox = new google.maps.places.SearchBox(input);

        single_map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

        single_map.addListener('bounds_changed', function () {
            searchBox.setBounds(single_map.getBounds());
        });
        var markers = [];
        searchBox.addListener('places_changed', function () {
            var places = searchBox.getPlaces();

            if (places.length == 0) {
                return;
            }
            markers.forEach(function (marker) {
                marker.setMap(null);
            });
            markers = [];
            var bounds = new google.maps.LatLngBounds();
            places.forEach(function (place) {
                if (!place.geometry) {
                    console.log("Returned place contains no geometry");
                    return;
                }
                var icon = {
                    url: place.icon,
                    size: new google.maps.Size(71, 71),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(17, 34),
                    scaledSize: new google.maps.Size(25, 25)
                };

                // Create a marker for each place.
                markers.push(new google.maps.Marker({
                    map: single_map,
                    icon: icon,
                    title: place.name,
                    position: place.geometry.location
                }));

                if (place.geometry.viewport) {
                    // Only geocodes have viewport.
                    bounds.union(place.geometry.viewport);
                } else {
                    bounds.extend(place.geometry.location);
                }
            });
            single_map.fitBounds(bounds);
        });
    }
    var zoomControlDiv = document.createElement('div');
    var zoomControl = new ZoomControl(zoomControlDiv, single_map);
    function ZoomControl(controlDiv, single_map) {
        zoomControlDiv.index = 1;
        single_map.controls[google.maps.ControlPosition.RIGHT_CENTER].push(zoomControlDiv);
        controlDiv.style.padding = '5px';
        var controlWrapper = document.createElement('div');
        controlDiv.appendChild(controlWrapper);
        var zoomInButton = document.createElement('div');
        zoomInButton.className = "mapzoom-in";
        controlWrapper.appendChild(zoomInButton);
        var zoomOutButton = document.createElement('div');
        zoomOutButton.className = "mapzoom-out";
        controlWrapper.appendChild(zoomOutButton);
        google.maps.event.addDomListener(zoomInButton, 'click', function () {
            single_map.setZoom(single_map.getZoom() + 1);
        });
        google.maps.event.addDomListener(zoomOutButton, 'click', function () {
            single_map.setZoom(single_map.getZoom() - 1);
        });
    }
    $(".single-map-item").on("click", function (e) {
        e.preventDefault();
        google.maps.event.trigger(single_map, 'resize');
        $(".map-modal-wrap").fadeIn(400);
        var $that = $(this),
            newln = $that.data("newlatitude"),
            newlg = $that.data("newlongitude"),
            newtitle = $that.parents(".title-sin_item").find(".title-sin_map a").text(),
            newurl = $that.parents(".title-sin_item").find(".title-sin_map a").attr('href');
        var latlng = new google.maps.LatLng(newln, newlg);
        marker.setPosition(latlng);
        single_map.panTo(latlng);
        $(".map-modal-container h3 a").text(newtitle).attr("href", newurl);
    });
    $(".map-modal-close , .map-modal-wrap-overlay").on("click", function (e) {
        $(".map-modal-wrap").fadeOut(400);
        single_map.setZoom(14);
        single_map.getStreetView().setVisible(false);
        $('#pac-input').val('');
        markers.forEach(function (marker) {
            marker.setMap(null);
        });
        markers = [];
    });
}
var single_map = document.getElementById('singleMap');
if (typeof (single_map) != 'undefined' && single_map != null) {
    google.maps.event.addDomListener(window, 'load', singleMap);
}