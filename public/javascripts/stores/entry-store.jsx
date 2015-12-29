var Reflux = require('reflux');
var Api = require('../utils/api');
var Actions = require('../actions');
var _ = require('lodash');
var socket = io.connect('http://localhost');

module.exports = Reflux.createStore({
    listenables: [Actions],
    getPosts: function() {
        socket.on('initialData', this.setInitialData);
        socket.on('newEntry', this.setNewData);
        socket.on('updateLikes', this.setLikedEntry);
    },
    setInitialData: function(json) {
        this.data = json;
        this.triggerChange();
    },
    setNewData: function(json) {
        this.data.unshift(json);
        this.triggerChange();
    },
    setLikedEntry: function(json) {
        var updatedEntry = _.findWhere(this.data, {key: json.key});
        updatedEntry.likes = json.likes;
        this.triggerChange();
    },
    triggerChange: function() {
        this.trigger('change', this.data);
    }
});
