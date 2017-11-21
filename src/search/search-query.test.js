import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import SearchQuery from './search-query';
import renderer from 'react-test-renderer';

import {testFunc} from './search-query';


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

  test("testing mock func", () => {
    const mockTestFunc = jest.fn();
    mockTestFunc();
    expect(mockTestFunc.mock.calls.length).toBe(1);
  });

  test("testing func func", () => {
    expect(wrapper.instance().testFunc()).toBe(54);
  });
  

  
});
