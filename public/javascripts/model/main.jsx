var React = require('react');
var Header = require('./header'); 
var LiveFeed = require('./livefeed');

module.exports = React.createClass({
	render: function() {
		return <div>
                <Header />
                <LiveFeed />
            </div>;
	}
});
