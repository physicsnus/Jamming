import React, { Component } from 'react';
import {Tracklist} from "../Tracklist/Tracklist.js";

import './SearchResults.css';

export class SearchResults extends Component {
  render() {
    return (

      <div className="SearchResults">
        <h2>Results</h2>
        <Tracklist tracks={this.props.searchResults} isRemoval="+" onAdd={this.props.onAdd}/>
      </div>
    );
  }
}
