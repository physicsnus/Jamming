import React, { Component } from 'react';

import './Track.css';

export class Track extends Component {
  constructor(props){
    super(props);
    this.isRemoval = this.props.isRemoval;

    this.renderAction = this.renderAction.bind(this);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }

  addTrack() {
    this.props.onAdd(this.props.track);
  }

  removeTrack() {
    this.props.onRemove(this.props.track);
  }

  renderAction() {
    if(this.isRemoval === "+") {
      return <a className="Track-action" onClick={this.addTrack}> + </a>;
    } else {
      return <a className="Track-action" onClick={this.removeTrack}> - </a>;
    }
  }

  render() {
    return(
      <div className="Track">
        <div className="Track-information">
          <h3>  {this.props.track.name} </h3>
          <p> {this.props.track.artist}  | {this.props.track.album} </p>
        </div>
        {this.renderAction()}
      </div>
    );
  }
}
