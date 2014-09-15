/** @jsx React.DOM */

var React = require('react');
var mopidy = require('./mopidyService');


var PlaylistElement = React.createClass({
    render: function() {
        // var onClick = this.props.handleClick.bind(this, this.props.playlist);
        var handleClick = this.props.handleClick;
        var pl = this.props.playlist;
        var onClick = function() {
            console.log('clicky clack');
            var t = handleClick(pl);
            console.log(t);
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
        return mopidy.tracklist.clear().then(function() {
            mopidy.tracklist.add(playlist.tracks).then(function (tlTracks) {
                return mopidy.playback.play(tlTracks[0]);
            });
        });
    },
    render: function() {
        var handleClick = this.handleClick;
        var createPlaylist = function(playlist) {
            return <PlaylistElement playlist={playlist} key={playlist.uri} handleClick={handleClick} />;
        };

        return <div className='list-group'>{this.state.playlists.map(createPlaylist)}</div>;
    }
});

module.exports = PlaylistList;
