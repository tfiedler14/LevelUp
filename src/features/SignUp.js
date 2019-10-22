import * as React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
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
    <Card style={styles.card}>
      <View>
        <FormHeader title={'Sign Up'} />
        <Field
          name="email"
          id="email"
          props={{
            title: 'Email'
          }}
          component={WrappedTextInput}
        />
        <Field
          name="name"
          id="name"
          props={{
            title: 'Name'
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
            color="#064f2f"
            uppercase={false}
            mode="contained"
            onPress={handleSubmit(values => {
              handleSignUp(values, setLocation, setAuthentication, putData);
            })}>
            Sign Up
          </Button>
        </View>
      </View>
    </Card>
  );
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

  if (values.cpassword !== values.password) {
    errors.cpassword = 'Passwords must match';
  }

  if (!values.name) {
    errors.name = 'Required';
  } else if (values.name.length > 20) {
    errors.name = 'Must be fewer than 20 characters'
  }

  return errors;
};

const handleSignUp = (values, setLocation, setAuthentication, putData) => {
  firebaseApp
    .auth()
    .createUserWithEmailAndPassword(values.email, values.password)
    .then(response => {
      setAuthentication({ loggedIn: true, email: values.email, uid: response.user.uid });
      putData('https://roommate-finder-afd9b.firebaseio.com/users/' + response.user.uid + '.json', {
        quests: ['empty'],
        profile: { age: "N/A", gender: 'N/A', image: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png', name: values.name }
      }, 'profile', 'profile');
    })
    .catch(error => {
      console.log('Failed to create user.');
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
    location: state.location
  };
};

const mapDispatchToProps = dispatch => {
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
