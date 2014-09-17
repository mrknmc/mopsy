/** @jsx React.DOM */

var mopidy = require('./mopidyService');
var React = window.React = require('react');

var PlaylistList = require('./playlists');
var NowPlaying = require('./nowPlaying');


var init = function() {
    React.renderComponent(<TodoApp />, document.getElementById("home"));
    React.renderComponent(<NowPlaying />, document.getElementById("nowplaying"));
    React.renderComponent(<PlaylistList />, document.getElementById("playlists-list"));
}


mopidy.on('state:online', init);
