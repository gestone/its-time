module.exports = {
    calculateTimeAgo: function(postTime) {
        // Calculates how long ago the post was made.
        // Returns a string representing how long ago the post was made.
        
        // Calculate time difference
        var now = Date.now(); 
        var postCreateTime = Date.parse(postTime);
        var timeDiff = now - postCreateTime;

        // Choose unit
        var millisInDays = 86400000;
        var millisInHour = 3600000;
        var millisInMinute = 60000;
        var msg;
        if (timeDiff > millisInDays) {
            var days = Math.floor(timeDiff / millisInDays);
            msg = days === 1 ? "Yesterday" : days + " days ago";
        } else if (timeDiff > millisInHour) { // convert to an hour
            var hours = Math.floor(timeDiff / millisInHour);
            msg = hours === 1 ? "An hour ago" : hours + " hours ago";
        } else if (timeDiff > millisInMinute) { // convert to minutes
            var minutes = Math.floor(timeDiff / millisInMinute);
            msg = minutes === 1 ? "A minute ago" : minutes + " minutes ago";
        } else { // convert to seconds
            var seconds = Math.floor(timeDiff / 1000);
            msg = seconds === 1 ? "A second ago" : seconds + " seconds ago";
        }
        return msg;
    }
};
