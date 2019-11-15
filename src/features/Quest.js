import { Image, ScrollView, Text, View } from 'react-native';
import React from 'react';
import { Button, Card } from 'react-native-paper';
import { getData, putData, deleteData } from '../logic/data/actions';
import { setLocation } from '../logic/location/actions';
import { connect } from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import { FormHeader } from '../shared-components/FormHeader';
import { WrappedTextInput } from '../shared-components/FormField';
import { Field, reduxForm } from 'redux-form';
import { compose } from 'redux';

export const Quest = ({ info, setLocation, auth, putData, handleSubmit }) => {
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
                mode="contained"
                onPress={() => {
                  setLocation('questlist');
                }}>
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
                mode="contained"
                onPress={() => {
                  deleteData('https://levelup-10cfc.firebaseio.com/users/' + auth.uid + '/quests/' + info.id + '.json', 'quest');
                  setLocation('questlist');
                }}>
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

  infoWrapper: {
    paddingTop: '1rem'
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
    auth: state.auth,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    putData: (path, data, redirect) => {
      dispatch(putData(path, data, redirect));
    },
    setLocation: location => {
        dispatch(setLocation(location));
    },
    getData: (data, dataPoint) => {
      dispatch(getData(data, dataPoint));
    },
    deleteData: (data, location) => {
      dispatch(deleteData(data, location));
    },
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Quest);
