import React, { Component } from 'react';
import {Tracklist} from "../Tracklist/Tracklist.js";

import './Playlist.css';

export class Playlist extends Component{
  constructor(props) {
    super(props);

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
  }

  handleEnter(e) {
    if (e.key === "Enter") {
      this.props.onSave();
    }
  }

  handleNameChange(e) {
    this.props.onNameChange(e.target.value);
  }

  render() {
    return(
      <div className="Playlist">
        <input type="text" placeholder={this.props.playlistName} onChange={this.handleNameChange} onKeyPress={this.handleEnter}/>
        <Tracklist tracks={this.props.playlistTracks} isRemoval="-" onRemove={this.props.onRemove}/>
        <a className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</a>
      </div>
    )
  }
}
