import React, { Component } from 'react';

import './search-filter.css';


class SearchFilters extends Component {

  constructor() {
    super();
    this.state = {
      hideChildren: {}
    }
  }

  checkChildren(event, filter) {
    if(filter.children){
      for (let child of filter.children) {
        this.refs[child.keyword].checked = event.target.checked;
      }
    }
    this.updateAppliedFilters();
  }

  toggleDropDown(filterObj) {
    let hideChildren = Object.assign({}, this.state.hideChildren);
    hideChildren[filterObj.name] === true ?
    hideChildren[filterObj.name] = false:
    hideChildren[filterObj.name] = true;
    this.setState({
      hideChildren
    });
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
              />
              <span
              onClick={() => this.toggleDropDown(filterObj)}
              className="parent-filter">
              {filterObj.name}
              <span className="expand-collapse-icons">
              <span hidden={!this.state.hideChildren[filterObj.name]}>&#x25B8;</span>
              <span hidden={this.state.hideChildren[filterObj.name]}>&#x25BE;</span>
              </span>
              </span>
              <ul hidden={this.state.hideChildren[filterObj.name]}>
                {this.listFilters(filterObj.children)}
              </ul>
            </li>
        );
      }
      else {
        return (
          <li key={filterObj.keyword} className="checkbox">
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
      <div className="filter-container ex-filter-container">
        {this.listFilters(this.props.searchFilters)}
      </div>
    );
  }

}

export default SearchFilters;
