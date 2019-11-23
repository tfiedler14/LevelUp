import { setAuth } from '../logic/auth/actions';
import { View, ScrollView, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import SignIn from './SignIn';
import * as React from 'react';
import { Field, getFormValues, initialize, reduxForm } from 'redux-form';
import { WrappedTextInput } from '../shared-components/FormField';
import { setLocation } from '../logic/location/actions';
import { compose } from 'redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Button, Card } from 'react-native-paper';
import { FormHeader } from '../shared-components/FormHeader';
import { firebaseApp } from '../../Const';

export const Settings = ({ setLocation, auth, handleSubmit, setAuth }) => {
  if (auth.loggedIn) {
    return (
      <ImageBackground
      source={require('../../assets/images/darkverylowopacityshapes.png')}
      style={{ height: '100%', width: '100%' }}>
      <View style={styles.sectionHeight}>
        <ScrollView>
          <Card style={styles.card}>
            <View>
              <FormHeader title={'Edit Settings'} />
              <Field
                name="email"
                id="email"
                props={{ title: 'Change Email (optional)' }}
                component={WrappedTextInput}
              />
              <Field
                name="password"
                id="password"
                props={{
                  title: 'Change Password (optional)',
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
                  title: 'Confirm Change Password (optional)',
                  textContentType: 'password',
                  autoCompleteType: 'password',
                  password: true
                }}
                component={WrappedTextInput}
              />
              <View style={styles.buttons}>
                <Button
                  color="#cda845"
                  uppercase={false}
                  mode="contained"
                  onPress={handleSubmit(values => {
                    if (values.password) {
                      firebaseApp
                        .auth()
                        .currentUser.updatePassword(values.password)
                        .catch(error => {
                          console.log('Password not updated');
                        });
                    }

                    if (values.email) {
                      firebaseApp
                        .auth()
                        .currentUser.updateEmail(values.email)
                        .catch(error => {
                          console.log('Email not updated');
                        });
                    }
                    setLocation(values.email ? 'signin' : 'profile');
                  })}>
                  Save Profile
                </Button>
                <Button
                  color="#fff"
                  uppercase={false}
                  mode="text"
                  onPress={() => {
                    handleSignOut(setAuth, setLocation);
                  }}>
                  Sign Out
                </Button>
                <Button
                  color="#f33"
                  uppercase={false}
                  mode="text"
                  onPress={() => {
                    firebaseApp
                      .auth()
                      .currentUser.delete()
                      .then(setLocation('signin'))
                      .catch(error => {
                        console.log('User not deleted.');
                      });
                  }}>
                  Delete Account
                </Button>
              </View>
            </View>
          </Card>
        </ScrollView>
      </View>
      </ImageBackground>
    );
  } else {
    return <SignIn />;
  }
};

const handleSignOut = (setAuth, setLocation) => {
  firebaseApp
    .auth()
    .signOut()
    .then(response => {
      setAuth({ loggedIn: false, email: '', uid: '' });
      setLocation('signin');
    })
    .catch(error => {
      console.log('Failed to sign out.');
      throw error;
    });
};

const styles = EStyleSheet.create({
  sectionHeight: {
    height: '100% - 6rem'
  },

  card: {
    padding: '1rem',
    margin: '1rem',
    color: 'white',
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
    auth: state.auth,
    values: getFormValues('settings-form')(state)
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    setLocation: location => {
      dispatch(setLocation(location));
    },
    setAuth: auth => {
      dispatch(setAuth(auth));
    }
  };
};

export const validate = values => {
  const errors = {};

  if (values.email && values.email !== "") {
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }
  }

  if (values.password && (values.password.length < 6 || values.password.length > 16)) {
    errors.password = 'Must be 6-16 characters';
  }

  if (values.cpassword !== values.password) {
    errors.cpassword = 'Passwords must match';
  }

  return errors;
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  reduxForm({ form: 'settings-form', validate })
)(Settings);
