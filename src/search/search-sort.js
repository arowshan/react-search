import React, { Component } from 'react';

class SearchSort extends Component {

    render() {
        //TODO: get values and intervals dynamically
        return (
        <div>
            Show 
            {Math.min(
                this.props.resultsPerPage * (this.props.resultsPage-1), 
                this.props.resultsCount)
            } to 
            {Math.min(
                this.props.resultsPerPage * this.props.resultsPage,
                this.props.resultsCount)
            } of {this.props.resultsCount}
            &ensp;&ensp;&ensp;

            View: 
            <select defaultValue={25} onChange={this.props.updateResultsPerPage}>
                <option value="1">1</option>
                <option value="5">5</option>
                <option value="25">25</option>
            </select>
            &ensp;&ensp;&ensp;

            <button onClick={this.props.prevPage}>prev</button>
            <input type="number" style={{width: '30px'}} min="1"
                value={this.props.resultsPage}
                onChange={this.props.setPage}
            />
            <button onClick={this.props.nextPage}>next</button>

        </div>
        );
    }
}

export default SearchSort;
