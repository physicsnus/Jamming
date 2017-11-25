import React, { Component } from 'react';

import './SearchBar.css';

export class SearchBar extends Component{
  constructor(props) {
    super(props);
    this.state = {searchTerm: ""};

    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
  }

  search() {
    this.props.onSearch(this.state.searchTerm);
  }

  handleTermChange(e) {
    this.setState({searchTerm: e.target.value});
  }

  handleEnter(e) {
    if (e.key === "Enter") {
      this.search();
    }
  }

  render() {
    return (
      <div className="SearchBar">
        <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange} onKeyPress={this.handleEnter}/>
        <a onClick={this.search}>SEARCH</a>
      </div>
    );
  }
}
