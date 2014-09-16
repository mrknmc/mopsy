/** @jsx React.DOM */

var React = require('react');
var mopidy = require('./mopidyService');


var TIMEPOSITION_INTERVAL = 500;


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
            <div className='btn-group btn-group-lg pull-left'>
                <button type='button' className='btn btn-default' onClick={this.onBackwardClick}>
                    <span className='glyphicon glyphicon-backward'></span>
                </button>
                <button type='button' className='btn btn-default' onClick={this.onTogglePlay}>
                    <span className={playClass}></span>
                </button>
                <button type='button' className='btn btn-default' onClick={this.onForwardClick}>
                    <span className='glyphicon glyphicon-forward'></span>
                </button>
            </div>
        );
    }
});


var PlayInfo = React.createClass({
    getInitialState: function() {
        return {'tlTrack': null, 'timePosition': 50};
    },
    componentWillMount: function() {
        var info = this;
        mopidy.playback.getCurrentTlTrack().then(function(tlTrack) {
            info.setState({'tlTrack': tlTrack});
        });
        this.updateTimePosition()
    },
    componentDidMount: function() {
        this.interval = setInterval(this.updateTimePosition, TIMEPOSITION_INTERVAL);
    },
    componentWillUnmount: function() {
        clearInterval(this.interval);
    },
    updateTimePosition: function() {
        var info = this;
        mopidy.playback.getTimePosition().then(function(position) {
            info.setState({'timePosition': position});
        });
    },
    playbackStarted: function(tlTrack) {
        this.setState({'tlTrack': tlTrack});
    },
    render: function() {
        var tlTrack = this.state.tlTrack;
        var artistName = '';
        var trackName = '';
        var trackLength = 0;
        if (tlTrack !== null) {
            track = tlTrack.track;
            artistName = track.artists[0].name;
            trackName = track.name;
            trackLength = track.length;
        }
        var width = trackLength == 0 ? 0 : (this.state.timePosition / trackLength) * 100;
        var style = {'width': width + '%'};
        var minutes = Math.floor(trackLength / 60000);
        var remainderSeconds = (trackLength / 1000) - (60 * minutes);
        return (
            <div>
                <span className='center-block' style={{'text-align': 'center'}}>
                    <a href="#">{artistName}</a> — <a href="#">{trackName}</a>
                </span>
                <span className='pull-left'>0:00</span>
                <span className='pull-right'>{minutes + ':' + remainderSeconds}</span>
                <div className='progress'>
                    <div className='progress-bar progress-bar-striped active'  role='progressbar' aria-valuenow={this.state.timePosition} aria-valuemin='0' aria-valuemax={trackLength} style={style}>
                    </div>
                </div>
            </div>
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
