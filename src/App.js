import React, { Component } from 'react';
import './App.css';

import SearchMaster from './search/search-master';
import ResultCard from './data/result-card'

import FILTERS from './data/filters';

class App extends Component {

  render() {
    return (
      <div className="App">
        <SearchMaster children={<ResultCard />} searchFilters={FILTERS}/>
      </div>
    );
  }

}

export default App;
