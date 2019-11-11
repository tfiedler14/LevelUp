import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {Text, View, ImageBackground} from 'react-native';
import { setErrors } from '../logic/errors/actions';
import { setLocation } from '../logic/location/actions';
import { setAuth } from '../logic/auth/actions';
import { firebaseApp } from '../../Const';
import { compose } from 'redux';
import {Field, getFormValues, initialize, reduxForm} from 'redux-form';
import { WrappedTextInput } from '../shared-components/FormField';
import { Button, Card } from 'react-native-paper';
import EStyleSheet from 'react-native-extended-stylesheet';
import { FormHeader } from '../shared-components/FormHeader';

export const SignIn = ({ setLocation, handleSubmit, setAuthentication, initialize, setErrors, errors, values }) => {
  // const [initialized, setInitialized] = useState(false);

  /*useEffect(() => {
    if (!initialized) {
      initialize({
        email: '',
        password: ''
      });
      setInitialized(true);
    }
  });*/

  return (
    <>
    <ImageBackground source={require('../../assets/images/darkverylowopacityshapes.png')} style={{height: '100%', width: '100%'}}>
      {errors.signIn && (
        <Card style={styles.errorCard}>
          <View>
            <Text style={{color: '#FFFFFF'}}>Incorrect email and password combination</Text>
          </View>
        </Card>
      )}
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
              color="#de3c57"
              uppercase={false}
              mode="contained"
              onPress={handleSubmit(values => {
                handleLogin(values, setLocation, setAuthentication, setErrors);
              })}>
              Sign In
            </Button>
            <Button
              color="white"
              uppercase={false}
              mode="text"
              onPress={() => setLocation('signup')}>
              Need an account? Sign up!
            </Button>
          </View>
        </View>
      </Card>
      </ImageBackground>
    </>
  );
};

const handleLogin = (values, setLocation, setAuth, setErrors) => {
  firebaseApp
    .auth()
    .signInWithEmailAndPassword(values.email, values.password)
    .then(response => {
      console.log(response);
      setAuth({ loggedIn: true, email: response.user.email, uid: response.user.uid });
      setLocation('profile');
    }).catch(error => {
    console.log('Failed to sign in.');
    setErrors({ signIn: true });
  });
};

const styles = EStyleSheet.create({
  card: {
    padding: '1rem',
    margin: '1rem',
    backgroundColor: '#555'
    //  border: 'none',
  },

  errorCard: {
    padding: '1rem',
    margin: '1rem',
    backgroundColor: '#770000'
  },

  buttons: {
    marginTop: '1rem',
    marginLeft: '2rem',
    marginRight: '2rem'
  }
});

export const mapStateToProps = state => {
  console.log(state);
  return {
    location: state.location,
    values: getFormValues('sign-in-form')(state),
    errors: state.errors
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
    },
    setErrors: errors => {
      dispatch(setErrors(errors));
    }
  };
};

export const validate = values => {
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