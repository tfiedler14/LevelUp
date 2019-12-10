import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Image, ScrollView, View, Text, ImageBackground } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { setLocation } from '../logic/location/actions';
import { getData, putData } from '../logic/data/actions';
import { setLoading } from '../logic/loading/actions';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Progress from 'react-native-progress';
import Async from '../shared-components/Async';
import { attributes } from '../../Const';
import { Col, Grid, Row } from 'react-native-easy-grid';

const attributeList = attributes;

export const Profile = ({
  getData,
  setLocation,
  skills,
  location,
  loading,
  auth,
  setLoading,
  character,
  profile
}) => {
  const handleAddSkill = location => {
    setLocation('addSkill');
    console.log('chaning location to addSkill');
    console.log(location);
  };
  /* istanbul ignore next */
  useEffect(() => {
    getData('https://levelup-10cfc.firebaseio.com/users/' + auth.uid + '/profile.json', 'profile');
    getData('https://levelup-10cfc.firebaseio.com/users/' + auth.uid + '/skills.json', 'skills');
    getData(
      'https://levelup-10cfc.firebaseio.com/users/' + auth.uid + '/attributes.json',
      'attributes'
    );
    getData(
      'https://levelup-10cfc.firebaseio.com/users/' + auth.uid + '/character.json',
      'character'
    );

    //name now reflects actual logged in user name instead of always the name tom, 
    //cleaned up code for rendering skills by adding a new element called AttributeItem 
    //and adding array of attribute names to Const, made this section a scrollview 
    //but that is currently not working

    setLoading(true);
  }, []);

  return (
    <ImageBackground
      source={require('../../assets/images/newBackgroundNoPattern.png')}
      style={{ height: '100%', width: '100%' }}>
      <Async
        render={
          <View>
            <View>
              <View style={{ position: 'absolute', flexDirection: 'row', alignSelf: 'flex-end', flex: 1, zIndex: 20 }}>
                <Icon
                  style={styles.padding}
                  name="add"
                  size={30}
                  color="white"
                  onPress={() => setLocation('addSkill')}
                />
                <Icon
                  style={styles.padding}
                  name="settings"
                  size={30}
                  color="white"
                  onPress={() => setLocation('settings')}
                />
              </View>
              <View style={{ flex: 1, flexDirection: 'column' }}>
                <Image
                  style={styles.imageProfile}
                  source={require('../../assets/images/newCharacter.png')}
                />

                <Text style={styles.charName}>
                  {character.characterName}
                </Text>
              </View>
              <View style={{ paddingTop: '20%', paddingLeft: '50%' }}>
                <Text style={styles.levelInfo}>Level {character.mainLevel}</Text>
                <Progress.Bar
                  style={styles.progress}
                  height={25}
                  color="yellow"
                  progress={character.mainLevelXp}
                />

              </View>
              <View style={{ flex: 1, paddingTop: '30%' }}>
                <Image
                  source={require('../../assets/images/seperator.png')} style={{ resizeMode: 'contain', width: '100%' }}
                />
              </View>

            </View>
            <View style={{ height: '80%', width: '100%', paddingTop: '5%', paddingLeft: '5%' }}>
              <ScrollView>
                {attributeList.map(data => {
                  return (
                    <View style={{ width: '50%' }}>
                      <Grid>
                        <Col>
                          <AttributeItem attributeName={data} skills1={skills} />
                        </Col>
                      </Grid>
                   </View>
                  );
                })}
              </ScrollView>
            </View>
          </View>
        }
      />
    </ImageBackground>
  );
};

const AttributeItem = ({ attributeName, skills1 }) => {
  return (
    <View style={styles.skillSec}>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <Text style={styles.attributeNameFont}>{attributeName.charAt(0).toUpperCase() + attributeName.slice(1)}:</Text>
        <View style = {{flex: 1, left: "115%", position: 'absolute'}}>
          <Progress.Bar
            style={styles.mainProgress}
            height={25}
            progress={1 / 100 + 0.2} //todo real data here
          />
        </View>
      </View>
      <AttributeListItem
        skills={skills1
          .filter(skill => skill.attribute === attributeName)
          .map(data => ({ name: data.name, level: data.val }))}
      />

    </View>
  );
};

const AttributeListItem = ({ skills, levels }) => {
  return skills.map(data => {
    return (
      <View style={{ flex: 1, flexDirection: 'column' }} key={data}>
        <Text style={{ color: '#ffffff', fontFamily: 'inconsolata' }}>
          {data.name}: {data.level}
        </Text>
      </View>
    );
  });
};



const styles = EStyleSheet.create({
  charName: {
    flex: 1,
    paddingTop: '55%',
    paddingLeft: '13%',
    left: 0,
    position: 'absolute',
    fontSize: '2rem',
    color: 'white',
    fontFamily: 'inconsolata'

  },
  attributeNameFont: { 
    color: '#ffffff', 
    fontSize: '2rem', 
    fontFamily: 'inconsolata' 
  },
  levelInfo: {
    color: 'white',
    fontSize: '2rem',
    fontFamily: 'inconsolata'
  },
  skillSec: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: '9%'
  },
  imageProfile: {
    flex: 1,
    left: '-20%',
    position: 'absolute',
    height: '15rem',
    resizeMode: 'contain',
    paddingTop: '35%'
  },
  progress: {
    height: 25,
    width: 125,
    borderColor: 'white',
    borderWidth: 2
  },
  mainProgress: {
    height: 25,
    width: 125,
    borderColor: 'white',
    borderWidth: 2
  },
  padding: {
    paddingTop: '.5rem',
    paddingRight: '.5rem',
    paddingBottom: '.5rem',
    paddingLeft: '.5rem'
  },
  infoMargin: {
    marginTop: '1rem'
  },

  mainInfo: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: '1.5rem',
    margin: 'auto'
  },

  secondaryInfo: {
    color: 'white',
    fontWeight: '300',
    margin: 'auto',
    fontSize: '1rem'
  },

  viewPadding: {
    margin: '1rem'
  },

  sectionHeight: {
    height: '100% - 18rem'
  },

  buttons: {
    marginBottom: '2rem'
  },
  topPadding: {
    paddingLeft: '2.5rem',
    paddingTop: '2.5rem'
  },

  cardPadding: {
    padding: '1rem',
    margin: '1rem'
  }
});

const mapStateToProps = state => {
  return {
    skills: state.data.skills,
    quests: state.data.quests,
    location: state.location,
    loading: state.loading,
    auth: state.auth,
    profile: state.data.profile,
    character: state.data.character
  };
};

const mapDispatchToProps = dispatch => {
  return {
    putData: data => {
      dispatch(putData(data));
    },
    getData: (data, dataPoint) => {
      dispatch(getData(data, dataPoint));
    },
    setLocation: location => {
      dispatch(setLocation(location));
    },
    setLoading: loading => {
      dispatch(setLoading(loading));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
