/** @jsx React.DOM */

var React = require('react');
var _ = require('underscore');
var mopidy = require('./mopidyService');


var PlaylistElement = React.createClass({
    render: function() {
        var elem = this;
        var onClick = function() {
            elem.props.handleClick(elem.props.playlist);
        };

        var length = this.props.playlist.tracks.length;
        var classes = 'list-group-item';
        if (this.props.active) {
            classes += ' active';
        }
        return (
            <a className={classes} href='#' onClick={onClick}>
                <span className='badge'>{length}</span>
                <span className='glyphicon glyphicon-play'></span>
                {this.props.playlist.name}
            </a>
        );
    }
});


var PlaylistList = React.createClass({
    getInitialState: function() {
        return {'playlists': [], 'active': null};
    },
    handleClick: function(playlist) {
        this.setState({'active': playlist.uri})

        return mopidy.tracklist.clear().then(function() {
            mopidy.tracklist.add(playlist.tracks).then(function (tlTracks) {
                return mopidy.playback.play(tlTracks[0]);
            });
        });
    },
    fetchPlaylists: function() {
        var list = this;
        mopidy.playlists.getPlaylists().then(function(playlists) {
            // filter out ones without tracks
            var pls = _.filter(playlists, list.hasTracks);
            list.setState({'playlists': pls});
        });
    },
    componentWillMount: function() {
        this.fetchPlaylists();
    },
    hasTracks: function(playlist) {
        return playlist.tracks !== undefined;
    },
    render: function() {
        var list = this;
        var createPlaylist = function(playlist) {
            var active = playlist.uri === list.state.active;
            return <PlaylistElement playlist={playlist} key={playlist.uri} active={active} handleClick={list.handleClick} />
        }
        return <div className='list-group'>{this.state.playlists.map(createPlaylist)}</div>;
    }
});

module.exports = PlaylistList;
