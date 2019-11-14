import React from 'react';
import { shallow } from 'enzyme';
import { mapStateToProps, SignIn, validate } from './SignIn';

describe('SignIn', () => {
  const quests = [
    {
      description: 'test',
      expVal: 10,
      name: 'testing',
      skill: 'jest'
    },
    {
      description: 'atest',
      expVal: 10,
      name: 'testingstuff',
      skill: 'enzyme'
    }
  ];

  it('should render sign in correctly', () => {
    const component = shallow(
      <SignIn
        setLocation={jest.fn()}
        handleSubmit={jest.fn()}
        setAuthentication={jest.fn()}
        initialize={jest.fn()}
        setErrors={jest.fn()}
        errors={[]}
        values={[]}
      />
    );

    expect(component).toMatchSnapshot();
  });
});

describe('mapStateToProps', () => {
  it('should return the correct auth, profile, and initialValues', () => {
    const state = {
      location: 'signin',
      errors: { signin: false },
      form: {
        'sign-in-form': {
          values: {
            test: 'hi'
          }
        }
      }
    };

    expect(mapStateToProps(state, { editProp: false })).toEqual({
      location: 'signin',
      errors: { signin: false },
      values: { test: 'hi' }
    });
  });
});

describe('validatorTest', () => {
  const dummyValues = {
    email: 'test@gmail.com',
    password: 'password test'
  };

  it('should validate email is required', () => {
    expect(validate({ ...dummyValues, email: null })).toEqual({
      email: 'Required'
    });
  });

  it('should validate real email', () => {
    expect(
      validate({ ...dummyValues, email: 'the quick brown fox jumps over the lazy dog' })
    ).toEqual({
      email: 'Invalid email address'
    });
  });

  it('should validate password is required', () => {
    expect(validate({ ...dummyValues, password: null })).toEqual({
      password: 'Required'
    });
  });

  it('should validate password is greater than 6 characters', () => {
    expect(
      validate({
        ...dummyValues,
        password: 'hi'
      })
    ).toEqual({
      password: 'Must be 6-16 characters'
    });
  });

  it('should validate password is less than 16 characters', () => {
    expect(
      validate({
        ...dummyValues,
        password: 'the quick brown fox jumps over the lazy dog'
      })
    ).toEqual({
      password: 'Must be 6-16 characters'
    });
  });
});
