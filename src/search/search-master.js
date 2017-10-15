import React, { Component } from 'react';

import SearchQuery from './search-query';
import SearchFilters from './search-filters';
import SearchResults from './search-results'; 

class SearchMaster extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      searchFilters: this.props.searchFilters,
      searchResults: []
    }
  }

  updateSearch(event) {
    console.log(event.target.value);
  }

  render() {
    return (
      <div>
        <SearchQuery onChange={this.updateSearch}/>
        <SearchFilters searchFilters={this.state.searchFilters}/>
        <SearchResults results={this.state.searchResults}/>
      </div>
    );
  }
}

export default SearchMaster;
