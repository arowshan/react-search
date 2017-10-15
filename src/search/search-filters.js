import React, { Component } from 'react';

class SearchFilters extends Component {

  listFilters(filters) {
    filters.forEach( (filter) => {
      if(typeof(filter)==='string' || typeof(filter)==='number') {
        // return (
        //   <li key={filter}>
        //     <input type="checkbox"/>{filter}
        //   </li> 
        // );
        console.log(filter);
      }
      else if(typeof(filter==='object')) {
        if(Array.isArray(filter)) {
          this.listFilters(filter);
          console.log('AAAAAAAAAAAAAAAAAAAAAA');
        } else {
          this.listFilters(filter[Object.keys(filter)[0]]);
        }
      }
    });
  }
  
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
    // console.log(this.props.searchFilters);
    this.listFilters(this.props.searchFilters);
    // return (
    //   <ul>
    //     {this.renderFilters()}
    //   </ul>
    // );
    return (
      'as'
    );
  }

}

export default SearchFilters;
