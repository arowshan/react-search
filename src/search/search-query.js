import React, { Component } from 'react';

class SearchQuery extends Component {
  render() {
    return (
      <div>
        <input type="search" onChange={this.props.onChange}/>
        <button onClick={this.props.onSearch}>Search</button>
      </div>
    );
  }
}

export default SearchQuery;
