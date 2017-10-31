import React, { Component } from 'react';
import './App.css';

import SearchMaster from './search/search-master';
import ResultCard from './data/result-card'

import FILTERS from './data/filters';
import SORTS from './data/sorts';

class App extends Component {

  render() {
    return (
      <div className="App">
        <SearchMaster 
          resultComponent={<ResultCard />} 
          searchFilters={[FILTERS]}
          sortCategories={SORTS}
        />
      </div>
    );
  }

}

export default App;
