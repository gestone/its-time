var React = require('react');
var Main = require('./main');

var elem = React.createElement(Main, {});

React.render(elem, document.querySelector('.main'));
