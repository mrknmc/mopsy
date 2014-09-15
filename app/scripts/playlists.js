/** @jsx React.DOM */

var React = require('react');
var mountNode = document.getElementById("playlists");


var PlaylistElement = React.createClass({
    play: function() {
        var uri = this.props.playlist.uri;
        mopidy.tracklist.add({"tracks":null, "at_position":null, "uri": uri}).then(function(data){
          console.log(data);
        });
    },
    render: function() {
        var uri = this.props.playlist.uri;
        var handleClick = this.props.handleClick;
        var onClick = function() {
            handleClick(uri);
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
            <a className={classes} href="#">
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
    render: function() {
        var handleClick = this.props.handleClick;
        var createPlaylist = function(playlist) {
            return <PlaylistElement playlist={playlist} key={playlist.uri} handleClick={handleClick} />;
        };

        return <div className="list-group">{this.state.playlists.map(createPlaylist)}</div>;
    }
});

module.exports = PlaylistList;
