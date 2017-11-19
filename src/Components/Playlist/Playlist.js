import React, { Component } from 'react';
import {Tracklist} from "../Tracklist/Tracklist.js";

import './Playlist.css';

export class Playlist extends Component{
  constructor(props) {
    super(props);

    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(e) {
    this.props.onNameChange(e.target.value);
  }

  render() {
    return(
      <div className="Playlist">
        <input defaultValue={this.props.playlistName} onChange={this.handleNameChange}/>
        <Tracklist tracks={this.props.playlistTracks} isRemoval="-" onRemove={this.props.onRemove}/>
        <a className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</a>
      </div>
    );
  }
}
