import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import SearchQuery from './search-query';
import renderer from 'react-test-renderer';


describe('Components rendered', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<SearchQuery />);
    return wrapper;
  });

  test('has an input', () => {
    expect(wrapper.find('input').length).toBe(1);
  });

  test('has a button with search-button class', () => {
    expect(wrapper.find('.search-button').length).toBe(1);
  });

  test("should render form", () => {
    expect(wrapper.find("form")).toMatchSnapshot();
  });

  // test("should render input", () => {
  //   expect(wrapper.find("input")).toMatchSnapshot();
  // });
  
});
