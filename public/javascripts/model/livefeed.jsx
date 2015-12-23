var React = require('react');
var Map = require('./map');
var SideBar = require('./sidebar');

module.exports = React.createClass({
    render: function() {
        var testData = [
            {
                time_ago: "1 hour ago",
                what_time: "IT'S NAKIE TIME"
            },
            {
                time_ago: "2 hours ago",
                what_time: "IT'S PANTS OFF TIME"
            },
            {
                time_ago: "20 minutes ago",
                what_time: "IT'S PANTS ON TIME"
            },
            {
                time_ago: "10 minutes ago",
                what_time: "IT'S DDJ TIME"
            }
        ];
        return <div id="livefeed-container" className="row">
            <Map />
            <SideBar data={testData} />
        </div>;
    }
});
