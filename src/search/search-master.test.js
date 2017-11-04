import React from 'react';
import ReactDOM from 'react-dom';
import SearchMaster from './search-master';

it('has a component named SearchQuery', () => {
  const wrapper = shallow(<SearchMaster />);
  console.log(wrapper);
});
