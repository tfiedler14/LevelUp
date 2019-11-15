import * as React from 'react';
import { connect } from 'react-redux';
import { View, ImageBackground } from 'react-native';
import { setLocation } from '../logic/location/actions';
import { setAuth } from '../logic/auth/actions';
import { firebaseApp } from '../../Const';
import { Field, reduxForm } from 'redux-form';
import { compose } from 'redux';
import { WrappedTextInput } from '../shared-components/FormField';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Button, Card } from 'react-native-paper';
import { FormHeader } from '../shared-components/FormHeader';
import { putData } from '../logic/data/actions';

export const SignUp = ({ setLocation, handleSubmit, setAuthentication, putData }) => {
  return (
    <ImageBackground source={require('../../assets/images/darkverylowopacityshapes.png')} style={{height: '100%', width: '100%'}}>
    <View style={{paddingTop: 100}}>
    <Card style={styles.card}>
      <View>
        <FormHeader title={'Sign Up'} />
        <Field
          name="email"
          id="email"
          props={{
            title: 'Email', textContentType: 'emailAddress', autoCompleteType: 'email'
          }}
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
        <Field
          name="cpassword"
          id="cpassword"
          props={{
            title: 'Confirm Password',
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
              handleSignUp(values, setLocation, setAuthentication, putData);
            })}>
            Sign Up
          </Button>
          <Button
            color="white"
            uppercase={false}
            mode="text"
            onPress={() => setLocation('signin')}>
            Sign In
          </Button>
        </View>
      </View>
    </Card>
    </View>
    </ImageBackground>
  );
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

  if (values.cpassword !== values.password) {
    errors.cpassword = 'Passwords must match';
  }

  return errors;
};

const handleSignUp = (values, setLocation, setAuthentication, putData) => {
  firebaseApp
    .auth()
    .createUserWithEmailAndPassword(values.email, values.password)
    .then(response => {
      setAuthentication({ loggedIn: true, email: values.email, uid: response.user.uid });
      putData('https://levelup-10cfc.firebaseio.com/users/' + response.user.uid + '.json', {
        quests: ['empty'],
        profile: { brows: "type-1", eyes: "type-1", hairColor: "type-1", hairStyle: "type-1", headShape: "type-1", mouth: "type-1" ,name: "none", nose: "type-1", skinColor: "tan" },
        skills: ['empty'],
        attributes: {fitness: {exp: 0, level: 1}, academics: {exp: 0, level: 1}, crafts: {exp: 0, level: 1}, community: {exp: 0, level: 1}, mental: {exp: 0, level: 1}, hobby: {exp: 0, level: 1}}
      }, 'profile', 'profile');
    })
    .catch(error => {
      console.log('Failed to create user.');
    });
};

const styles = EStyleSheet.create({
  card: {
    padding: '1rem',
    margin: '1rem',
    backgroundColor: '#555'
    //  border: 'none',
  },

  buttons: {
    marginTop: '1rem',
    marginLeft: '2rem',
    marginRight: '2rem'
  }
});

export const mapStateToProps = state => {
  return {
    location: state.location
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    setLocation: location => {
      dispatch(setLocation(location));
    },
    setAuthentication: auth => {
      dispatch(setAuth(auth));
    },
    putData: (target, data, redirect, type) => {
      dispatch(putData(target, data, redirect, type));
    }
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  reduxForm({ form: 'sign-up-form', validate })
)(SignUp);
