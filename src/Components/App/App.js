import React, { Component } from 'react';
import {SearchBar} from "../SearchBar/SearchBar.js";
import {SearchResults} from "../SearchResults/SearchResults.js";
import {Playlist} from "../Playlist/Playlist.js";
//import Spotify from "../../util/Spotify.js";
//import Spotify2 from "../../util/Spotify2.js";
import Spotify3 from "../../util/Spotify3.js";

import './App.css';

/* dummy track to be placed in this.state.searchResults and this.state.playlistTracks
const track = {
  name: "name",
  artist: "artist",
  album: "album"
};

const track1 = {
  name: "name1",
  artist: "artist1",
  album: "album1"
}; */

export class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      searchResults: [],
      playlistName: "New Playlist",
      playlistTracks: []
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    let i = 0; //counter

    //increase counter if same track is found in the Playlist
    this.state.playlistTracks.forEach(item => {
      if (item.id === track.id) {i++};
    });

    //if counter remains 0, add in the track to the Playlist
    if (i === 0) {
      this.setState({playlistTracks: this.state.playlistTracks.concat(track)});
    }
  }

  removeTrack(track) {
    //find the index of track in the array, and remove it using splice()
    let i = this.state.playlistTracks.indexOf(track);
    this.setState({playlistTracks: this.state.playlistTracks.splice(i,1)});
  }

  updatePlaylistName(name) {
    this.setState({playlistName: name});
  }

  savePlaylist() {
    Spotify3.savePlaylist(this.state.playlistName, this.state.playlistTracks);
    window.alert("The playlist has been saved!");
  }

  search(searchTerm) {
    Spotify3.search(searchTerm).then(item => {
      this.setState({searchResults: item});
    });

  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
            <SearchBar onSearch={this.search}/>
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist}/>
          </div>
        </div>
      </div>
    );
  }
}
