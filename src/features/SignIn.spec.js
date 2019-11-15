import React from 'react';
import { shallow } from 'enzyme';
import { mapDispatchToProps, mapStateToProps, SignIn, validate } from './SignIn';

describe('SignIn', () => {
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

  it('should render sign in correctly with errors', () => {
    const component = shallow(
      <SignIn
        setLocation={jest.fn()}
        handleSubmit={jest.fn()}
        setAuthentication={jest.fn()}
        initialize={jest.fn()}
        setErrors={jest.fn()}
        errors={{signIn: "the app is on fire"}}
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

describe('mapDispatchToProps', () => {
  it('should dispatch setAuthentication when setAuthentication is called', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.setAuthentication('home');

    expect(dispatch).toHaveBeenCalledWith({ auth: 'home', type: 'SET_AUTH' });
  });

  it('should dispatch setErrors when setErrors is called', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.setErrors({});

    expect(dispatch).toHaveBeenCalledWith({ errors: {}, type: 'SET_ERRORS'});
  });

  it('should dispatch setLocation when setLocation is called', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.setLocation('home');

    expect(dispatch).toHaveBeenCalledWith({ location: 'home', type: 'SET_LOCATION' });
  });
});
