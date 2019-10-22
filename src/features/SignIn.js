import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { setLocation } from '../logic/location/actions';
import { setAuth } from '../logic/auth/actions';
import { firebaseApp } from '../../Const';
import { compose } from 'redux';
import {Field, getFormValues, initialize, reduxForm} from 'redux-form';
import { WrappedTextInput } from '../shared-components/FormField';
import { Button, Card } from 'react-native-paper';
import EStyleSheet from 'react-native-extended-stylesheet';
import { FormHeader } from '../shared-components/FormHeader';

export const SignIn = ({ setLocation, handleSubmit, setAuthentication, initialize, values }) => {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!initialized) {
      initialize({
        email: '',
        password: ''
      });
      setInitialized(true);
    }
  });
  return (
    <Card style={styles.card}>
      <View>
        <FormHeader title={'Sign In'} />
        <Field
          name="email"
          id="email"
          props={{ title: 'Email', textContentType: 'emailAddress', autoCompleteType: 'email' }}
          component={WrappedTextInput}
        />
        <Field
          name="password"
          id="password"
          props={{
            title: 'Password',
            textContentType: 'password',
            autoCompleteType: 'password',
            password: true
          }}
          component={WrappedTextInput}
        />
        <View style={styles.buttons}>
          <Button
            color="#064f2f"
            uppercase={false}
            mode="contained"
            onPress={handleSubmit(values => {
              handleLogin(values, setLocation, setAuthentication);
            })}>
            Sign In
          </Button>
          <Button
            color="#064f2f"
            uppercase={false}
            mode="text"
            onPress={() => setLocation('signup')}>
            Need an account? Sign up!
          </Button>
        </View>
      </View>
    </Card>
  );
};

const handleLogin = (values, setLocation, setAuth) => {
  firebaseApp
    .auth()
    .signInWithEmailAndPassword(values.email, values.password)
    .then(response => {
      setAuth({ loggedIn: true, email: response.user.email, uid: response.user.uid });
      setLocation('profile');
    });
};

const styles = EStyleSheet.create({
  card: {
    padding: '1rem',
    margin: '1rem'
    //  border: 'none',
  },

  buttons: {
    marginTop: '1rem',
    marginLeft: '2rem',
    marginRight: '2rem'
  }
});

const mapStateToProps = state => {
  return {
    location: state.location,
    values: getFormValues('sign-in-form')(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setAuthentication: auth => {
      dispatch(setAuth(auth));
    },
    setLocation: location => {
      dispatch(setLocation(location));
    },
    initialize: values => {
      dispatch(initialize('sign-in-form', values));
    }
  };
};

const validate = values => {
  const errors = {};

  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.password) {
    errors.password = 'Required';
  } else if (values.password.length < 6 || values.password.length > 16) {
    errors.password = 'Must be 6-16 characters';
  }

  return errors;
};

export default compose(
  reduxForm({ form: 'sign-in-form', validate }),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(SignIn);
