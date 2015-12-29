/**
 * Socket used for communciating data to the live feed of posts and likes.
 */

var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var Db = require('../utils/db');

server.listen(process.env.SOCKET_PORT);

var grabAllData = function(error, result) {
    io.emit('initialData', result.rows);
};

var sendInitialData = function(socket) {
    // grab data from the database, format the data, send it back
    var queryStr = "SELECT *, key as id FROM entries " + 
                        "WHERE post_time >= NOW() - '1 day'::INTERVAL " + 
                            "ORDER BY post_time DESC LIMIT 250";
    Db.query(queryStr, [], grabAllData);
};

io.on("connection", sendInitialData);
module.exports.emitEvent = function(ev, data) {
    io.emit(ev, data);
};
