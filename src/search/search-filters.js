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
      if(filterObj.children && filterObj.children.length>0) {
        return (
            <li>
              <Checkbox
                label={filterObj.name}
                value={filterObj.keyword}
                onCheck={this.props.updateAppliedFilters}
              />
              <ul>
                {this.listFilters(filterObj.children)}
              </ul>
            </li>
        );
      }
      else {
        return (
          <li>
            <Checkbox
              label={filterObj.name}
              value={filterObj.keyword}
              onCheck={this.props.updateAppliedFilters}
            />
          </li>
        );
      }
    });
  }

  render() {
    return (
      //TODO: classNames
      <div className="filter-container">
        {this.listFilters(this.props.searchFilters)}
      </div>
    );
  }

}

export default SearchFilters;
