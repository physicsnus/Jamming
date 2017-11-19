import React, { Component } from 'react';
import {Track} from "../Track/Track.js";

import './Tracklist.css';


export class Tracklist extends Component {
  constructor(props){
    super(props);
    this.listTrack = this.listTrack.bind(this);
  }

  listTrack(tracks) {
    if(tracks instanceof Array) {
      return tracks.map(track => <Track track={track} key={track.id} isRemoval={this.props.isRemoval} onAdd={this.props.onAdd} onRemove={this.props.onRemove}/>);
    }
  }

  render(){
    return(
      <div className="TrackList">
        {this.listTrack(this.props.tracks)}
      </div>
    );
  }
}

//<h1> {this.props.tracks.map(track => <Track track={track} /*key={track.id}*/ />)} </h1>
