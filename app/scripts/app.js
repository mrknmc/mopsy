/** @jsx React.DOM */

var Mopidy = require('mopidy');
var React = window.React = require('react');

var Timer = require("./ui/Timer");
var PlaylistList = require('./playlists');


var TodoList = React.createClass({
  render: function() {
    var createItem = function(itemText) {
      return <li>{itemText}</li>;
    };
    return <ul>{this.props.items.map(createItem)}</ul>;
  }
});


var TodoApp = React.createClass({
  getInitialState: function() {
    return {items: [], text: ''};
  },
  onChange: function(e) {
    this.setState({text: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var nextItems = this.state.items.concat([this.state.text]);
    var nextText = '';
    this.setState({items: nextItems, text: nextText});
  },
  render: function() {
    return (
      <div>
        <h3>TODO</h3>
        <TodoList items={this.state.items} />
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.onChange} value={this.state.text} />
          <button>{'Add #' + (this.state.items.length + 1)}</button>
        </form>
        <Timer />
      </div>
    );
  }
});


var Playlists = React.createClass({
    render: function() {

        var handleClick = function(uri) {
            return mopidy.tracklist.clear({}).then(function(data) {
                return mopidy.tracklist.add({"tracks":null, "at_position":null, "uri":uri});
            }, console.error.bind(console));
        };

        return (
            <div>
                <div className="page-header">
                    <h1>Playlists</h1>
                </div>
                <PlaylistList playlists={mopidy.playlists.getPlaylists()} handleClick={handleClick} />
            </div>
        )
    }
});


var init = function() {
    React.renderComponent(<TodoApp />, document.getElementById("home"));
    React.renderComponent(<Playlists />, document.getElementById("playlists"));
}


var mopidy = new Mopidy();             // Connect to server
mopidy.on(console.log.bind(console));  // Log all events
mopidy.on('state:online', init);
