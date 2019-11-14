import React from 'react';
import { shallow } from 'enzyme';
import { mapStateToProps, SignUp, validate } from './SignUp';

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

describe('mapStateToProps', () => {
  it('should return the correct location', () => {
    const state = {
      location: 'signup'
    };

    expect(mapStateToProps(state)).toEqual({
      location: 'signup'
    });
  });
});

describe('validatorTest', () => {
  const dummyValues = {
    email: 'test@gmail.com',
    password: 'password test',
    cpassword: 'password test'
  };

  it('should validate email is required', () => {
    expect(validate({ ...dummyValues, email: null })).toEqual({
      email: 'Required'
    });
  });

  it('should validate email is a real email', () => {
    expect(
      validate({ ...dummyValues, email: 'not an email' })
    ).toEqual({
      email: 'Invalid email address'
    });
  });

  it('should validate password is required', () => {
    expect(validate({ ...dummyValues, password: null, cpassword: null })).toEqual({
      password: 'Required'
    });
  });

  it('should validate password is less than 16 characters', () => {
    expect(
      validate({
        ...dummyValues,
        password: 'the quick brown fox jumps over the lazy dog',
        cpassword: 'the quick brown fox jumps over the lazy dog'
      })
    ).toEqual({
      password: 'Must be 6-16 characters'
    });
  });

  it('should validate password is more than 6 characters', () => {
    expect(
      validate({
        ...dummyValues,
        password: 'hi',
        cpassword: 'hi'
      })
    ).toEqual({
      password: 'Must be 6-16 characters'
    });
  });

  it('should validate password is the same as cpassword', () => {
    expect(
      validate({
        ...dummyValues,
        password: 'hi buddy',
        cpassword: 'not hi buddy'
      })
    ).toEqual({
      cpassword: 'Passwords must match'
    });
  });
});