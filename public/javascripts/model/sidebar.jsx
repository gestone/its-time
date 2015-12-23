var React = require('react');
var Card = require('./card');

module.exports = React.createClass({
    render: function() {
        return <div id="sidebar" className="col m4 orange lighten-5">
            <div className="row">
                <h2 id="live-title" className="red-text text-accent-2">Live Feed</h2>
            </div>
            <div className="cards">
                {this.renderCards()}
            </div>
        </div>;
    },
    renderCards: function() {
        var items = this.props.data.map(function(item) {
            return <Card {...item} />;
        }.bind(this));
        
        return items;
    }
});
