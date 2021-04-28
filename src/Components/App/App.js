import React from 'react';
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import { Playlist } from '../Playlist/Playlist';
import './App.css';


class App extends React.Component() {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: '',
      playlistTracks: []
    }
    this.addTrack = this.addTrack.bind(this);
  };
  addTrack(track) {
    const currentSong = this.state.playlistTracks;
    if (currentSong.find(currentTrack => currentTrack.id === track.id)) {
      return;
    } else {
      currentSong.push(track);
      this.setState({ playlistTracks: currentSong });
    }
  }
  render() {
    return (
      <div>
        <h1>Ja <span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlst">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
