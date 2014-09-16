/** @jsx React.DOM */

var React = require('react');
var mopidy = require('./mopidyService');


var PlayControls = React.createClass({
    getInitialState: function() {
        return {'playing': false};
    },
    onPlayPauseClick: function() {
        this.setState({'playing': !this.state.playing});
    },
    onBackwardClick: function() {
    },
    onForwardClick: function() {
    },
    render: function() {
        var playClass = this.state.playing ? 'glyphicon glyphicon-pause' : 'glyphicon glyphicon-play';
        return (
            <div className='btn-group btn-group-lg'>
                <button type="button" className="btn btn-default" onClick={this.onBackwardClick}>
                    <span className="glyphicon glyphicon-backward"></span>
                </button>
                <button type="button" className="btn btn-default" onClick={this.onPlayPauseClick}>
                    <span className={playClass}></span>
                </button>
                <button type="button" className="btn btn-default" onClick={this.onForwardClick}>
                    <span className="glyphicon glyphicon-forward"></span>
                </button>
            </div>
        );
    }
});


var NowPlaying = React.createClass({
    render: function() {
        return (
            <PlayControls />
        );
    }
});

module.exports = NowPlaying;
