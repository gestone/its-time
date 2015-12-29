var React = require('react'); 
var Api = require('../utils/api');
var LocationStore = require('../stores/location-store');

module.exports = React.createClass({
    componentDidMount: function() {
        document.getElementById("noun").focus();
    },
    handleOnClick: function() {
        // handle with sending it off to the server to update live feed
        var phrase = document.getElementById("noun").value.toUpperCase();
        var lat = LocationStore.loc.lat; 
        var lng = LocationStore.loc.lng;
        if (!lat || !lng) {
            Materialize.toast("You must reveal your location to tell the world what time it is.", 2500);
        } else if (phrase.length > 20) {
            Materialize.toast("Keep your time to under 20 characters.", 2500);
        } else {
            Api.createPost(phrase, lat, lng)
               .then(function() {
                   document.getElementById("noun").value = "";
               });
        }
    },
    render: function() {
        return <div id="prompt-container" className="row">
                    <h2 id="prompt">
                        <div className="col s12 m8">
                            IT'S  
                                <span className="input-field">
                                    <input id="noun" name="noun" type="text" onKeyPress={this.handleEnter}/>
                                </span>
                            TIME
                        </div>
                        <div className="col s12 m4">
                                <button id="submit-time" 
                                    onClick={this.handleOnClick} 
                                    className="btn white red-text" 
                                    type="submit" 
                                    name="action">
                                    TELL THE WORLD
                                    <i className="material-icons right">send</i>
                                </button>
                        </div>
                    </h2>
                </div>;
    },
    handleEnter: function(keyPress) {
        var code = (keyPress.keyCode ? keyPress.keyCode : keyPress.which);
        if (code === 13) { // 13 is the enter keycode 
            // perform click
            this.handleOnClick();
        }
    }
});
