import React from 'react';
import { shallow } from 'enzyme';
import { Async, mapStateToProps } from './Async';

describe('Async', () => {
  it('should render Async correctly', () => {
    const component = shallow(<Async render={{}} loading={false} />);

    expect(component).toMatchSnapshot();
  });
});

describe('mapStateToProps', () => {
  it('should return whether the app is loading', () => {
    const state = {
      loading: false
    };

    expect(mapStateToProps(state)).toEqual({
      loading: false
    });
  });
});
