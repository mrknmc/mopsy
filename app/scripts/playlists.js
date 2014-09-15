/** @jsx React.DOM */

var React = require('react');
var mopidy = require('./mopidyService');
var mountNode = document.getElementById("playlists");


var PlaylistElement = React.createClass({
    render: function() {
        // var onClick = this.props.handleClick.bind(this, this.props.playlist);
        var handleClick = this.props.handleClick;
        var pl = this.props.playlist;
        var onClick = function() {
            console.log('clicky clack');
            var t = handleClick(pl);
            console.log(t);
        }

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
            <a className={classes} href="#" onClick={onClick}>
                <span className='badge'>{length}</span>
                <span className='glyphicon glyphicon-play'></span>
                {this.props.playlist.name}
            </a>
        );
    }
});


var PlaylistList = React.createClass({
    getInitialState: function() {
        return {playlists: []};
    },
    componentWillMount: function() {
        var list = this;
        this.props.playlists
        .catch(console.error.bind(console))
        .done(function(value) {
            list.setState({playlists: value});
        });
    },
    handleClick: function(playlist) {
        var track = playlist.tracks[0];
        return mopidy.playback.stop({'clear_current_track': true}).then(
            function() {
                mopidy.tracklist.clear()
            },
            console.error.bind(console)
        ).then(
            function() {
                return mopidy.tracklist.add({'tracks':playlist.tracks});
            },
            console.error.bind(console)
        ).then(
            function() {
                mopidy.tracklist.getTlTracks().then(
                    function(tlTracks) {
                        var tlTrackToPlay = _.find(tlTracks, function(tlTrack) {
                            return tlTrack.track.uri === track.uri;
                        });
                        return mopidy.playback.changeTrack({'tl_track': tlTrackToPlay});
                    }
                );
            },
            console.error.bind(console)
        ).then(
            function() {
                return mopidy.playback.play();
            },
            console.error.bind(console)
        );
    },
    render: function() {
        var handleClick = this.handleClick;
        var createPlaylist = function(playlist) {
            return <PlaylistElement playlist={playlist} key={playlist.uri} handleClick={handleClick} />;
        };

        return <div className="list-group">{this.state.playlists.map(createPlaylist)}</div>;
    }
});

module.exports = PlaylistList;
