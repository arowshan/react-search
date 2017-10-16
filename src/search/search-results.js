import React, { Component } from 'react';

class SearchResults extends Component {
  
  listResults() {
    return this.props.searchResults.slice(0, this.props.resultsPerPage)
    .map( (result) => {
      return React.cloneElement(this.props.children, { 
        result: result,
        //TODO:should use id or something general
        key: result.position
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
