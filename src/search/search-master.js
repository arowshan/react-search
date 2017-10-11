import React, { Component } from 'react';

import SearchQuery from './search-query';
import SearchFilters from './search-filters';
import SearchResults from './search-results'; 

class SearchMaster extends Component {

  constructor() {
    super();
    this.state = {
      searchQuery: '',
      searchFilters: ['location', 'web', 'mobile'],
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
        <SearchResults />
      </div>
    );
  }
}

export default SearchMaster;
