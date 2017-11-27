import React, { Component } from 'react';
import { Transition  } from 'react-transition-group'

import './search-filter.css';

const duration = 250;
const defaultStyle = {
  transition: `all ${duration}ms ease-in-out`,
  overflow: 'hidden',
  maxHeight: '0px'
}

const transitionStyles = {
  entering: { maxHeight: '0px' },
  // get max height dynamically
  entered: { maxHeight: '400px' }
};

class SearchFilters extends Component {

  constructor(props) {
    super(props);
    this.state = {
      checked: {},
      hideChildren: {}
    }
  }

  checkChildren(filterObj) {
    let checked = Object.assign({}, this.state.checked);
    checked[filterObj.keyword] = !checked[filterObj.keyword];
    if(filterObj.children) {
      for (let child of filterObj.children) {
        checked[child.keyword] = checked[filterObj.keyword];
      }
    }
    this.setState({
      checked
    });
    this.props.updateAppliedFilters(checked);
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

  listFilters(filters) {
    return filters.map( (filterObj) => {
      if(filterObj.children && filterObj.children.length>0) {
        return (
            <li key={filterObj.keyword}>
              <input type="checkbox"
                ref={filterObj.keyword}
                value={filterObj.keyword}
                onClick={() => this.checkChildren(filterObj)}
                checked={this.state.checked[filterObj.keyword]}
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
              <Transition in={!this.state.hideChildren[filterObj.name]} timeout={duration}>
                {(state) => (
                  <ul className="children-filters"
                  style={{
                    ...defaultStyle,
                    ...transitionStyles[state]
                  }}>
                    {this.listFilters(filterObj.children)}
                  </ul>
                )}
              </Transition>
            </li>
        );
      }
      else {
        return (
          <li key={filterObj.keyword} className="checkbox">
            <input type="checkbox"
              ref={filterObj.keyword}
              value={filterObj.keyword}
              checked={this.state.checked[filterObj.keyword]}
              onClick={() => this.checkChildren(filterObj)}
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
