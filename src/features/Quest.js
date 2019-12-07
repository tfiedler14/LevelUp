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
import moment from "moment";


export const Quest = ({ info, setLocation, deleteData, auth, quests, putData, handleSubmit }) => {
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
                //get skills of quest from data.skills
                var questSkills = skills.filter(skill => skill.name === info.skill);
                var questAttributes = attributes;
                for (var curSkill of questSkills){
                  //add xp to skill
                  curSkill.xp += 6*(info.difficulty + 0.1*curSkill.val) + 2*(info.time + 0.1* curSkill.val);
                  //while total xp of curSkill is greater/equal than xpToNext, increment level and update xpToNext
                  while(curSkill.xp >= curSkill.xpToNext){
                    curSkill.val++; //levelUp!
                    curSkill.xpToNext += curSkill.xpToNext*1.065; //update xpTonext
                    //since we are leveling up a skill, we grant xp to its parent attribute
                    //get attribute from state
                    let attribute = questAttributes[curSkill.attribute]; 
                    //add xp to attribute and levelUp
                    attribute.exp += 6*curSkill.val;
                    while (attribute.exp >= attribute.xpToNext){
                      //level up and update xpToNext
                      attribute.level += 1;
                      attribute.xpToNext += attribute.xpToNext*1.065;
                      //as this is an attribute level up, grant xp to main level
                      character.mainLevelXp += 6*attribute.level;
                     }
                    questAttributes[attribute.id] = attribute;
                    }
                }
                //all skills updated and leveled up. create new array of skills to put
                //first put skills that were updated on complete quest
                var newSkills = [...questSkills];
                for (let a of skills){
                  // if this skill hasn't been updated, put the current version in the new array
                  if(newSkills.filter(sk => sk.name === a.name).length == 0){
                    newSkills.push(a);
                  }
                }
                //put new skill array
                putData('https://levelup-10cfc.firebaseio.com/users/' + auth.uid + '/skills.json', [...newSkills], null, 'profile');
                //level up attributes and grant xp to main level
                //put attributes
                putData('https://levelup-10cfc.firebaseio.com/users/' + auth.uid + '/attributes.json', attributes, null, 'profile');
                //finally we level up main level in the same manner
                while (character.mainLevelXp >= character.mainLevelUpToNext){
                  character.mainLevel++;
                  character.mainLevelXpToNext += character.mainLevelXpToNext*1.065
                }
                putData('https://levelup-10cfc.firebaseio.com/users/' + auth.uid + '/character.json', character, null, 'profile');
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
    quests: state.data.quests
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
