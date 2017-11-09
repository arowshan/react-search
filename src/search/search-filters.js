import React, { Component } from 'react';
import Checkbox from 'material-ui/Checkbox';

import './search-filter.css';


class SearchFilters extends Component {
  //TODO: parent and children checkbox communication

  // handleChildChange(event) {
  //   console.log(event.target.checked);
  // }\
  constructor() {
    super()
    this.state = {
      appliedFilters: []
    }
  }

  checkChildren(event, filter) {
    if(filter.children){
      for (let child of filter.children) {
        this.refs[child.keyword].checked = event.target.checked;
      }
    }
  }

  listFilters(filters) {
    return filters.map( (filterObj) => {
      if(filterObj.children && filterObj.children.length>0) {
        return (
            <li>
              <input type="checkbox"
                ref={filterObj.keyword}
                value={filterObj.keyword}
                onClick={(event) => this.checkChildren(event, filterObj)}
              />{filterObj.name}
              <ul>
                {this.listFilters(filterObj.children)}
              </ul>
            </li>
        );
      }
      else {
        return (
          <li>
            <input type="checkbox"
              ref={filterObj.keyword}
              value={filterObj.keyword}
              onClick={(event) => this.checkChildren(event, filterObj)}
            />{filterObj.name}
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
