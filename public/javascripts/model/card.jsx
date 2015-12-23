var React = require('react');

module.exports = React.createClass({
    render: function() {
        return <div className="card live-feed red lighten-1">
                <span className="card-title">{this.props.what_time}</span>
                <br/>
                {this.props.time_ago}
            </div>;
    }
});
