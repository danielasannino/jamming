import React from 'react';
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import { Playlist } from '../Playlist/Playlist';
import './App.css';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: '',
      playlistTracks: []
    }
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }
  addTrack(track) {
    const currentSong = this.state.playlistTracks;
    if (currentSong.find(currentTrack => currentTrack.id === track.id)) {
      return;
    } else {
      currentSong.push(track);
      this.setState({ playlistTracks: currentSong });
    }
  }
  removeTrack(track) {
    const removeSong = this.state.playlistTracks.filter(currentTrack => currentTrack.id !== track.id);
    this.setState({ playlistTracks: removeSong });
  }
  savePlaylist() {
    const trackURIs = this.state.playlistTracks.map(track => track.uri);
  }
  search(term) {
    console.log(term);
  }
  updatePlaylistName(name) {
    this.setState({ playlistName: name });
  }
  render() {
    return (
      <div>
        <h1>Ja <span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlst">
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.addTrack} />
            <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
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
