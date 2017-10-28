import React, { Component } from 'react';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class SearchSort extends Component {

    listSortCategories() {
        return Object.keys(this.props.sortCategories).map( (category) => {
            return (
                <option key={category} value={category}>
                    {category}
                </option>
            )
        });
    }

    render() {
        //TODO: create consts for onthefly calcs below
        //TODO: get values and intervals dynamically
        return (
        <Toolbar>
            <ToolbarGroup>
            Show {Math.min(
                this.props.resultsPerPage * (this.props.resultsPage-1) +1, 
                this.props.resultsCount)
            } to {Math.min(
                this.props.resultsPerPage * this.props.resultsPage,
                this.props.resultsCount)
            } of {this.props.resultsCount}
            </ToolbarGroup>

            <ToolbarGroup>
            View:
            <SelectField
                value={this.props.resultsPerPage}
                onChange={this.props.updateResultsPerPage}
                style={{width: 75}}
            >
                <MenuItem value={1} primaryText="1" />
                <MenuItem value={5} primaryText="5" />
                <MenuItem value={25} primaryText="25" />
            </SelectField>
            </ToolbarGroup>
            
            <ToolbarGroup>
            Sort: 
            {/* TODO: Dynamic default value */}
            <select onChange={this.props.updateSortBy}>
                {this.listSortCategories()}
            </select>
            </ToolbarGroup>

            <ToolbarGroup>
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
            </ToolbarGroup>
            
        </Toolbar>
        );
    }
}

export default SearchSort;
