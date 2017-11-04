import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import tempAnimation from './polyfill'
import raf from 'tempPolyfills'
import Enzyme, { shallow, render, mount } from 'enzyme';
import toJson from 'enzyme-to-json';

Enzyme.configure({ adapter: new Adapter() });

global.shallow = shallow;
global.render = render;
global.mount = mount;
global.toJson = toJson;