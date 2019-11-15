import { Image, ScrollView, Text, View } from 'react-native';
import React from 'react';
import { Button, Card } from 'react-native-paper';
import { getData, putData } from '../logic/data/actions';
import { setLocation } from '../logic/location/actions';
import { connect } from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import { FormHeader } from '../shared-components/FormHeader';
import { WrappedTextInput } from '../shared-components/FormField';
import { Field, reduxForm } from 'redux-form';
import { compose } from 'redux';

export const Quest = ({ info, auth, putData, handleSubmit }) => {
  return (
    <View style={styles.sectionHeight}>
      <View style={styles.formPadding}>
      </View>
      <ScrollView>
        <View>
          <Card style={styles.card}>
            <View>
              <Text style={{ textAlign: 'center', fontSize: 26, color: 'white', marginTop: 10 }}>
                {info && info.name}
              </Text>

              <View style={styles.infoWrapper}>
                <Text style={styles.description}>
                  {info ? ('Quest Description: ' + info.description) : 'Not Available'}
                </Text>
                <Text style={styles.experience}>{info ? ('Experience Reward: ' + info.expVal) : 'No Info'}</Text>
                <Text style={styles.skills}>
                  {info ? ('Associated Skills: ' + info.skill) : 'No Info'}
                </Text>
              </View>
            </View>
            <View style={styles.completeContainer}>
              <Button
                color="#cda845"
                uppercase={false}
                mode="contained">
                Complete Quest
            </Button>

            </View>
            <View style={styles.editContainer}>
              <Button
                color="#cda845"
                uppercase={false}
                mode="contained"
                onPress={() => {
                  setLocation('editquest');
                }}>
                Edit Quest
            </Button>
            </View>
            <View style={styles.deleteContainer}>
              <Button
                color="#cda845"
                uppercase={false}
                mode="contained">
                Delete Quest
              </Button>
            </View>
          </Card>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = EStyleSheet.create({

  sectionHeight: {
    height: '100%'
  },

  card: {
    //  border: 'none',
    marginBottom: '1rem',
    height: '30rem',
    padding: '1rem',
    backgroundColor: '#555'
  },
  buttonPadding: {
    padding: '20rem'
  },
  comment: {
    marginBottom: '1rem',
    padding: '1rem'
  },

  poster: {
    fontWeight: 'bold'
  },

  imageWrapper: {
    flex: 1,
    height: '10rem'
  },

  infoWrapper: {
    paddingTop: '1rem'
  },

  imageArea: {
    width: '100%',
    height: '10rem'
  },

  questName: {
    fontWeight: 'bold',
    fontSize: '3rem',
    marginBottom: '.5rem',
    color: 'white'
    // fontFamily: 'sans-serif',
  },

  description: {
    fontSize: '1rem',
    marginBottom: '.5rem',
    color: 'white'
    // fontFamily: 'sans-serif',
  },

  experience: {
    fontSize: '.9rem',
    marginBottom: '.25rem',
    color: 'white'
    // fontFamily: 'sans-serif',
  },

  skills: {
    fontSize: '.9rem',
    marginBottom: '.25rem',
    color: 'white'
    // fontFamily: 'sans-serif',
  },
  completeContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    justifyContent: 'center',
    bottom: '6rem',
    alignItems: 'center',
  },
  editContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: '3rem'
  },
  deleteContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 0
  },
  formPadding: {
    padding: '1rem'
  }
});

const mapStateToProps = state => {
  return {
    info: state.data.quest,
    auth: state.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    putData: (path, data, redirect) => {
      dispatch(putData(path, data, redirect));
    },
    getData: (data, dataPoint) => {
      dispatch(getData(data, dataPoint));
    }
  };
};

const validate = values => {
  const errors = {};

  if (!values.comment) {
    errors.comment = 'Required';
  } else if (values.comment.length > 2000) {
    errors.comment = 'Must be less than 3000 characters';
  }

  return errors;
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  reduxForm({ form: 'quest-comment-form', validate })
)(Quest);
