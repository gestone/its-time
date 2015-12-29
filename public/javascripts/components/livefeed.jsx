var React = require('react');
var Map = require('./map');
var SideBar = require('./sidebar');
var Actions = require('../actions');

module.exports = React.createClass({
    componentDidMount: function() {
        Actions.getPosts();
        Actions.getLocation();
    },
    render: function() {
        return <div id="live-feed-container" className="row red accent-2">
            <Map/>
            <SideBar/>
        </div>;
    }
});
