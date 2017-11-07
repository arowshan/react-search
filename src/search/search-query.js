import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import SearchIcon from 'material-ui/svg-icons/action/search';


import './search-query.css';

import PropTypes from 'prop-types';



class SearchQuery extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchVisibility : false,
    }
   
    this.showSearch = this.showSearch.bind(this);
    this.hideSearch = this.hideSearch.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    
  }

  showSearch() {
    this.setState({
      searchVisibility: true
    })
  }

  hideSearch() {
    if(this.props.searchQuery==='') {
      this.setState({
        searchVisibility: false
      })
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSearch();
    document.activeElement.blur()
  }

  renderButton() {
    if(this.state.searchVisibility) {
      return (
        <RaisedButton className="search-button" onClick={this.props.onSearch} label="Search" primary={true}/>
      )
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="query-container">
          <input className="search-input"
            placeholder="Search..." 
            onChange={this.props.queryChange}
            onFocus={this.showSearch}
            onBlur={this.hideSearch}
            name="searchInput"
          />
          <RaisedButton className="search-button" onClick={this.props.onSearch} icon={<SearchIcon />} primary={true} />
      </form>
    );
  }
}

SearchQuery.defaultProps = {
  searchQuery : ''
}

SearchQuery.propTypes = {
  searchQuery:  PropTypes.string
}

export default SearchQuery;
