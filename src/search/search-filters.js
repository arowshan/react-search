import React, { Component } from 'react';
import { Transition  } from 'react-transition-group'

import './search-filter.css';

const duration = 250;
const dropdownIconDuration = 200;

const defaultFilterStyle = {
  transition: `all ${duration}ms ease-in-out`,
  overflow: 'hidden',
  maxHeight: '0px'
}

const filterTransitionStyles = {
  entering: { maxHeight: '0px' },
  // get max height dynamically
  entered: { maxHeight: '400px' }
};

const defaultDropdownIconStyle = {
  transition: `all ${dropdownIconDuration}ms ease-out`,
}

const dropdownIconTransitionStyles = {
  entering: { transform: `rotate(0deg)` },
  entered: { transform: `rotate(90deg)` }
};

class SearchFilters extends Component {

  constructor(props) {
    super(props);
    this.state = {
      checked: {},
      hideChildren: {}
    }
  }

  checkChildren(e, filterObj) {
    e.stopPropagation();
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
    hideChildren[filterObj.name] = !hideChildren[filterObj.name]
    this.setState({
      hideChildren
    });
  }

  listFilters(filters) {
    return filters.map( (filterObj) => {
      if(filterObj.children && filterObj.children.length>0) {
        return (
            <li key={filterObj.keyword} className="checkbox" onClick={() => this.toggleDropDown(filterObj)}>
              <input type="checkbox"
                ref={filterObj.keyword}
                value={filterObj.keyword}
                onClick={(e) => this.checkChildren(e, filterObj)}
                checked={this.state.checked[filterObj.keyword]}
              />
              <span>
                <span className="filter parent-filter" onClick={(e) => this.checkChildren(e, filterObj)}>{filterObj.name}</span>
                <Transition in={!this.state.hideChildren[filterObj.name]} timeout={duration}>
                  {(state) => (
                    <span className="expand-collapse-icons" style={{
                      ...defaultDropdownIconStyle,
                      ...dropdownIconTransitionStyles[state]
                    }}
                    >
                      <span className="dropdown-icon">&#x25B8;</span>
                    </span>
                  )}
                </Transition>
              </span>
              <Transition in={!this.state.hideChildren[filterObj.name]} timeout={duration}>
                {(state) => (
                  <ul className="children-filters"
                  style={{
                    ...defaultFilterStyle,
                    ...filterTransitionStyles[state]
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
          <li key={filterObj.keyword} className="checkbox" 
          onClick={(e) => this.checkChildren(e, filterObj)}>
            <input type="checkbox"
              ref={filterObj.keyword}
              value={filterObj.keyword}
              checked={this.state.checked[filterObj.keyword]}       
            />
            <span className="filter child-filter">{filterObj.name}</span>
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
