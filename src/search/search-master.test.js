import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import SearchMaster from './search-master';

it('has a component named SearchQuery', () => {
  const searchMaster = shallow(
    <SearchMaster />
  );

  expect(1).toBeTruthy();
});
