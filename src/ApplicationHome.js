import * as React from 'react';
import { useEffect } from 'react';
import { View, ImageBackground, TouchableOpacity } from 'react-native';
import { Button, ThemeProvider } from 'react-native-elements';
import { connect } from 'react-redux';
import { setLocation } from './logic/location/actions';
import EStyleSheet, { absoluteFill } from 'react-native-extended-stylesheet';
import Profile from './features/Profile';
import QuestList from './features/QuestList';
import SignIn from './features/SignIn';
import AddSkill from './features/AddSkill';
import SignUp from './features/SignUp';
import Quest from './features/Quest';
import AddQuest from './features/AddQuest';
import AndroidFonts from './features/AndroidFonts';
import Settings from './features/Settings';
import { Col, Grid } from 'react-native-easy-grid';
import { getData, putData } from './logic/data/actions';
import { auth } from 'firebase';
import CustomButton from './shared-components/CustomButton';
import CalendarPage from './features/CalendarPage';
import { EditCharacter } from './features/EditCharacter';
console.disableYellowBox = true;

export const ApplicationHome = ({ location, setLocation, getData }) => {
  return (
    <ImageBackground
      source={require('../assets/images/darkgradient.jpg')}
      style={{ width: '100%' }}>
      <View>
        {location !== 'signin' && location !== 'signup' && location !== 'androidFonts' && (
          <View style={styles.topNav}>
            <View>
              <Grid>
                <Col size={2}>
                  <View style={{ position: 'absolute', paddingTop: 40, paddingLeft: 25 }}>
                    <CustomButton text="Character" onPress={() => setLocation('profile')} />
                  </View>
                </Col>
                <Col size={2}>
                  <View style={{ position: 'absolute', paddingTop: 40, paddingLeft: 30 }}>
                    <CustomButton text="Quests" onPress={() => setLocation('questlist')} />
                  </View>
                </Col>
                <Col size={2}>
                  <View style={{ position: 'absolute', paddingTop: 40, paddingLeft: 35 }}>
                    <CustomButton text="Calendar" onPress={() => setLocation('calendar')} />
                  </View>
                </Col>
              </Grid>
            </View>
          </View>
        )}

        <View>
          {location === 'profile' && <Profile />}
          {location === 'editcharacter' && <EditCharacter/>}
          {location === 'addquest' && <AddQuest editProp={false} />}
          {location === 'addSkill' && <AddSkill />}
          {location === 'editquest' && <AddQuest editProp={true} />}
          {location === 'quest' && <Quest />}
          {location === 'questlist' && <QuestList />}
          {location === 'signin' && <SignIn />}
          {location === 'signup' && <SignUp />}
          {location === 'settings' && <Settings />}
          {location === 'calendar' && <CalendarPage />}
          {location === 'fonts' && <AndroidFonts />}
        </View>
      </View>
    </ImageBackground>
  );
};

const theme = {
  Button: {
    titleStyle: {
      color: 'white'
    },
    buttonStyle: {
      backgroundColor: 'transparent'
    }
  }
};

const styles = EStyleSheet.create({
  appMargin: {
    margin: '1rem'
  },
  topNav: {
    height: '8%',
    zIndex: 5,
    backgroundColor: 'transparent',
    top: 0,
    left: 0,
    width: '100%'
  },
  bottomNav: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    zIndex: 5,
    justifyContent: 'center'
  },
  profileButton: {
    marginTop: '16rem'
  },
  topPadding: {
    paddingLeft: '2.5rem',
    paddingTop: '2.5rem'
  }
});

const mapStateToProps = state => {
  return {
    location: state.location,
    skills: state.data.skills
  };
};
const mapDispatchToProps = dispatch => {
  return {
    setLocation: location => {
      dispatch(setLocation(location));
    },
    getData: (data, dataPoint) => {
      dispatch(getData(data, dataPoint));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ApplicationHome);
