import React, { Component } from 'react';

import './search-filter.css';


class SearchFilters extends Component {

  checkChildren(event, filter) {
    if(filter.children){
      for (let child of filter.children) {
        this.refs[child.keyword].checked = event.target.checked;
      }
    }
    this.updateAppliedFilters();
  }

  updateAppliedFilters() {
    let appliedFilters = [];
    for( let item of Object.keys(this.refs) ) {
      if(this.refs[item].type==='checkbox') {
        appliedFilters.push({ [this.refs[item].value]: this.refs[item].checked })
      }
    }
    this.props.updateAppliedFilters(appliedFilters);
  }

  listFilters(filters) {
    return filters.map( (filterObj) => {
      if(filterObj.children && filterObj.children.length>0) {
        return (
            <li key={filterObj.keyword}>
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
          <li key={filterObj.keyword}>
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
      <div className="filter-container">
        {this.listFilters(this.props.searchFilters)}
      </div>
    );
  }

}

export default SearchFilters;
