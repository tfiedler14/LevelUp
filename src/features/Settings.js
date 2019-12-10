import { setAuth } from '../logic/auth/actions';
import { View, ScrollView, ImageBackground, Text } from 'react-native';
import { connect } from 'react-redux';
import SignIn from './SignIn';
import * as React from 'react';
import { Field, getFormValues, reduxForm } from 'redux-form';
import { WrappedTextInput } from '../shared-components/FormField';
import { setLocation } from '../logic/location/actions';
import { setErrors } from '../logic/errors/actions';
import {putData} from '../logic/data/actions';
import {setCharacter} from '../logic/data/actions';
import { compose } from 'redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Button, Card } from 'react-native-paper';
import { FormHeader } from '../shared-components/FormHeader';
import { firebaseApp } from '../../Const';

export const Settings = ({ setLocation, auth, handleSubmit, setAuth, setErrors, errors, setCharacter, character, putData }) => {
  if (auth.loggedIn) {
    return (
      <View style={styles.sectionHeight}>
        <ScrollView>
          {errors.password && (
            <Card style={styles.errorCard}>
              <View>
                <Text style={{ color: '#FFFFFF' }}>Password not changed, please try again</Text>
              </View>
            </Card>
          )}
          {errors.delete && (
            <Card style={styles.errorCard}>
              <View>
                <Text style={{ color: '#FFFFFF' }}>Account not deleted, please try again</Text>
              </View>
            </Card>
          )}
          {errors.email && (
            <Card style={styles.errorCard}>
              <View>
                <Text style={{ color: '#FFFFFF' }}>Email not changed, please try again</Text>
              </View>
            </Card>
          )}
          {errors.logout && (
            <Card style={styles.errorCard}>
              <View>
                <Text style={{ color: '#FFFFFF' }}>Failed to sign out, please try again</Text>
              </View>
            </Card>
          )}
          <Card style={styles.card}>
            <View>
              <FormHeader title={'Edit Settings'} />
              <Field
                name="name"
                id="name"
                props={{ title: 'Change Name (optional)' }}
                component={WrappedTextInput}
              />
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
                  color="#ff0066"
                  uppercase={false}
                  mode="contained"
                  onPress={handleSubmit(values => {
                    if (values.password) {
                      firebaseApp
                        .auth()
                        .currentUser.updatePassword(values.password)
                        .catch(error => {
                          console.log('Password not updated');
                          setErrors({ ...errors, password: true });
                        });
                    }

                    if (values.name) {
                      setCharacter({...character, characterName: values.name});
                      console.log("Character: ", character);
                      putData('https://levelup-10cfc.firebaseio.com/users/' + auth.uid + '/character.json', character)
                    }
                    if (values.email) {
                      firebaseApp
                        .auth()
                        .currentUser.updateEmail(values.email)
                        .catch(error => {
                          console.log('Email not updated');
                          setErrors({ ...errors, email: true });
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
                    handleSignOut(setAuth, setLocation, setErrors, errors);
                  }}>
                  Sign Out
                </Button>
                <Button
                  color="#f44"
                  uppercase={false}
                  mode="contained"
                  style={styles.deleteButton}
                  onPress={() => {
                    firebaseApp
                      .auth()
                      .currentUser.delete()
                      .then(setLocation('signin'))
                      .catch(error => {
                        console.log('User not deleted.');
                        setErrors({ ...errors, delete: true });
                      });
                  }}>
                  Delete Account
                </Button>
              </View>
            </View>
          </Card>
        </ScrollView>
      </View>
    );
  } else {
    return <SignIn />;
  }
};

const handleSignOut = (setAuth, setLocation, setErrors, errors) => {
  firebaseApp
    .auth()
    .signOut()
    .then(response => {
      setAuth({ loggedIn: false, email: '', uid: '' });
      setLocation('signin');
    })
    .catch(error => {
      console.log('Failed to sign out.');
      setErrors({ ...errors, logout: true });
      throw error;
    });
};

const styles = EStyleSheet.create({
  sectionHeight: {
    height: '100% - 4.5rem'
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
  },

  deleteButton: {
    marginTop: '1rem'
  }
});

export const mapStateToProps = state => {
  return {
    auth: state.auth,
    values: getFormValues('settings-form')(state),
    errors: state.errors,
    character: state.data.character
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    setLocation: location => {
      dispatch(setLocation(location));
    },
    setAuth: auth => {
      dispatch(setAuth(auth));
    },
    setErrors: errors => {
      dispatch(setErrors(errors));
    },
    putData: data => {
      dispatch(putData(data));
    },
    setCharacter: data => {
      dispatch(setCharacter(data));
    }
  };
};

export const validate = values => {
  const errors = {};

  /*if (values.name && values.name !== '') {

  } */

  if (values.email && values.email !== '') {
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
