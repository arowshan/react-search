import React, { Component } from 'react';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import './search-query.css';

import PropTypes from 'prop-types';



class SearchQuery extends Component {

  constructor() {
    super();
    this.state = {
      searchVisibility : false,
    }

    this.showSearch = this.showSearch.bind(this);
    this.hideSearch = this.hideSearch.bind(this);    
    
  }

  

  showSearch() {
    this.setState({
      searchVisibility: true
    })
  }

  hideSearch() {
    this.setState({
      searchVisibility: false
    })
  }

  renderButton() {
    if(this.state.searchVisibility) {
      return (
        <RaisedButton className="search-button" onClick={this.props.onSearch} label="Search" primary={true} />
      )
    }
  }

  render() {
    return (

      <Toolbar>
        <ToolbarGroup>
          <input className="search-input"
            placeholder="Search..." type="search" 
            onChange={this.props.onChange}
            onFocus={this.showSearch}
            onBlur={this.hideSearch}
          />
          {this.renderButton()}
          
        </ToolbarGroup>
      </Toolbar>
        
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
