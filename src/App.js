import React, { Component } from 'react';
import './App.css';

import SearchMaster from './search/search-master';

import DATA from './data/data';
import FILTERS from './data/filters';

class App extends Component {

  render() {
    return (
      <div className="App">
        <SearchMaster searchFilters={FILTERS}/>
      </div>
    );
  }
}

export default App;
