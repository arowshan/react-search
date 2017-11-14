import React, { Component } from 'react';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import './search-sort.css';

class SearchSort extends Component {

    listSortCategories() {
        return Object.keys(this.props.sortCategories).map( (category) => {
            return (
                <MenuItem key={category} value={category} primaryText={category}/>
            )
        });
    }

    render() {
        //TODO: create consts for onthefly calcs below
        //TODO: get values and intervals dynamically
        return (
            <div className="sort-container">
                <div className="sort-feature">
                    {Math.min(
                        this.props.resultsPerPage * (this.props.resultsPage-1) +1, 
                        this.props.resultsCount)
                    }&#8210;{Math.min(
                        this.props.resultsPerPage * this.props.resultsPage,
                        this.props.resultsCount)
                    } of {this.props.resultsCount}
                </div>
                <div className="sort-feature">
                    <SelectField
                        floatingLabelText="View" floatingLabelFixed={true}
                        floatingLabelStyle={{color: 'white'}}
                        labelStyle={{color: 'white'}}
                        value={this.props.resultsPerPage}
                        onChange={this.props.updateResultsPerPage}
                        style={{width: 75}}
                    >
                        <MenuItem value={1} primaryText="1" />
                        <MenuItem value={5} primaryText="5" />
                        <MenuItem value={25} primaryText="25" />
                        <MenuItem value={50} primaryText="50" />
                    </SelectField>
                </div>
                <div className="sort-feature">
                    <SelectField
                        floatingLabelText="Sort By" floatingLabelFixed={true}
                        floatingLabelStyle={{color: 'white'}}
                        labelStyle={{color: 'white'}}
                        value={this.props.sortBy}
                        onChange={this.props.updateSortBy}
                        style={{width: 125}}
                    >
                        {this.listSortCategories()}
                    </SelectField>
                </div>
                <div className="sort-feature pages">
                    <RaisedButton label="Previous"
                        onClick={this.props.prevPage} 
                        disabled={this.props.resultsPage===1}
                    />
                    <input type="number" style={{width: '30px'}} min="1"
                        value={this.props.resultsPage}
                        onChange={this.props.setPage}
                        readOnly
                    />
                    <RaisedButton label="Next"
                        onClick={this.props.nextPage} 
                        disabled={
                            this.props.resultsPage>=
                            Math.ceil(this.props.resultsCount / this.props.resultsPerPage)
                        }
                    />
                </div>
            </div>
        );
    }
}

SearchSort.defaultProps = {
    sortBy: 'Position'
}

export default SearchSort;
