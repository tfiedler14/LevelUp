import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Text, View, ImageBackground, Image } from 'react-native';
import { setErrors } from '../logic/errors/actions';
import { setLocation } from '../logic/location/actions';
import { setAuth } from '../logic/auth/actions';
import { firebaseApp } from '../../Const';
import { compose } from 'redux';
import { Field, getFormValues, initialize, reduxForm } from 'redux-form';
import { WrappedTextInput } from '../shared-components/FormField';
import { Button, Card } from 'react-native-paper';
import EStyleSheet from 'react-native-extended-stylesheet';
import { FormHeader } from '../shared-components/FormHeader';
import { AppLoading } from 'expo';

export const SignIn = ({ setLocation, handleSubmit, setAuthentication, setErrors, errors }) => {
  return (
    <> 
    <ImageBackground source={require('../../assets/images/newBackground.png')} style={{height: '100%', width: '100%'}}>
      {errors.signIn && (
        <Card style={styles.errorCard}>
          <View>
            <Text style={{color: '#FFFFFF'}}>Incorrect email and password combination</Text>
          </View>
        </Card>
      )}
      <View>
      <Image
    style={{alignSelf: 'center', resizeMode: 'contain', width: '92%'}}
    source={require('../../assets/images/newLogo.png')}
  />
      <Card style={styles.card}>
        <View>
          <FormHeader title={'Sign In'}  />
          <Field
            name="email"
            autoCapitalize='none'
            id="email"
            props={{ title: 'Email', textContentType: 'emailAddress', autoCompleteType: 'email' }}
            component={WrappedTextInput} />

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
                  color="#edbf18"
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
        </View>
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
      setLocation('calendar');
    })
    .catch(error => {
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
  mainView: {
    paddingTop: '4rem'
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
    errors: state.errors,
    initialValues: {
      email: 'tf@tf.com',
      password: 'tftftf'
    }
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    setAuthentication: auth => {
      dispatch(setAuth(auth));
    },
    setLocation: location => {
      dispatch(setLocation(location));
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
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  reduxForm({ form: 'sign-in-form', validate, enableReinitialize: true }),
)(SignIn);
