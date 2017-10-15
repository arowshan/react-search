import React, { Component } from 'react';

class SearchSort extends Component {

    render() {
        //TODO: get values and intervals dynamically
        return (
        <div>
            <span>Show {Math.min(this.props.resultsPerPage, this.props.resultsCount)} of {this.props.resultsCount}</span>
            &ensp;&ensp;&ensp;
            View: 
            <select value={25} onChange={this.props.updateResultsPerPage}>
                <option value="1">1</option>
                <option value="5">5</option>
                <option value="25">25</option>
            </select>
        </div>
        );
    }
}

export default SearchSort;
