# Example

In this example, we start from the final result of how you would place the SearchMaster component in your app and then show an example of each prop.

**App.js**

```js
import React, { Component } from 'react';
import './App.css';
import SearchMaster from 'react-search-and-filter';

import ResultCard from './data/result-card'
import FILTERS from './data/filters';
import SORTS from './data/sorts';

class App extends Component {

  url = 'https://data.usajobs.gov/api/Search';
  headers = { 'Authorization-Key': 'oa5FLRYDO+LFrLejBF3hqr0/AYlgQ1JZoA/GXch/47s='};
  params = { 'ResultsPerPage': 50 };

  render() {
    return (
      <div className="App">
        <SearchMaster 
          resultComponent={<ResultCard />}
          searchFilters={FILTERS}
          sortCategories={SORTS}
          queryKeyword='Keyword'
          searchResultsPath={'data.SearchResult.SearchResultItems'}
          url={this.url}
          headers={this.headers}
          params={this.params}
        />
      </div>
    );
  }

}

export default App;
```

**sorts.js**

```js
const SORTS = {
     "Position": "MatchedObjectDescriptor.PositionTitle" ,
     "Location": "MatchedObjectDescriptor.PositionLocationDisplay",
};

export default SORTS;
```

**filters.js**

```js
const FILTERS = [
  {
    'name': 'USA Jobs',
    'keyword': '',
    'children': [
      {
        'name': 'Relocation',
        'keyword': 'RelocationIndicator'
      },
      {
        'name': "Most Recent",
        'keyword' : "ExcludeJOAOpenFor30Days"
      },
      {
        'name': "Internship",
        'keyword' : "Internship"
      },
      {
        'name': "Recent Grad",
        'keyword' : "RecentGrad"
      },
    ]
  },
  {
    'name': 'Full Time',
    'keyword': 'fullTime',
    'children': []
  },
  {
    'name': 'Part Time',
    'keyword': 'partTime'
  }
];

export default FILTERS;
```

**result-card.js**

```JSX
import React, { Component } from 'react';
import {Card, CardTitle, CardText} from 'material-ui/Card';

import './result-card.css';

class ResultCard extends Component {

  render() {
    return (
      <Card>
        <CardTitle title={this.props.result.MatchedObjectDescriptor.PositionTitle} 
        subtitle={this.props.result.MatchedObjectDescriptor.PositionSchedule[0].Name} />
          <CardText>
            <ul>
              <li>
                <span className="list__title">Job ID: </span>
                {this.props.result.MatchedObjectId}
              </li>
              <li><span className="list__title">Organization: </span>
              {this.props.result.MatchedObjectDescriptor.OrganizationName}
              </li> 
              <li>
                <span className="list__title">Department: </span>
                {this.props.result.MatchedObjectDescriptor.DepartmentName}
              </li>
              <li>
                <span className="list__title">Location: </span>
                {this.props.result.MatchedObjectDescriptor.PositionLocationDisplay}
              </li>
              <hr/>
              <li>
                <span className="list__title">Qualification Summary: </span>
                {this.props.result.MatchedObjectDescriptor.QualificationSummary}
              </li>
            </ul>
          </CardText>
      </Card>
    );
  }

}

export default ResultCard;
```

### Results path and Sorts

Consider the following json response from a search api.  
![](https://raw.githubusercontent.com/arowshan/react-search/master/assets/json-response.png)

In order to get to the results array that we are interested in we go from the top level data object down to SearchResult and then down to SearchResultItems, therefore, the appropriate path would be "**data.SearchResult.SearchResultItems"**.

This path will be used as the base for sort fields, therefore, if we want to address the **PositionTitle **property as one of the sort options we would simply start from a result member of the array and the path would be **"MatchedObjectDescriptor.PositionTitle"**.

