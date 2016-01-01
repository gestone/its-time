var React = require('react');
var Reflux = require('reflux');
var ReactGoogleMaps = require('react-googlemaps');
var EntryStore = require('../stores/entry-store');
var LocationStore = require('../stores/location-store');
var Actions = require('../actions');
var Util = require('../utils/util');
var GoogleMapsAPI = window.google.maps;

var Map = ReactGoogleMaps.Map;
var Marker = ReactGoogleMaps.Marker;

module.exports = React.createClass({
    mixins: [
        Reflux.listenTo(EntryStore, 'entryChange'),
        Reflux.listenTo(LocationStore, 'locationChange')
    ],
    getInitialState: function() {
        return {lat: 0.0, lng: 0.0};
    },
    render: function() {
        // Disable default UI to get rid of satilite view
        return <div id="map" className="col s12 m8">
            <Map
                height={screen.width < 500 ? 400 : 800}
                ref="map"
                initialZoom={8}
                initialCenter={new GoogleMapsAPI.LatLng(this.state.lat, this.state.lng)}
                disableDefaultUI={true} >
            </Map>
        </div>;
    },
    locationChange: function() {
        // If the user decides to give access to location, serves as a callback to update the google maps api.
        this.getMapNode().setCenter({lat: LocationStore.loc.lat, lng: LocationStore.loc.lng});
    },
    entryChange: function() {
        // Callback for when there are new entries.
        if (!this.initialRendered) {
            // The entire list hasn't been rendered yet.
            this.renderInitialMarkers(EntryStore.data);
            this.initialRendered = true;
        } else if (this.prevRenderLength != EntryStore.data.length) { 
            // There's a new entry to be rendered
            // Take the first element and only render that one
            var elem = EntryStore.data[0];
            var marker = this.createMarker(elem);
            var map = this.getMapNode();
            map.setZoom(10);
            map.panTo(marker.position);
            
            var timerUntilOpen = setTimeout(function() {
                google.maps.event.trigger(marker, 'click');
                marker.setAnimation(google.maps.Animation.BOUNCE);
                var closePopup = setTimeout(function() {
                    this.getInfoWindow().close();
                    marker.setAnimation(null);
                }.bind(this), 5000);
            }.bind(this), 500);
            elem.alreadyRendered = true;
        }
        this.prevRenderLength = EntryStore.data.length;
    },
    renderInitialMarkers: function(data) {
        // Renders each marker if it has not been rendered yet.
        data.forEach(function(elem) {
            this.createMarker(elem);
        }.bind(this));
    },
    createMarker: function(elem) {
        var loc = new GoogleMapsAPI.LatLng(elem.lat, elem.lng);
        var map = this.getMapNode();
        var marker = new google.maps.Marker({
            position: loc,
            animation: google.maps.Animation.DROP,
            map: map
        });

        marker.addListener('click', function() {
            var infoWindow = this.getInfoWindow();
            infoWindow.setContent(this.generatePopupContent(elem));
            infoWindow.open(map, marker);
        }.bind(this));

        marker.addListener('close', function() {
            marker.setAnimation(null);
        });

        return marker;
    },
    getInfoWindow: function() {
        // Singleton pattern to ensure that there is only a single instance of the
        // InfoWindow so that the user does not have to close it.
        if (!this.infoWindow) {
            this.infoWindow = new google.maps.InfoWindow();
        }
        return this.infoWindow;
    },
    generatePopupContent: function(elem) {
        // Generates popup content for each of the markers.
        var div = document.createElement('div');
        div.setAttribute('id', 'popup-content');

        var header = document.createElement('h1');
        header.innerHTML = elem.what_time;

        var likesSpan = document.createElement('span');
        likesSpan.innerHTML = elem.likes === 1 ? elem.likes + " like" : elem.likes + " likes";

        var lineBreak = document.createElement('br');

        var timeAgo = document.createElement('span');
        timeAgo.innerHTML = Util.calculateTimeAgo(elem.post_time);

        div.appendChild(header);
        div.appendChild(timeAgo);
        div.appendChild(lineBreak);
        div.appendChild(likesSpan);

        return div;
    },
    getMapNode: function() {
        // ... the workaround solution for this library
        return this.refs.map.refs.map.getMapNode();
    }
});
