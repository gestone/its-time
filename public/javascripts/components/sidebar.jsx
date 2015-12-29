var React = require('react');
var Reflux = require('reflux');
var Card = require('./card');
var EntryStore = require('../stores/entry-store');
var Actions = require('../actions');

module.exports = React.createClass({
    mixins: [
        Reflux.listenTo(EntryStore, 'onChange')
    ],
    getInitialState: function() {
        return {data: []};
    },
    render: function() {
        return <div id="sidebar" className="col s0 m4 orange lighten-5">
            <div className="row">
                <h2 id="live-title" className="red-text text-accent-2">Live Feed</h2>
            </div>
            <div id="entries">
                <div className={this.state.data.length === 0 ? "hide" : "cards"}>
                    {this.renderCards()}
                </div>
                <div className={this.state.data.length === 0 ? "no-entries-msg" : "hide"}>
                    No one has shared what time of day it is for them yet. Be the first to share yours!
                </div>
            </div>
        </div>;
    },
    renderCards: function() {
        var items = this.state.data.map(function(item) {
            return <Card {...item} />;
        }.bind(this));
        
        return items;
    },
    onChange: function() {
        this.setState({
            data: EntryStore.data
        });
    }
});
