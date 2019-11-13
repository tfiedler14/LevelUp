import React from 'react';
import { shallow } from 'enzyme';
import { Settings } from './Settings';

describe('Settings', () => {
  it('should render Settings correctly with no auth', () => {
    const component = shallow(
      <Settings
        setLocation={jest.fn()}
        putData={jest.fn()}
        auth={{}}
        handleSubmit={jest.fn()}
        setAuth={jest.fn()}
        signOut={jest.fn()}
        profile={{}}
        setFilter={jest.fn()}
        values={{}}
      />
    );

    expect(component).toMatchSnapshot();
  });
});
