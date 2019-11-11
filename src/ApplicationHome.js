import * as React from 'react';
import { useEffect } from 'react';
import { Platform, Text, Image, View, TouchableOpacity, StatusBar } from 'react-native';
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

import Settings from './features/Settings';
import { Col, Grid } from 'react-native-easy-grid';
import { getData, putData } from './logic/data/actions';
import { auth } from 'firebase';
console.disableYellowBox = true;

export const ApplicationHome = ({ location, setLocation, getData }) => {
  return (
    <View>
      {location != 'signin' &&
        <View style={styles.topNav}>
          <View>
            <Grid>
              <Col size={2}>
                <View style={{ position: 'absolute' }}>
                  <ThemeProvider theme={theme}>
                    <Button
                      style={styles.topPadding}
                      title="Character"
                      onPress={() => setLocation('profile')}
                    />
                  </ThemeProvider>
                </View>
              </Col>
              <Col size={2}>
                <View style={{ position: 'absolute' }}>
                  <ThemeProvider theme={theme}>
                    <Button
                      style={styles.topPadding}
                      title="Quests"
                      onPress={() => setLocation('quest')}
                    />
                  </ThemeProvider>
                </View>
              </Col>
              <Col size={2}>
                <View style={{ position: 'absolute' }}>
                  <ThemeProvider theme={theme}>
                    <Button
                      style={styles.topPadding}
                      title="Map"
                      onPress={() => setLocation('home')}
                    />
                  </ThemeProvider>
                </View>
              </Col>
            </Grid>
          </View>
        </View>}

        <View>
          {location === 'profile' && <Profile />}
          {location === 'addquest' && <AddQuest editProp={false} />}
          {location === 'addSkill' && <AddSkill />}
          {location === 'editquest' && <AddQuest editProp={true} />}
          {location === 'quest' && <Quest />}
          {location === 'home' && <QuestList />}
          {location === 'signin' && <SignIn />}
          {location === 'signup' && <SignUp />}
          {location === 'settings' && <Settings />}
        </View>
    </View>
  );
};

const theme = {
  Button: {
    titleStyle: {
      color: 'white'
    },
    buttonStyle: {
      backgroundColor: 'black'
    }
  }
};

const styles = EStyleSheet.create({
  appMargin: {
    margin: '1rem'
  },
  topNav: {
    height: '6rem',
    zIndex: 5,
    backgroundColor: 'black',
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
