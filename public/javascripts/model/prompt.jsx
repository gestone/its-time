var React = require('react'); 

module.exports = React.createClass({
    handleOnClick: function() {
        // handle with sending it off to the server to update live feed
        alert(document.getElementById("noun").value.toUpperCase());
    },
    render: function() {
        return <div id="prompt-container" className="row">
                    <h1 id="prompt">IT'S  
                        <span className="input-field">
                            <input id="noun" name="noun" type="text"/>
                        </span>
                    TIME
                        <button id="submit-time" onClick={this.handleOnClick} className="btn white red-text" type="submit" name="action">TELL THE WORLD
                            <i className="material-icons right">send</i>
                        </button>
                    </h1>
                </div>;
    }
});
