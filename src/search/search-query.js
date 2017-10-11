import React, { Component } from 'react';

class SearchQuery extends Component {
  render() {
    return (
      <div>
        <input type="search" onChange={this.props.onChange}/>
      </div>
    );
  }
}

export default SearchQuery;
