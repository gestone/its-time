var Socket = require('../controller/socket');
var Db = require('./db');

/**
 * Sends a newly constructed entry back.
 */
function sendNewEntryBack(response, curEntry, error, result) {
    return function(error, result) {
        if (!error) {
            curEntry.key = result.rows[0].key;
            curEntry.id = curEntry.key;
            curEntry.likes = 0;
            Socket.emitEvent('newEntry', curEntry);
            response.status(200).send();
        } else {
            response.status(400).send({error: 'error inserting into the db'});
        }
    };
}

/**
 * Sends an updated like.
 */
function sendUpdatedLike(response, error, result) {
    return function(error, result) {
        if (!error) {
            Socket.emitEvent('updateLikes', result.rows[0]);
            response.status(200).send();
        } else {
            response.status(400).send({error: 'error inserting into the db'});
        }
    };
}

module.exports = {
    phrase: function(req, res, next){
        // Deals with the posting of the new posts.
        var phrase = "IT'S " + req.body.phrase + " TIME";
        var lat = req.body.lat;
        var lng = req.body.lng;
        var isoString = new Date(Date.now()).toUTCString();

        var queryStr = 'INSERT INTO entries (post_time, lat, lng, what_time) VALUES ($1, $2, $3, $4) ' +
            'RETURNING key';

        var curEntry = {lat: lat, lng: lng, post_time: isoString, what_time: phrase};

        Db.query(queryStr, [isoString, lat, lng, phrase], sendNewEntryBack(res, curEntry));
    },
    like: function(req, res, next) {
        // Deals with a new like request.
        var key = req.body.key;
        var queryStr = 'UPDATE entries SET likes = likes + 1 WHERE key=$1 RETURNING key, likes';

        Db.query(queryStr, [key], sendUpdatedLike(res));
    }
};
