import React, { Component } from 'react';

import SearchQuery from './search-query';
import SearchFilters from './search-filters';
import SearchResults from './search-results'; 

class SearchMaster extends Component {
  render() {
    return (
      <div>
        <SearchQuery />
        <SearchFilters />
        <SearchResults />
      </div>
    );
  }
}

export default SearchMaster;
