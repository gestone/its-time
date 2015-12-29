var React = require('react');
var Header = require('./header'); 
var LiveFeed = require('./livefeed');
var Footer = require('./footer');

module.exports = React.createClass({
	render: function() {
		return <div>
                <Header />
                <LiveFeed />
                <Footer />
            </div>;
	}
});
