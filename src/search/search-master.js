import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import axios from 'axios';

import './search-master.css';

import SearchQuery from './search-query';
import SearchFilters from './search-filters';
import SearchSort from './search-sort';
import SearchResults from './search-results';

class SearchMaster extends Component {

  apiFetchIntervalId;

  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      searchFilters: this.props.searchFilters,
      sortCategories: this.props.sortCategories,
      appliedFilters: [],
      //TODO dynamically get this
      resultsPage: 1,
      resultsPerPage: 5,
      startingResult: 0,
      searchResults: [],
      sortBy: ''
    }

    this.updateQuery = this.updateQuery.bind(this);
    this.updateFilters = this.updateFilters.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
    this.updateResultsPerPage = this.updateResultsPerPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
    this.setPage = this.setPage.bind(this);
    this.updateSortBy = this.updateSortBy.bind(this);
    
  }

  updateSearch() {
    clearInterval(this.apiFetchIntervalId);
    this.apiFetchIntervalId = setInterval(
      () => this.fetchApi(),
      2000
    );
    this.setState({
      resultsPage: SearchMaster.defaultProps.resultsPage,
      resultsPerPage: SearchMaster.defaultProps.resultsPerPage,
      startingResult: SearchMaster.defaultProps.startingResult,
    });
  }

  fetchApi() {
    //TODO get url from consumer
    axios.get('https://jsonplaceholder.typicode.com/posts')
    .then((response) => {
      this.setState({
        searchResults: response.data
      })
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  updateQuery(event) {
    this.setState({ 
      searchQuery: event.target.value 
    });
  }

  updateFilters() {
    this.setState({ appliedFilters: [...this.state.appliedFilters, ]});
  }

  updateResultsPerPage(event, index, value) {
    this.setState({
      resultsPerPage : value,
      resultsPage: 1
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
    if(page >= 1) {
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

// SORTING
  updateSortBy(event) {
    this.setState({
      sortBy : this.state.sortCategories[event.target.value][0]
    }, () => this.sortResults());  
  }

  sortResults() {
    let sortedResults = this.state.searchResults.concat().sort(
      (a, b) => {
        return a[this.state.sortBy].localeCompare(b[this.state.sortBy])
      }
    );
    
    this.setState ({
      searchResults : sortedResults
    });
  }

  renderSortOptions() {
    if(this.state.searchResults.length>0){
      return (
        <SearchSort 
          resultsCount={this.state.searchResults.length}
          resultsPage={this.state.resultsPage}
          resultsPerPage={this.state.resultsPerPage}
          updateResultsPerPage={this.updateResultsPerPage}
          nextPage={this.nextPage}
          prevPage={this.prevPage}
          setPage={this.setPage}
          startingResult={this.state.startingResult}
          sortCategories={this.props.sortCategories}
          sortBy={this.props.sortyBy}
          updateSortBy={this.updateSortBy}
        />
      )
    }
    
  }


  render() {

    return (
      <MuiThemeProvider>
      <div className="search-container">
        <SearchQuery
          searchQuery={this.state.searchQuery}
          queryChange={this.updateQuery}
          onSearch={this.updateSearch}
        />
        <div className="filters-and-results">
          <SearchFilters searchFilters={this.state.searchFilters}/>
          <SearchResults
            searchResults={this.state.searchResults}
            resultsPage={this.state.resultsPage}
            resultsPerPage={this.state.resultsPerPage}
            resultComponent={this.props.resultComponent}
          />
        </div>
        <div className="sort">
          {this.renderSortOptions()}
        </div>
      </div>
      </MuiThemeProvider>
    );
  }
}

SearchMaster.defaultProps = {
  resultsPage: 1,
  resultsPerPage: 5,
  startingResult: 0,
}


export default SearchMaster;
