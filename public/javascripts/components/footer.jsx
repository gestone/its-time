var React = require('react');

module.exports = React.createClass({
    render: function() {
        return <footer id="footer" className="page-footer red accent-2">
            <div className="container">
                Created with <a href="https://facebook.github.io/react/">React.js</a>, <a href="http://socket.io/">Socket.io</a>, and <a href="http://materializecss.com/">Materalize</a>.
                <br />
                Made by <a href="http://justinharjanto.com">Justin Harjanto</a>.
            </div>
        </footer>;
    }
});
