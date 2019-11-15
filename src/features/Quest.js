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
        <View style={styles.infoWrapper}>
          <Card style={styles.card}>

            <Text style={styles.questtitle}>
              {info && info.name}
            </Text>

            <View>
              <View style={styles.infoWrapper}>
                <Text style={styles.description}>
                  {info ? ('Quest Description: ' + info.description) : 'Not Available'}
                </Text>
                <Text style={styles.skills}>{info ? ('Associated Skills: ' + info.skill) : 'No Info'}</Text>
                <Text style={styles.time}>{info ? ('Quest Length: ' + info.time) : 'No Info'}</Text>
                <Text style={styles.time}>{info ? ('Quest Difficulty: ' + info.difficulty) : 'No Info'}</Text>
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
  questtitle: {
    textAlign: 'center',
    fontSize: '2rem',
    color: 'white',
    marginTop: '1rem'
  },

  card: {
    //  border: 'none',
    paddingTop: '0rem',
    marginBottom: '1rem',
    height: '30rem',
    paddingLeft: '1rem',
    paddingRight: '1rem',
    backgroundColor: 'transparent'
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
    fontSize: '1.15rem',
    marginBottom: '.5rem',
    color: 'white'
    // fontFamily: 'sans-serif',
  },

  time: {
    fontSize: '1rem',
    marginBottom: '.25rem',
    color: 'white'
    // fontFamily: 'sans-serif',
  },

  skills: {
    fontSize: '1rem',
    marginBottom: '.25rem',
    color: 'white'
    // fontFamily: 'sans-serif',
  },
  completeContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    justifyContent: 'center',
    bottom: '7rem',
    alignItems: 'center',
  },
  editContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: '4rem'
  },
  deleteContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: '1rem'
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
