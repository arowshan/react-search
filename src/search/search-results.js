import React, { Component } from 'react';

class SearchResults extends Component {
  render() {
    return (
      <div>
        {this.props.results}
      </div>
    );
  }
}

export default SearchResults;
