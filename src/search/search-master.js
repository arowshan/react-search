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
      //TODO dynamically get this
      resultsPage: 1,
      resultsPerPage: 25,
      startingResult: 0,
      searchResults: []
    }

    this.updateQuery = this.updateQuery.bind(this);
    this.updateFilters = this.updateFilters.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
    this.updateResultsPerPage = this.updateResultsPerPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
    this.setPage = this.setPage.bind(this);
    
  }

  updateQuery(event) {
    this.setState({ searchQuery: event.target.value });
  }

  updateFilters() {
    this.setState({ appliedFilters: [...this.state.appliedFilters, ]});
  }

  updateSearch() {
    //TODO: Send AJAX with query and filters set
    this.setState({
      searchResults: DATA,
    });
  }

  updateResultsPerPage(event) {
    this.setState({
      resultsPerPage : event.target.value
    });
  }

  nextPage() {
    this.setState({
      resultsPage : Number(this.state.resultsPage)+1
    });
  }

  prevPage() {
    if(this.state.resultsPage!==1) {
      this.setState({
        resultsPage : Number(this.state.resultsPage)-1
      });
    }
  }
  
  setPage(event) {
    const page = event.target.value;
    if(page >= 1){
      this.setState({
        resultsPage : page
      });
    }
    else {
      this.setState({
        resultsPage : 1
      });
    }
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
          resultsPage={this.state.resultsPage}
          resultsPerPage={this.state.resultsPerPage}
          updateResultsPerPage={this.updateResultsPerPage}
          nextPage={this.nextPage}
          prevPage={this.prevPage}
          setPage={this.setPage}
          startingResult={this.state.startingResult}
        />
        <SearchResults
          searchResults={this.state.searchResults}
          resultsPage={this.state.resultsPage}
          resultsPerPage={this.state.resultsPerPage}
          children={this.props.children}
        />
        
      </div>
    );
  }
}

export default SearchMaster;
