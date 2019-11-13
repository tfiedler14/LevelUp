import React from 'react';
import { shallow } from 'enzyme';
import { Quest } from './Quest';

describe('Quest', () => {
  it('should render Quest correctly with no auth', () => {
    const component = shallow(
      <Quest
        info={{}} auth={{}} putData={jest.fn()} handleSubmit={jest.fn()}
      />
    );

    expect(component).toMatchSnapshot();
  });
});
