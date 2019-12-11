import { ScrollView, Text, View } from 'react-native';
import React from 'react';
import { Button, Card } from 'react-native-paper';
import { getData, putData, deleteData } from '../logic/data/actions';
import { setLocation } from '../logic/location/actions';
import { connect } from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import { compose } from 'redux';
import moment from 'moment';
import { Col, Grid } from 'react-native-easy-grid';

export const Quest = ({
  info,
  setLocation,
  deleteData,
  attributes,
  character,
  auth,
  skills,
  quests,
  putData,
  handleSubmit
}) => {
  return (
    <View style={styles.sectionHeight}>
      <View style={styles.questHeader}>
        <Text style={styles.questtitle}>{info && info.name}</Text>
        <Text style={styles.description}>
          {'Quest Description: ' + (info ? info.description : 'Not Available')}
        </Text>
      </View>
      <ScrollView>
        <View style={styles.pagePadding}>
          <View style={styles.infoWrapper}>
            <Text style={styles.skills}>
              {'Associated Skills: ' + (info ? info.skill : 'No Info')}
            </Text>
            <Text style={styles.time}>{info ? 'Quest Length: ' + info.time : 'No Info'}</Text>
            <Text style={styles.time}>
              {'Quest Difficulty: ' + (info ? info.difficulty : 'No Info')}
            </Text>
          </View>
          <Grid>
            <Col size={2}>
              <Button
                color="#090"
                uppercase={false}
                mode="contained"
                style={styles.buttonPadding}
                onPress={() => {
                  //get skills of quest from data.skills
                  const questSkills = skills.filter(skill => skill && skill.name === info.skill);
                  const questAttributes = attributes;
                  let finalExp = 0;

                  console.log(questSkills);
                  console.log(questAttributes);

                  for (let curSkill of questSkills) {
                    //add xp to skill
                    curSkill.xp +=
                      6 * (info.difficulty + 0.1 * curSkill.val) +
                      2 * (info.time + 0.1 * curSkill.val);
                    finalExp +=
                      6 * (info.difficulty + 0.1 * curSkill.val) +
                      2 * (info.time + 0.1 * curSkill.val);
                    //while total xp of curSkill is greater/equal than xpToNext, increment level and update xpToNext
                    while (curSkill.xp >= curSkill.xpToNext) {
                      curSkill.val++; //levelUp!
                      curSkill.xpToNext += curSkill.xpToNext * 1.065; //update xpTonext
                      //since we are leveling up a skill, we grant xp to its parent attribute
                      //get attribute from state
                      let attribute = questAttributes[curSkill.attribute];
                      //add xp to attribute and levelUp
                      attribute.exp += 6 * curSkill.val;
                      while (attribute.exp >= attribute.xpToNext) {
                        //level up and update xpToNext
                        attribute.level += 1;
                        attribute.xpToNext += attribute.xpToNext * 1.065;
                        //as this is an attribute level up, grant xp to main level
                        character.mainLevelXp += 6 * attribute.level;
                      }
                      questAttributes[attribute.id] = attribute;
                    }
                  }
                  //all skills updated and leveled up. create new array of skills to put
                  //first put skills that were updated on complete quest
                  var newSkills = [...questSkills];
                  for (let a of skills) {
                    // if this skill hasn't been updated, put the current version in the new array
                    if (newSkills.filter(sk => sk.name === a.name).length === 0) {
                      newSkills.push(a);
                    }
                  }

                  console.log(newSkills);
                  //put new skill array
                  putData(
                    'https://levelup-10cfc.firebaseio.com/users/' + auth.uid + '/skills.json',
                    [...newSkills],
                    null,
                    'profile'
                  );

                  console.log(attributes);
                  //level up attributes and grant xp to main level
                  //put attributes
                  putData(
                    'https://levelup-10cfc.firebaseio.com/users/' + auth.uid + '/attributes.json',
                    attributes,
                    null,
                    'profile'
                  );
                  //finally we level up main level in the same manner
                  while (character.mainLevelXp >= character.mainLevelUpToNext) {
                    character.mainLevel++;
                    character.mainLevelXpToNext += character.mainLevelXpToNext * 1.065;
                  }
                  putData(
                    'https://levelup-10cfc.firebaseio.com/users/' + auth.uid + '/character.json',
                    character,
                    null,
                    'profile'
                  );
                  quests.filter(e => e.uid === info.uid)[0].finishDate = moment()
                    .format()
                    .split('T')[0];
                  quests.filter(e => e.uid === info.uid)[0].expVal = finalExp;
                  putData(
                    'https://levelup-10cfc.firebaseio.com/users/' + auth.uid + '/quests' + '.json',
                    quests,
                    'questlist'
                  );
                }}>
                Finish
              </Button>
            </Col>
            <Col size={2}>
              <Button
                color="#090"
                uppercase={false}
                mode="contained"
                style={styles.buttonPadding}
                onPress={() => {
                  console.log("QUEST: ", info);
                  setLocation('editquest');
                }}>
                Edit
              </Button>
            </Col>
            <Col size={2}>
              <Button
                color="#090"
                uppercase={false}
                mode="contained"
                style={styles.buttonPadding}
                onPress={() => {
                  quests.filter(e => e.uid === info.uid)[0].finishDate = "deleted";
                  putData(
                    'https://levelup-10cfc.firebaseio.com/users/' + auth.uid + '/quests' + '.json',
                    quests,
                    'questlist'
                  );
                }}>
                Delete
              </Button>
            </Col>
          </Grid>
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

  questHeader: {
    backgroundColor: '#555',
    paddingBottom: '1rem'
  },

  infoWrapper: {
    paddingTop: '1rem',
    paddingBottom: '1rem'
  },

  pagePadding: {
    padding: '1rem'
  },

  description: {
    textAlign: 'center',
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
    alignItems: 'center'
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
  },
  buttonPadding: {
    margin: '.5rem'
  }
});

const mapStateToProps = state => {
  return {
    info: state.data.quest,
    auth: state.auth,
    skills: state.data.skills,
    attributes: state.data.attributes,
    character: state.data.character,
    quests: state.data.quests,
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
    }
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Quest);
