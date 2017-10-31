import React, { Component } from 'react';
import './search-results.css'

class SearchResults extends Component {
  
  listResults() {
    return this.props.searchResults.slice(
      this.props.resultsPerPage*(this.props.resultsPage-1), 
      this.props.resultsPerPage*(this.props.resultsPage)
    )
    .map( (result) => {
      return React.cloneElement(this.props.resultComponent, {
        result: result,
        //TODO:should use id or something general
        key: result.MatchedObjectId
      })
    })
  }
  
  render() {
    return (
      <div className="results-container">
        {/* <span className="search-criteria">search results for [search query] and [search filters]</span> */}
        {this.listResults()}
      </div>
    );
  }
}

export default SearchResults;
