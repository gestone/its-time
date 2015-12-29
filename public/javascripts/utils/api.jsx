var Fetch = require('whatwg-fetch');
var host = 'http://52.88.96.248:8080/';

module.exports = {
    createPost: function(phrase, lat, lng) {
        return fetch(host + '/phrase', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                phrase: phrase,
                lat: lat,
                lng: lng
            })
        });
    },
    likePost: function(key) {
        return fetch(host + '/like', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                key: key
            })
        });
    }
};
