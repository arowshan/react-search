import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import axios from 'axios';
import RaisedButton from 'material-ui/RaisedButton';

import './search-master.css';

import SearchQuery from './search-query';
import SearchFilters from './search-filters';
import SearchSort from './search-sort';
import SearchResults from './search-results';

class SearchMaster extends Component {

  apiFetchIntervalId;
  // isNewFilterApplied = true;

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
      sortBy: '',
      isNewFilterApplied: false
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

  feedFilters(newFilter) {
    //some ajax
    this.setState({
      searchFilters: this.state.searchFilters.concat([newFilter])
    })
  }

  updateSearch() {
    const url = this.props.url;
    const headers = { 'Authorization-Key': 'oa5FLRYDO+LFrLejBF3hqr0/AYlgQ1JZoA/GXch/47s='};
    const params = {
      'Keyword': this.state.searchQuery,
      'ResultsPerPage':50
    };
    if(this.state.isNewFilterApplied) {
      for(let filter of this.state.appliedFilters) {
        params[filter] = true;
      }
      this.setState({
        isNewFilterApplied : false
      });
    }
    this.fetchApi(url, headers, params);
    clearInterval(this.apiFetchIntervalId);
    this.apiFetchIntervalId = setInterval(
      () => this.fetchApi(url, headers, params),
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

  fetchApi(url, headers, params) {
    axios.get(
      url, {
      headers: headers,
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
    this.setState({
      isNewFilterApplied: true
    });
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

  renderFilterButtons() {
    if(this.state.isNewFilterApplied) {
      return (
        <div className="applyButton">
          <RaisedButton onClick={this.updateSearch} label="Apply" primary={true} />
        </div>
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
          <div>
            {this.renderFilterOptions()}
            {this.renderFilterButtons()}
          </div>
          <div>
            <SearchResults
              searchResults={this.state.sortedResults.length>0? this.state.sortedResults: this.state.searchResults}
              resultsPage={this.state.resultsPage}
              resultsPerPage={this.state.resultsPerPage}
              resultComponent={this.props.resultComponent}
            />
          </div>
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
