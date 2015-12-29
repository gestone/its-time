var React = require('react');
var Api = require('../utils/api');
var Util = require('../utils/util');

module.exports = React.createClass({
    getInitialState: function() {
        // take the initial time and convert it to an actual string
        return {timeAgo: Util.calculateTimeAgo(this.props.post_time)};
    },
    componentDidMount: function() {
        var updateTimer = setInterval(this.updateEntry, 1000);
    },
    render: function() {
        return <div className="card live-feed red lighten-1" key={this.props.id}>
                <span className="card-title">
                    {this.props.what_time}
                    <i onClick={this.likeTime} className="small material-icons">thumb_up</i>
                </span>
                <br/>
                {this.state.timeAgo} 
                <br />
                {this.props.likes} {this.props.likes === 1 ? "like" : "likes"}
            </div>;
    },
    updateEntry: function() {
        // Updates the entry for the time stamp on the given card.
        this.setState({timeAgo: Util.calculateTimeAgo(this.props.post_time)});
    },
    likeTime: function() {
        console.log(this.props);
        Api.likePost(this.props.id)
           .then(function() {
               Materialize.toast("Liked!", 1000);
           });
    }
});
