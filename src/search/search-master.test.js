import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import SearchMaster from './search-master';
import renderer from 'react-test-renderer';


describe('Components rendered', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<SearchMaster />);
    return wrapper;
  });

  test('has a component named SearchQuery', () => {
    expect(wrapper.find('SearchQuery').length).toBe(1);
  });

  test('has a component named SearchResults', () => {
    expect(wrapper.find('SearchResults').length).toBe(1);
  });

  test('does not render sort component when no results', () => {
    expect(wrapper.find('SearchSort').length).toBe(0);
  });

  test('render Sort component when results arrive', () => {
    wrapper.setState({searchResults: ['item']});
    expect(wrapper.find('SearchSort').length).toBe(1);
  });

  test('does not render filter component when no results', () => {
    expect(wrapper.find('SearchFilters').length).toBe(0);
  });

  test('render Sort component when results arrive', () => {
    wrapper.setState({searchResults: ['item']});
    expect(wrapper.find('SearchFilters').length).toBe(1);
  });
  
});
