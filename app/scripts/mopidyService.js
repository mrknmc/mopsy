var Mopidy = require('mopidy');

var MopidyService = function() {
    Mopidy.call(this);
    this.on(console.log.bind(console));
};

MopidyService.prototype = new Mopidy;

MopidyService.prototype.playPlaylist = function(playlist) {
    var mopidy = this;
    mopidy.tracklist.clear().then(function() {
        mopidy.tracklist.add(playlist.tracks).then(function (tlTracks) {
            return mopidy.playback.play(tlTracks[0]);
        });
    })
};

module.exports = new MopidyService();
