var pg = require('pg');
var conString = "postgres://" + process.env.DBUSER + "@" + process.env.HOST + "/" + process.env.DATABASE;

module.exports.query = function(queryStr, data, callBack) {
    pg.connect(conString, function(err, client, done) {
        if (err) {
            console.log(err);
        }
        client.query(queryStr, data, function(err, result) {
            if (err) {
                console.log(err);
                callBack(true, {error: "Error querying the database"});
            } else {
                // send back a callback with the result
                callBack(false, result);
            }
            done();
        });
    });
};
