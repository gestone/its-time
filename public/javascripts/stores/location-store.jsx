var Reflux = require('reflux');
var Api = require('../utils/api');
var Actions = require('../actions');

module.exports = Reflux.createStore({
    listenables: [Actions],
    getLocation: function() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.setInitialPos);
        }
    },
    setInitialPos: function(position) {
        this.loc = {lat: position.coords.latitude, lng: position.coords.longitude};
        this.trigger('change', this.loc);
    }
});

