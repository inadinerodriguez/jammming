import React from 'react';
import '../App/App.css';

import Playlist from '../Playlist/Playlist';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Spotify from '../../util/Spotify';

class App extends React.Component {
  constructor(props){
    super(props);
      this.state = {
      searchResults: [],
      playlistName: "Playlist Name",
      playlistTracks: [],
      }
    this.search = this.search.bind(this);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
  }

  search(term) {
    Spotify.search(term).then(searchResults => {
      this.setState({searchResults: searchResults});
    });
  }

  async search(term) {
      const response = await Spotify.search(term);
      this.setState({ searchResults: response });
  }

  addTrack(track) {
    if(this.state.playlistTracks.find(savedTrack => 
      savedTrack.id === track.id)) {
        return;
      }
    let newPlaylistTrack = [...this.state.playlistTracks];
    newPlaylistTrack.push(track);
    this.setState({playlistTracks: newPlaylistTrack});
  }

  removeTrack(track) {
    let newPlaylistTrack = this.state.playlistTracks.filter(
      (savedTrack) => savedTrack.id !== track.id
    );
    this.setState({playlistTracks: newPlaylistTrack});
  }

  updatePlaylistName(newName) {
    this.setState({playlistName: newName});
  }

  async savePlaylist() {
    let trackUris = this.state.playlistTracks.map(track => track.uri);
    await Spotify.savePlaylist(this.state.playlistName, trackUris);
    this.setState({playlistName: "Playlist Name", playlistTracks: []});
  }

  render(){
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search}/>
          <div className="App-playlist">
            <SearchResults 
              searchResults={this.state.searchResults} 
              onAdd={this.addTrack}
              />
            <Playlist 
              playlistName={this.state.playlistName} 
              playlistTracks={this.state.playlistTracks} 
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName} 
              onSave={this.savePlaylist}
              />
          </div>
        </div>
      </div>
    );
  }
};

export default App;
