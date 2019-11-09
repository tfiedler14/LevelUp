import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Image, ScrollView, View, Text, Button, TouchableHighlight } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { setLocation } from '../logic/location/actions';
import { getData, putData } from '../logic/data/actions';
import { setLoading } from '../logic/loading/actions';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Progress from 'react-native-progress';
import { Divider } from 'react-native-elements';
import Async from '../shared-components/Async';

export const Profile = ({
  getData,
  setLocation,
  skills,
  location,
  loading,
  auth,
  setLoading,
  profile
}) => {
  useEffect(() => {
    getData('https://levelup-10cfc.firebaseio.com/users/' + auth.uid + '/skills.json', 'skills');
    getData(
      'https://levelup-10cfc.firebaseio.com/users/' + auth.uid + '/attributes.json',
      'attributes'
    );
    getData('https://levelup-10cfc.firebaseio.com/users/' + auth.uid + '/profile.json', 'profile');
    setLoading(true);
  }, []);

  return (
    <Async
      render={
        <View>
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
                <Text style={{ textAlign: 'center', fontSize: 26, color: 'white', marginTop: 20 }}>
                  Tom
                </Text>
              </View>
              <View style={{ flex: 1, alignItems: 'center', paddingTop: 20 }}>
                <Image
                  style={styles.addBorder}
                  source={require('../../assets/images/girlwhiteorange.png')}
                />
                <View style={{ paddingTop: 15 }}>
                  <Progress.Bar
                    style={styles.progress}
                    color="#55db37"
                    height={15}
                    progress={0.5}
                  />
                </View>
              </View>
              <View style={{ paddingTop: 280 }}>
                <Divider style={{ backgroundColor: 'white', height: 2 }} />
              </View>
            </View>
          </View>
          {console.log('Profile: ', profile)}
          <View style={styles.skillSec}>
            <Text style={{ color: '#ffffff', fontSize: 17 }}>Academics</Text>
            <AttributeListItem
              skills={(skills || [])
                .filter(skill => skill.attribute === 'academics')
                .map(data => ({ name: data.name, level: data.val }))}
            />
          </View>
          <View style={styles.skillSec}>
            <Text style={{ color: '#ffffff', fontSize: 17 }}>Crafts</Text>
            <AttributeListItem
              skills={skills
                .filter(skill => skill.attribute === 'crafts')
                .map(data => ({ name: data.name, level: data.val }))}
            />
          </View>
          <View style={styles.skillSec}>
            <Text style={{ color: '#ffffff', fontSize: 17 }}>Mental</Text>
            <AttributeListItem
              skills={skills
                .filter(skill => skill.attribute === 'mental')
                .map(data => ({ name: data.name, level: data.val }))}
            />
          </View>
          <View style={styles.skillSec}>
            <Text style={{ color: '#ffffff', fontSize: 17 }}>Fitness</Text>
            <AttributeListItem
              skills={skills
                .filter(skill => skill.attribute === 'fitness')
                .map(data => ({ name: data.name, level: data.val }))}
            />
          </View>
          <View style={styles.skillSec}>
            <Text style={{ color: '#ffffff', fontSize: 17 }}>Community</Text>
            <AttributeListItem
              skills={skills
                .filter(skill => skill.attribute === 'community')
                .map(data => ({ name: data.name, level: data.val }))}
            />
          </View>
          <View style={styles.skillSec}>
            <Text style={{ color: '#ffffff', fontSize: 17 }}>Hobby</Text>
            <AttributeListItem
              skills={skills
                .filter(skill => skill.attribute === 'hobby')
                .map(data => ({ name: data.name, level: data.val }))}
            />
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignSelf: 'flex-end',
              position: 'absolute',
              botton: '0'
            }} />
        </View>
      }
    />
  );
};

const AttributeListItem = ({ skills, levels }) => {
  return skills.map(data => {
    return (
      <View style={{ marginLeft: 45 }} key={data}>
        <Text style={{ color: '#ffffff' }}>
          {data.name} -{data.level}
        </Text>
        <View>
          <Progress.Bar
            style={styles.progress}
            color="#55db37"
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
  addBorder: {
    width: 225,
    height: 225,
    resizeMode: 'stretch',
    // Set border width.
    borderWidth: 2,
    // Set border color.
    borderColor: 'white'
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
    profile: state.profile
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
