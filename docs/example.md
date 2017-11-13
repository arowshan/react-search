# Example

```JSX
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



