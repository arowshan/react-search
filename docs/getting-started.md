# Getting Started

```
npm install --save react-search-and-filter
```

Place **&lt;SearchMaster /&gt;** in your desired component \(for example App.js\) and start by giving it the required props.

| Prop | Type | Required/Optional |
| :--- | :--- | :--- |
| [url](#url) | String | Required |
| [headers](#headers) | Object | Optional |
| [params](#params) | Object | Optional |
| [queryKeyword](#querykeyword) | String | Required |
| [searchResultsPath](#searchresultspath) | String | Required |
| [sortCategories](#sortcategories) | Object | Optional |
| [searchFilters](#searchfilters) | Object \(Array of Objects\) | Optional |
| [resultComponent](#resultcomponent) |  | Required |

#### url

The base URL to the api that performs the search.   
Example:  

```js
url = 'https://data.usajobs.gov/api/Search'
```

#### headers

The headers to send with all ajax search requests.  
Example:

```js
headers = { 'Authorization-Key': 'seCrEtDOfjd94fkdseCrEt/GXseCrEt='}

```

#### params

The parameters to send with all ajax search requests.

Example:

```js
params = { 'ResultsPerPage': 50 }
```

#### queryKeyword

Each api may look for a different property in parameters to extract the search term to perform query

Example:

```js
queryKeyword='Keyword'
```

#### searchResultsPath

This is the path from the JSON response of the api to the array of results that you are interested in. 

Example:

```js
searchResultsPath = 'data.SearchResult.SearchResultItems'
```

#### sortCategories

Within the results array, there may be proprieties by which you would want to sort your results. sortCategories pairs what the users sees on the screen with the relative path to the result property that will used for sorting.

Example:

```js
sortCategories = {
     "Position": "MatchedObjectDescriptor.PositionTitle" ,
     "Location": "MatchedObjectDescriptor.PositionLocationDisplay",
};
```

#### searchFilters

The the api you are searching against accepts search filters, you can provide an array of object with the format described below to pass on the keywords with a true or false flag with the ajax request.   
The name property will be the name of the checkbox that the users sees and the keyword property is what the api would receive with the true or false flag.  
Top level filters accept an array of children with the same format.

Example:

```js
searchFilters = [
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
```



#### resultComponent

The module passes on the path that you provided to the results\(searchResultsPath\) to the resultComponent that you create. So you have access to all properties of the results object and can define how a single result should be displayed. The module will take care of the rest and maps your component to all other results. 

