import React from 'react';
import { shallow } from 'enzyme';
import { mapDispatchToProps, mapStateToProps, Settings, validate } from './Settings';

describe('Settings', () => {
  it('should render Settings correctly with auth', () => {
    const component = shallow(
      <Settings
        setLocation={jest.fn()}
        putData={jest.fn()}
        auth={{ loggedIn: true }}
        handleSubmit={jest.fn()}
        setAuth={jest.fn()}
        signOut={jest.fn()}
        profile={{}}
        values={{}}
      />
    );

    expect(component).toMatchSnapshot();
  });

  it('should render Settings correctly while unauthorized', () => {
    const component = shallow(
      <Settings
        setLocation={jest.fn()}
        putData={jest.fn()}
        auth={{ loggedIn: false }}
        handleSubmit={jest.fn()}
        setAuth={jest.fn()}
        signOut={jest.fn()}
        profile={{}}
        values={{}}
      />
    );

    expect(component).toMatchSnapshot();
  });
});

describe('validatorTest', () => {
  const dummyValues = {
    email: 'test@gmail.com',
    password: 'password test',
    cpassword: 'password test'
  };

  it('should validate email is a real email', () => {
    expect(validate({ ...dummyValues, email: 'not an email' })).toEqual({
      email: 'Invalid email address'
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

describe('mapDispatchToProps', () => {
  it('should dispatch setLocation when setLocation is called', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.setLocation('home');

    expect(dispatch).toHaveBeenCalledWith({ location: 'home', type: 'SET_LOCATION' });
  });

  it('should dispatch setAuth when setAuth is called', () => {
    const dispatch = jest.fn();
    const props = mapDispatchToProps(dispatch);
    props.setAuth('home');

    expect(dispatch).toHaveBeenCalledWith({ auth: 'home', type: 'SET_AUTH' });
  });
});

describe('mapStateToProps', () => {
  it('should return the correct auth, profile, and initialValues', () => {
    const state = {
      auth: {
        test: 'authorized'
      },
      form: {
        'settings-form': {
          values: {
            test: 'hi'
          }
        }
      }
    };

    expect(mapStateToProps(state)).toEqual({
      auth: {
        test: 'authorized'
      },
      values: {
        test: 'hi'
      }
    });
  });
});
