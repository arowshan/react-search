import React, { Component } from 'react';

import SearchQuery from './search-query';
import SearchFilters from './search-filters';
import SearchSort from './search-sort';
import SearchResults from './search-results';

import DATA from '../data/data';

class SearchMaster extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      searchFilters: this.props.searchFilters,
      appliedFilters: [],
      resultsPerPage: 0,
      searchResults: []
    }

    this.updateQuery = this.updateQuery.bind(this);
    this.updateFilters = this.updateFilters.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
    
  }

  updateQuery(event) {
    this.setState({ searchQuery: event.target.value });
  }

  updateFilters() {
    this.setState({ appliedFilters: [...this.state.appliedFilters, ]});
  }

  updateSearch() {
    //TODO: Send AJAX with query and filters set
    console.log(this.state.searchQuery);
    this.setState({
      searchResults: DATA,
    });

  }

  updateResultsPerPage(event) {
    this.setState({
      resultsPerPage : event.target.value
    })
  }

  render() {

    return (
      <div>
        <SearchQuery
          onChange={this.updateQuery}
          onSearch={this.updateSearch}
        />
        <SearchFilters searchFilters={this.state.searchFilters}/>
        <SearchSort 
          resultsCount={this.state.searchResults.length} 
          resultsPerPage={this.state.resultsPerPage}
          updateResultsPerPage={this.updateResultsPerPage}
        />
        <SearchResults searchResults={this.state.searchResults}/>
      </div>
    );
  }
}

export default SearchMaster;
