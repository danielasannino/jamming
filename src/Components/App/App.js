import React from 'react';
import './App.css';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

import Spotify from '../../util/Spotify';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      playlistName: 'Playlist 1',
      playListTracks: [],
      searchResults: []
    }

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
  }

  addTrack(track) {
    const addList = this.state.playListTracks;
    if (addList.find(saved => saved.id === track.id)) {
      return;
    }
    addList.push(track);
    this.setState({ playListTracks: addList });
  }

  removeTrack(track) {
    const removeList = this.state.playListTracks.filter(current => current.id !== track.id);
    this.setState({ playListTracks: removeList });
  }

  savePlaylist() {
    const trackURIs = this.state.playListTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
      this.setState({
        playlistName: 'New Playlist',
        playListTracks: []
      })
    })
  }

  search(term) {
    Spotify.search(term).then(result => {
      console.log(result);
      this.setState({ searchResults: result });
    });

  }

  updatePlaylistName(name) {
    this.setState({ playlistName: name });
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.addTrack} />
            <Playlist
              playlistName={this.state.playlistName}
              playListTracks={this.state.playListTracks}
              onNameChange={this.updatePlaylistName}
              onRemove={this.removeTrack}
              onSave={this.savePlaylist} />
          </div>
        </div>
      </div>
    );
  }

}

export default App;