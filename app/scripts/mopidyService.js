var Mopidy = require('mopidy');


var mopidy = new Mopidy();             // Connect to server
mopidy.on(console.log.bind(console));  // Log all events

module.exports = mopidy
