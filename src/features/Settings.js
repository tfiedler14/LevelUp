import { getData, putData } from '../logic/data/actions';
import { setAuth } from '../logic/auth/actions';
import { View, ScrollView } from 'react-native';
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

export const Settings = ({
  setLocation,
  putData,
  auth,
  handleSubmit,
  setAuth,
  profile,
  values
}) => {
  if (auth.loggedIn) {
    return (
      <View style={styles.sectionHeight}>
        <ScrollView>
          <Card style={styles.card}>
            <View>
              <FormHeader title={'Edit Profile'} />
              <Field name="name" id="name" props={{ title: 'Name' }} component={WrappedTextInput} />
              <Field
                name="gender"
                id="gender"
                props={{ title: 'Gender' }}
                component={WrappedTextInput}
              />
              <Field name="age" id="age" props={{ title: 'Age' }} component={WrappedTextInput} />
              <Field
                name="image"
                id="image"
                props={{ title: 'Profile Image (optional)' }}
                component={WrappedTextInput}
              />
              <Field
                name="password"
                id="password"
                props={{
                  title: 'Password (optional)',
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
                    if (values.password) {
                      firebaseApp
                        .auth()
                        .currentUser.updatePassword(values.password)
                        .then(() => {
                          putData(
                            'https://roommate-finder-afd9b.firebaseio.com/users/' +
                              auth.uid +
                              '/profile.json',
                            {
                              ...values,
                              favorites: profile.profile.favorites
                            },
                            'profile'
                          );
                        })
                        .catch(error => {
                          console.log('Password not updated');
                        });
                    } else {
                      putData(
                        'https://roommate-finder-afd9b.firebaseio.com/users/' +
                          auth.uid +
                          '/profile.json',
                        values,
                        'profile'
                      );
                    }
                  })}>
                  Save Profile
                </Button>
                <Button
                  color="#fff"
                  uppercase={false}
                  mode="text"
                  onPress={() => {
                    // TODO: no op -- need a sign out action
                    handleSignOut(setAuth, setLocation);
                  }}>
                  Sign Out
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

const mapStateToProps = state => {
  return {
    auth: state.auth,
    profile: state.data.profile,
    initialValues: {...state.data.profile.profile, password: undefined, cpassword: undefined},
    values: getFormValues('settings-form')(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    putData: (path, data, redirect) => {
      dispatch(putData(path, data, redirect));
    },
    getData: (data, dataPoint) => {
      dispatch(getData(data, dataPoint));
    },
    setLocation: location => {
      dispatch(setLocation(location));
    },
    setAuth: auth => {
      dispatch(setAuth(auth));
    },
    initialize: values => {
      dispatch(initialize('settings-form', values));
    }
  };
};

const validate = values => {
  const errors = {};

  if (!values.name) {
    errors.name = 'Required';
  } else if (values.name.length > 100) {
    errors.name = 'Must be less than 100 characters';
  }

  /*if (!values.gender) {
    errors.gender = 'Required';
  } else if (values.gender.length > 20) {
    errors.gender = 'Must be less than 20 characters';
  }

  if (!values.age) {
    errors.age = 'Required';
  } else if (isNaN(values.age)) {
    errors.age = 'Must be a number';
  } else if (parseInt(values.age, 10) < 15 || parseInt(values.age, 10) > 90) {
    errors.age = 'Must be 15-90';
  }
  if (values.password) {
    if (values.password.length < 6 || values.password.length > 16) {
      errors.password = 'Must be 6-16 characters';
    }

    if (values.cpassword !== values.password) {
      errors.cpassword = 'Passwords must match';
    }
  }*/

  return errors;
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  reduxForm({ form: 'settings-form', validate })
)(Settings);
