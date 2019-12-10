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
      source={require('../../assets/images/darkverylowopacityshapes.png')}
      style={{ height: '100%', width: '100%' }}>
      <Async
        render={
          <View>
            <View>
              <View style={{ position: 'absolute', alignSelf: 'flex-end', flex: 1, zIndex: 20 }}>
                <Icon
                  style={styles.padding}
                  name="settings"
                  size={48}
                  color="white"
                  onPress={() => setLocation('settings')}
                />
                <Icon
                  style={styles.padding}
                  name="add"
                  size={48}
                  color="white"
                  onPress={() => setLocation('addSkill')}
                />
              </View>
              <View>
                <Text style={{ textAlign: 'center', fontSize: 40, color: '#cda845', marginTop: 20, fontFamily: 'cinzel-decor' }}>
                  {character.characterName}
                </Text>
              </View>
              <View style={{ flex: 1, alignItems: 'center', paddingTop: 20 }}>
                <Image
                  style={styles.imageProfile}
                  source={require('../../assets/images/waycoolercharacter.png')}
                />
                <View style={{ paddingTop: 15 }}>
                  <Text>Level</Text>
                  <Progress.Bar
                    style={styles.progress}
                    color="#cda845"
                    height={15}
                    progress={0.5}
                  />
                </View>
              </View>
              < View style={{ flex: 1, paddingTop: 275 }}>
                <Image
                  source={require('../../assets/images/divider.png')} style={{ resizeMode: 'contain', width: '100%' }}
                />
              </View>
            </View>
            <View style={styles.scrolling}>
              <ScrollView style={{ paddingTop: '0%', marginTop: "0%", marginBottom: 0, }}
                        contentContainerStyle={{ top: '0%', width: '100%', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                        automaticallyAdjustContentInsets={false}
                        showsVerticalScrollIndicator={true}
                        directionalLockEnabled={true}
                        automaticallyAdjustContentInsets={false}>
                {attributeList.map(data => {
                  return (
                    <View style={{ width: 500 }}>
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
      <Text style={{ color: '#ffffff', fontSize: 20, fontFamily: 'cinzel-decor' }}>{attributeName.charAt(0).toUpperCase() + attributeName.slice(1)}</Text>
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

      <View style={{ marginLeft: 45 }} key={data}>
        <Text style={{ color: '#ffffff', fontFamily: 'cinzel-decor' }}>
          {data.name} -{data.level}
        </Text>
        <View>
          <Progress.Bar
            style={styles.progress}
            color="#cda845"
            height={15}
            progress={data.level / 100 + 0.2}
          />
        </View>
      </View>
    );
  });
};

const styles = EStyleSheet.create({
  profileHeader: {
    backgroundColor: '#0a6e44',
    width: '100%',
    height: '12rem',
    zIndex: 4
  },
  container: {
    flex: 1
  },
  skillSec: {
    flexDirection: 'row',
    paddingTop: 30
  },
  imageProfile: {
    width: 225,
    height: 225,
    resizeMode: 'stretch'
  },
  scrolling:{
    position: 'absolute',  
    height: '15rem', 
    width: '100%', 
    marginTop: '10%', 
    top: 350, 
    left: 0, 
    right: 0,  
    bottom: 0, 
    justifyContent: 'flex-start', 
    alignItems: 'flex-start',
  },
  progress: {
    height: 15,
    width: 100,
    borderColor: 'white',
    borderWidth: 1
  },
  padding: {
    paddingTop: '1rem',
    paddingRight: '1rem',
    paddingBottom: '1rem',
    paddingLeft: '1rem'
  },
  profileWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    textAlign: 'center'
  },

  profileImage: {
    borderRadius: 50,
    width: '6rem',
    height: '6rem',
    marginTop: '1rem',
    margin: 'auto'
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
