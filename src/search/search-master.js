import React, { Component } from 'react';

import SearchQuery from './search-query';
import SearchFilters from './search-filters';
import SearchSort from './search-sort';
import SearchResults from './search-results'; 

class SearchMaster extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      searchFilters: this.props.searchFilters,
      searchResults: []
    }

    this.updateSearch = this.updateSearch.bind(this);
    this.updateQuery = this.updateQuery.bind(this);
    
  }

  updateQuery(event) {
    this.setState({ searchQuery: event.target.value });
  }

  updateSearch() {
    console.log(this.state.searchQuery);
  }

  render() {
    return (
      <div>
        <SearchQuery
          onChange={this.updateQuery}
          onSearch={this.updateSearch}
        />
        <SearchFilters searchFilters={this.state.searchFilters}/>
        <SearchSort />
        <SearchResults results={this.state.searchResults}/>
      </div>
    );
  }
}

export default SearchMaster;
