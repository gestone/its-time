var Fetch = require('whatwg-fetch');

module.exports = {
    createPost: function(phrase, lat, lng) {
        return fetch('http://localhost:8080/phrase', {
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
        return fetch('http://localhost:8080/like', {
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
