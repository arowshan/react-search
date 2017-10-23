import React, { Component } from 'react';
import PropTypes from 'prop-types';


class SearchQuery extends Component {

  render() {
    return (
      <div className="search-query">
        <input type="search" onChange={this.props.onChange}/>
        <button onClick={this.props.onSearch}>Search</button>
      </div>
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
