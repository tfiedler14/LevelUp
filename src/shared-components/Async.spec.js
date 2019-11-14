import React from 'react';
import { shallow } from 'enzyme';
import { Async } from './Async';

describe('Async', () => {
  it('should render Async correctly', () => {
    const component = shallow(<Async render={{}} loading={false} />);

    expect(component).toMatchSnapshot();
  });
});
