import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Image, ScrollView, View, Text } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { setLocation } from '../logic/location/actions';
import { getData, putData } from '../logic/data/actions';
import { Button, Card } from 'react-native-paper';

export const Profile = ({ profile, putData, getData, auth, quests }) => {
  /* useEffect(() => {
    getData('https://roommate-finder-afd9b.firebaseio.com/users/' + auth.uid + '.json', 'profile');
  }, []); */

  return (
    <>
      {auth.loggedIn ? (
        <View style={{ height: '100%' }}>
          <View size={3} style={styles.profileHeader}>
            <View style={styles.profileWrapper}>
              <Image
                style={styles.profileImage}
                source={{uri: (profile.profile && profile.profile.image)}}
              />
              <View style={styles.infoMargin}>
                <Text style={styles.mainInfo}>{profile.profile && profile.profile.name}</Text>
              </View>
              <Text style={styles.secondaryInfo}>
                Age: {profile.profile && profile.profile.age} | Gender:{' '}
                {profile.profile && profile.profile.gender}
              </Text>
            </View>
          </View>
        </View>
      ) : (
        <View>
          <Card style={styles.cardPadding}>
            <Text>Log in on the settings page to view your profile.</Text>
          </Card>
        </View>
      )}
    </>
  );
};

const styles = EStyleSheet.create({
  profileHeader: {
    backgroundColor: '#0a6e44',
    width: '100%',
    height: '12rem',
    zIndex: 4
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
    // fontFamily: 'sans-serif',
  },

  secondaryInfo: {
    color: 'white',
    fontWeight: '300',
    margin: 'auto',
    fontSize: '1rem'
    // fontFamily: 'sans-serif',
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

  cardPadding: {
    padding: '1rem',
    margin: '1rem'
  }
});

const mapStateToProps = state => {
  return {
    profile: state.data.profile,
    auth: state.auth,
    houses: state.data.houses
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
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
