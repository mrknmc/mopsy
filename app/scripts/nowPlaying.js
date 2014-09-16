/** @jsx React.DOM */

var React = require('react');
var mopidy = require('./mopidyService');


var PlayControls = React.createClass({
    getInitialState: function() {
        return {'playing': false};
    },
    componentWillMount: function() {
        var ctrls = this;
        mopidy.playback.getState().then(function(state) {
            ctrls.setState({'playing': state === 'playing'});
        });
    },
    onTogglePlay: function() {
        this.setState({'playing': !this.state.playing});
        if (this.state.playing) {
            mopidy.playback.pause();
        } else {
            mopidy.playback.play();
        }
    },
    onBackwardClick: function() {
        mopidy.playback.previous();
    },
    onForwardClick: function() {
        mopidy.playback.next();
    },
    render: function() {
        var playClass = this.state.playing ? 'glyphicon glyphicon-pause' : 'glyphicon glyphicon-play';
        return (
            <div className='btn-group btn-group-lg'>
                <button type="button" className="btn btn-default" onClick={this.onBackwardClick}>
                    <span className="glyphicon glyphicon-backward"></span>
                </button>
                <button type="button" className="btn btn-default" onClick={this.onTogglePlay}>
                    <span className={playClass}></span>
                </button>
                <button type="button" className="btn btn-default" onClick={this.onForwardClick}>
                    <span className="glyphicon glyphicon-forward"></span>
                </button>
            </div>
        );
    }
});


var PlayInfo = React.createClass({
    getInitialState: function() {
        return {'tlTrack': null};
    },
    componentWillMount: function() {
        var info = this;
        mopidy.playback.getCurrentTlTrack().then(function(tlTrack) {
            info.setState({'tlTrack': tlTrack});
        });
    },
    playbackStarted: function(tlTrack) {
        info.setState({'tlTrack': tlTrack});
    },
    render: function() {
        var tlTrack = this.state.tlTrack;
        var artistName = '';
        var trackName = '';
        if (tlTrack !== null) {
            var track = tlTrack.track;
            var artistName = track.artists[0].name;
            var trackName = track.name;
        }
        return (
            <span><a>{artistName}</a>' — '<a>{trackName}</a></span>
        );
    }
});


var NowPlaying = React.createClass({
    render: function() {
        return (
            <div className='container'>
                <PlayControls />
                <PlayInfo />
            </div>
        );
    }
});

module.exports = NowPlaying;
