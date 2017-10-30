import React, { Component } from 'react';
import Checkbox from 'material-ui/Checkbox';

import './search-filter.css';


class SearchFilters extends Component {

  //TODO: parent and children checkbox communication

  handleChildChange(path, event) {
    console.log(path, ': ', event.target.value, ' : ', event.target.checked);
    // this.refs['Job Type'].checked = true;
    
    // TODO: create format where each filter is addressable
  }

  listFilters(path, filters) {
    return filters.map( (filter) => {
      if(typeof(filter)==='string' || typeof(filter)==='number') {
        return (
          <li key={filter}>
            <Checkbox
              label={filter}
              ref={path}
              value={filter}
              onChange={(event) => this.handleChildChange(path, event)}
            />
          </li> 
        );
      }
      else if(typeof(filter==='object')) {
        return (
          <li key={Object.keys(filter)[0]}>
            <Checkbox
              label={Object.keys(filter)[0]}
              value={filter}
            />
            <ul>
              {this.listFilters( Object.keys(filter)[0] , filter[Object.keys(filter)[0]])}
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
      //TODO: classNames
      <div className="filter-container">
        <ul>
          {this.listFilters( 0, this.props.searchFilters)}
        </ul>
      </div>
    );
  }

}

export default SearchFilters;
