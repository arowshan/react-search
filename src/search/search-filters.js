import React, { Component } from 'react';

class SearchFilters extends Component {

  listFilters(filters) {
    return filters.map( (filter) => {
      if(typeof(filter)==='string' || typeof(filter)==='number') {
        return (
          <li key={filter}>
            <input type='checkbox'/>{filter}
          </li> 
        );
      }
      else if(typeof(filter==='object')) {
        return (
          <li><input type='checkbox'/>{Object.keys(filter)[0]}
            <ul>
              {this.listFilters(filter[Object.keys(filter)[0]])}
            </ul>
          </li>
        )
      }
      else {
        //TODO:throw error for wrong type
        return false;
      }
    });
  }

  render() {
    return (
      <div>
        <ul>
          {this.listFilters(this.props.searchFilters)}
        </ul>
      </div>
    );
  }

}

export default SearchFilters;
