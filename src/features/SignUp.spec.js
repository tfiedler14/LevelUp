import React from 'react';
import { shallow } from 'enzyme';
import { SignUp } from './SignUp';

describe('SignIn', () => {
  it('should render sign up correctly', () => {
    const component = shallow(
      <SignUp
        setLocation={jest.fn()}
        handleSubmit={jest.fn()}
        setAuthentication={jest.fn()}
        putData={jest.fn()}
      />
    );

    expect(component).toMatchSnapshot();
  });
});
