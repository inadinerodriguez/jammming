import React from 'react';
import '../App/App.css';
import Playlist from '../Playlist/Playlist';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';

class App extends React.Component {
  constructor(props){
    super(props);

    this.state.searchResults = ["name", "artist", "album", "id"];
    this.playlistName = '';
    this.playlistTracks = ["name", "artist", "album", "id"];

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }

  addTrack(track) {
    if(this.state.playlistTracks.find(savedTrack => 
      savedTrack.id === track.id)) {
        return;
      }
    this.setState(this.playlistTracks);
  }

  removeTrack(track) {
    if (this.state.playlistTracks.filter(savedTrack => 
      savedTrack.id !== track.id)) {
        return;
      }
    this.setState(this.removeTrack);
  }

  render(){
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
        <SearchBar />
        <div className="App-playlist">
          <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
          <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack}/>
        </div>
        </div>
      </div>
    );
  }
};

export default App;
