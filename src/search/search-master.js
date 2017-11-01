import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import axios from 'axios';

import './search-master.css';

import SearchQuery from './search-query';
import SearchFilters from './search-filters';
import SearchSort from './search-sort';
import SearchResults from './search-results';

//this will be removed when filters are received via ajax call
import JOBTYPES from '../data/filters1';

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
      sortedResults: [],
      sortBy: ''
    }

    this.updateQuery = this.updateQuery.bind(this);
    this.updateAppliedFilters = this.updateAppliedFilters.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
    this.updateResultsPerPage = this.updateResultsPerPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
    this.setPage = this.setPage.bind(this);
    this.updateSortBy = this.updateSortBy.bind(this);
    
  }

  componentDidMount() {
    this.feedFilters(JOBTYPES);
  }

  feedFilters(newFilter) {
    //some ajax
    this.setState({
      searchFilters: [...this.state.searchFilters, newFilter]
    })
  }

  updateSearch() {
    this.fetchApi();
    clearInterval(this.apiFetchIntervalId);
    this.apiFetchIntervalId = setInterval(
      () => this.fetchApi(),
      5000 //ms
      //make Macro
    );
    this.setState({
      resultsPage: SearchMaster.defaultProps.resultsPage,
      resultsPerPage: SearchMaster.defaultProps.resultsPerPage,
      startingResult: SearchMaster.defaultProps.startingResult,
      sortedResults: SearchMaster.defaultProps.sortedResults
    });
  }

  fetchApi() {
    //TODO get url from consumer
    let params = {
      'Keyword': this.state.searchQuery,
      'ResultsPerPage':50
    };
    for(let filter of this.state.appliedFilters) {
      params[filter] = true;
    }
    axios.get('https://data.usajobs.gov/api/Search', {
      headers: {
        // 'Host': 'data.usajobs.gov',
        // 'User-Agent': 'arowshan@metrostarsystems.com',
        'Authorization-Key': 'oa5FLRYDO+LFrLejBF3hqr0/AYlgQ1JZoA/GXch/47s='
      },
      params: params
    })
    .then((response) => {
      const resultsPath = this.props.searchResultsPath.split('.');
      let tempResults = response;
      for(let key of resultsPath) {
        tempResults = tempResults[key]
      }
      if(this.state.searchResults!==tempResults) {
        this.setState({
          searchResults: tempResults
        })
      }
      
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

  updateAppliedFilters(event) {
    if(event.target.checked) {
      this.setState({ 
        appliedFilters: [...this.state.appliedFilters, event.target.value]
      });
    }
    else {
      this.setState({ 
        appliedFilters: this.state.appliedFilters.filter(
          (_, i) => i !== this.state.appliedFilters.indexOf(event.target.value)
        )
      })
    }
    
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
  updateSortBy(event, index, value) {
    this.setState({
      sortBy : value
    }, () => this.sortResults());  
  }

  sortResults() {
    const sortCategoryPath = this.state.sortCategories[this.state.sortBy].split('.');
    let sortedResults = this.state.searchResults.concat().sort(
      (a, b) => {
        for (let key of sortCategoryPath) {
          a = a[key];
          b = b[key];
        }
        if(typeof(a)==='number') {
          return a - b;
        }
        if(typeof(a)==='string') {
          return a.localeCompare(b)
        }
        else return false
      }
    );
    
    //use ES6 syntax
    this.setState ({
      sortedResults : sortedResults
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
          sortCategories={this.state.sortCategories}
          sortBy={this.state.sortBy}
          updateSortBy={this.updateSortBy}
        />
      )
    }
  }

  renderFilterOptions() {
    if(this.state.searchResults.length>0) {
      return (
        <SearchFilters 
          searchFilters={this.state.searchFilters}
          updateAppliedFilters={this.updateAppliedFilters}
        />
      )
    }
  }
  


  render() {

    return (
      <MuiThemeProvider>
      <div className="search-container">
        <SearchQuery className="query-container"
          searchQuery={this.state.searchQuery}
          queryChange={this.updateQuery}
          onSearch={this.updateSearch}
        />
        <div className="filters-and-results">
          {this.renderFilterOptions()}
          <SearchResults
            searchResults={this.state.sortedResults.length>0? this.state.sortedResults: this.state.searchResults}
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
  sortedResults: []
}


export default SearchMaster;
