import React, { Component } from 'react';

class SearchSort extends Component {

    listSortCategories() {
        console.log(this.props);
        return this.props.sortCategories.map( (category) => {
            return (
                <option value={Object.keys(category)[0]}>
                    {Object.keys(category)[0]}
                </option>
            )
        });
    }

    render() {
        //TODO: create consts for onthefly calcs below
        //TODO: get values and intervals dynamically
        return (
        <div>
            Show {Math.min(
                this.props.resultsPerPage * (this.props.resultsPage-1) +1, 
                this.props.resultsCount)
            } to {Math.min(
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

            Sort: 
            <select>
                {this.listSortCategories()}
            </select>
            &ensp;&ensp;&ensp;

            <button onClick={this.props.prevPage}
                disabled={this.props.resultsPage===1}
            >prev</button>
            <input type="number" style={{width: '30px'}} min="1"
                value={this.props.resultsPage}
                onChange={this.props.setPage}
                readOnly
            />
            <button 
                onClick={this.props.nextPage}
                disabled={
                    this.props.resultsPage>=
                    Math.ceil(this.props.resultsCount / this.props.resultsPerPage)
                }
            >next
            </button>

        </div>
        );
    }
}

export default SearchSort;
