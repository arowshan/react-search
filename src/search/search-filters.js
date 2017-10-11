import React, { Component } from 'react';

class SearchFilters extends Component {
  
  renderFilters() {
    return this.props.searchFilters.map(filter => {
      return (
        <li key={filter}>
          <input type="checkbox"/>
          {filter}
        </li>
      );
    });
  }

  render() {
    console.log(this.props.searchFilters);
    return (
      <ul>
        {this.renderFilters()}
      </ul>
    );
  }

}

export default SearchFilters;
