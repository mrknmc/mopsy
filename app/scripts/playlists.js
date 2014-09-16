/** @jsx React.DOM */

var React = require('react');
var _ = require('underscore');
var mopidy = require('./mopidyService');


var PlaylistElement = React.createClass({
    render: function() {
        var handleClick = this.props.handleClick;
        var pl = this.props.playlist;
        var onClick = function() {
            var t = handleClick(pl);
        };

        var tracks = this.props.playlist.tracks;
        var disabled = tracks === undefined;
        var classes = 'list-group-item';
        var length;
        if (disabled) {
            length = 0;
            classes += ' disabled';
        } else {
            length = tracks.length;
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
        return {'playlists': []};
    },
    handleClick: function(playlist) {
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
        var handleClick = this.handleClick;
        var createPlaylist = function(playlist) {
            return <PlaylistElement playlist={playlist} key={playlist.uri} handleClick={handleClick} />
        }
        return <div className='list-group'>{this.state.playlists.map(createPlaylist)}</div>;
    }
});

module.exports = PlaylistList;
