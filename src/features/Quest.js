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

export const Quest = ({ info, setLocation, deleteData, attributes, character, auth, skills, putData, handleSubmit }) => {
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
                var skill = skills.filter(skill => skill.name === info.skill)[0];
                console.log(6*(info.difficulty + 0.1*skill.val) + 2*(info.time + 0.1* skill.val));
                console.log(skill);
                skill.xp += 6*(info.difficulty + 0.1*skill.val) + 2*(info.time + 0.1* skill.val);
                var attribute;
                while(skill.xp >= skill.xpToNext){
                  skill.val++; //levelUp!
                  skill.xpToNext += skill.xpToNext*1.065;
                  attribute = attributes[skill.attribute];
                  attribute.xp += 6*skill.val;
                }
                while (attribute.xp >= attribute.xpToNext){
                  attribute.level++;
                  attribute.xpToNext += attribute.xpToNext*1.065;
                  character.mainLevelXp += 6*attribute.level;

                }
                while (character.mainLevelXp >= character.mainLevelXpToNext){
                  character.mainLevel++;
                  character.mainLevelXpToNext += character.mainLevelXpToNext*1.065;
                }
                putData('https://levelup-10cfc.firebaseio.com/users/' + auth.uid + '/skills.json', [...skills], null, 'profile');
                deleteData('https://levelup-10cfc.firebaseio.com/users/' + auth.uid + '/quests/' + info.id + '.json', 'questlist');
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
                  deleteData('https://levelup-10cfc.firebaseio.com/users/' + auth.uid + '/quests/' + info.id + '.json', 'questlist');
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
    skills: state.data.skills,
    attributes: state.data.attributes,
    character: state.data.character,
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
