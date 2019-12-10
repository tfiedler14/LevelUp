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
import { Col, Grid } from 'react-native-easy-grid';
import { FAB } from 'react-native-paper';

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
    <Async
      render={
        <View>
          <View style={styles.profileHeader}>
            <View style={{ position: 'absolute', top: 0, right: 0, zIndex: 999999999 }}>
              <FAB
                style={styles.settingsFab}
                icon="settings"
                onPress={() => setLocation('settings')}
              />
            </View>
            <View
              style={{
                ...styles.settingsFabView,
                ...{ position: 'absolute', top: 0, right: 0, zIndex: 999999999 }
              }}>
              <FAB
                style={styles.addFab}
                icon="add"
                onPress={() => {
                  setLocation('addSkill');
                }}
              />
            </View>
            <Grid>
              <Col size={2}>
                <Image
                  style={styles.imageProfile}
                  source={require('../../assets/images/waycoolercharacter.png')}
                />
                <Text style={styles.characterName}>{character.characterName}</Text>
              </Col>
              <Col size={1}>
                <View style={styles.levelPadding}>
                  <Text style={styles.levelText}>Level 1</Text>
                  <Progress.Bar
                    style={styles.progress}
                    color="#0b0"
                    height={15}
                    progress={0.5}
                  />
                </View>
              </Col>
            </Grid>
          </View>
          <View style={styles.svHeight}>
            <ScrollView>
              {attributeList.map((data, index) => (
                <View key={`${data}-${index}`} style={{ width: 200 }}>
                  <AttributeItem attributeName={data} skills1={skills} />
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      }
    />
  );
};

const AttributeItem = ({ attributeName, skills1 }) => {
  return (
    <View style={styles.skillSec}>
      <View>
        <Text style={styles.attrName}>
          {attributeName.charAt(0).toUpperCase() + attributeName.slice(1)}
        </Text>
      </View>
      <View>
        <AttributeListItem
          skills={
            skills1
              ? skills1
                  .filter(skill => skill && skill.attribute === attributeName)
                  .map(data => ({ name: data.name, level: data.val }))
              : []
          }
        />
      </View>
    </View>
  );
};

const AttributeListItem = ({ skills, levels }) => {
  return skills.map((data, index) => {
    return (
      <View key={`${data}-${index}`} style={styles.skillStyle}>
        <Text style={{ color: '#ffffff' }}>
          {data.name} - {data.level}
        </Text>
        <View>
          <Progress.Bar
            style={styles.progress}
            color="#0b0"
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
    backgroundColor: '#555',
    width: '100%',
    height: '18rem',
    borderBottomWidth: '.125rem',
    borderBottomColor: 'white'
  },
  container: {
    flex: 1
  },
  skillSec: {
    paddingBottom: '1rem'
  },
  imageProfile: {
    marginTop: '3rem',
    width: '10rem',
    height: '10rem',
    resizeMode: 'stretch',
    justifyContent: 'center'
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

  characterName: {
    textAlign: 'center',
    fontSize: '2rem',
    color: 'white',
    marginTop: '.5rem'
  },

  attrName: {
    fontSize: '1.5rem',
    color: 'white',
    marginBottom: '.5rem'
  },

  levelText: {
    fontSize: '1.5rem',
    color: 'white'
  },

  levelPadding: {
    marginTop: '8rem'
  },

  skillStyle: {
    paddingLeft: '1rem',
    paddingBottom: '1rem'
  },

  profileImage: {
    borderRadius: 50,
    width: '6rem',
    height: '6rem',
    marginTop: '3rem',
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
  },

  svHeight: {
    height: '100% - 22.5rem',
    padding: '1rem',
    paddingBottom: 0
  },

  settingsFab: {
    backgroundColor: '#36a',
    color: 'white',
    margin: '1rem',
    marginBottom: 0
  },

  addFab: {
    backgroundColor: '#090',
    color: 'white',
    margin: '1rem'
  },

  settingsFabView: {
    marginRight: '4.5rem'
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
