var React = require('react');
var ReactGoogleMaps = require('react-googlemaps');
var GoogleMapsAPI = window.google.maps;

var Map = ReactGoogleMaps.Map;
var Marker = ReactGoogleMaps.Marker;
var OverlayView = ReactGoogleMaps.OverlayView;

module.exports = React.createClass({
    getInitialState: function() {
        return {lat: 0.0, lng: 0.0};
    },
    render: function() {
        // refactor to use stores...
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.constructMap);
        }
        return <div id="map" className="col m8">
            <Map
                ref="map"
                height={1000}
                initialZoom={10}
                initialCenter={new GoogleMapsAPI.LatLng(this.state.lat, this.state.lng)}>
            </Map>
        </div>;
    },
    constructMap: function(position) {
        // ... the workaround solution for this library
        this.refs.map.refs.map.getMapNode().setCenter({lat: position.coords.latitude, lng: position.coords.longitude});
    }
});
