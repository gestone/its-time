var React = require('react');
var Prompt = require('./prompt');

module.exports = React.createClass({
    render: function() {
        return <div id="header" className="header red accent-2">
                <Prompt />
            </div>;
    }
});
