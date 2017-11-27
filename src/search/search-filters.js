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
  entered: { maxHeight: '400px' }
};

class SearchFilters extends Component {

  constructor() {
    super();
    this.state = {
      hideChildren: {}
    }
  }

  checkChildren(event, filter) {
    if(filter.children) {
      for (let child of filter.children) {
        console.log(this.refs[filter.keyword]);
        // this.refs[child.keyword].checked = event.target.checked;
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
              // onClick={() => this.handleToggle()}
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
