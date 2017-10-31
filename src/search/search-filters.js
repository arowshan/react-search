import React, { Component } from 'react';
import Checkbox from 'material-ui/Checkbox';

import './search-filter.css';


class SearchFilters extends Component {
  //TODO: parent and children checkbox communication

  // handleChildChange(event) {
  //   console.log(event.target.checked);
  // }

  listFilters(filters) {
    return filters.map( (filterObj) => { 
      return Object.keys(filterObj).map( (filterKey) => {
        return (
          <li className="filter--item" key={filterObj[filterKey]}>
            <Checkbox
              label={filterKey}
              value={filterObj[filterKey]}
              onCheck={this.props.updateAppliedFilters}
            />
          </li> 
        );
      })
    });
  }

  render() {
    return (
      //TODO: classNames
      <div className="filter-container">
        <ul>
          {this.listFilters(this.props.searchFilters)}
        </ul>
      </div>
    );
  }

}

export default SearchFilters;
