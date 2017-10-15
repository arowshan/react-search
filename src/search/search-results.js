import React, { Component } from 'react';

class SearchResults extends Component {
  
  listResults() {
    return this.props.searchResults.map( (result) => {
      return result.position;
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
