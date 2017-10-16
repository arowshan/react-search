import React, { Component } from 'react';

class SearchSort extends Component {

    render() {
        //TODO: get values and intervals dynamically
        return (
        <div>
            Show {Math.min(this.props.resultsPerPage, this.props.resultsCount)} of {this.props.resultsCount}
            &ensp;&ensp;&ensp;
            View: 
            <select defaultValue={25} onChange={this.props.updateResultsPerPage}>
                <option value="1">1</option>
                <option value="5">5</option>
                <option value="25">25</option>
            </select>
        </div>
        );
    }
}

export default SearchSort;
