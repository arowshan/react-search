import React, { Component } from 'react';

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
        key: result.id
      })
    })
  }
  
  render() {
    return (
      <div>
        {this.listResults()}
      </div>
    );
  }
}

export default SearchResults;
