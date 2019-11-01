import * as React from 'react';
import { useEffect } from 'react';
import { Platform, Text, Image, View, TouchableOpacity, StatusBar } from 'react-native';
import { Button, ThemeProvider } from 'react-native-elements';
import { connect } from 'react-redux';
import { setLocation } from './logic/location/actions';
import EStyleSheet, { absoluteFill } from 'react-native-extended-stylesheet';
import Profile from './features/Profile';
import HouseList from './features/QuestList';
import SignIn from './features/SignIn';
import SignUp from './features/SignUp';
import Quest from './features/Quest';
import AddQuest from './features/AddQuest';
import Settings from './features/Settings';
import { Col, Grid } from 'react-native-easy-grid';
import { getData, putData } from './logic/data/actions';

export const ApplicationHome = ({ location,  setLocation, getData}) => {

  useEffect(() => {
    getData('https://levelup-10cfc.firebaseio.com/users/9dyqQWyX3lPtybCuF7OZCgMYbOa2' + '.json', 'user');
    

  }, []);
  
  return (
    <View>
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
                title="Map"
                onPress={() => setLocation('profile')}
              />
              </ThemeProvider>
              </View>
            </Col>
          </Grid>
        </View>
      </View>
      
    
        <View>
        {location === 'profile' && <Profile />}
        {location === 'addquest' && <AddQuest editProp={false} />}
        {location === 'editquest' && <AddQuest editProp={true} />}
        {location === 'quest' && <Quest />}
        {location === 'home' && <HouseList />}
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
      color: 'black'
    },
    buttonStyle: {
      backgroundColor: 'white'
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
    backgroundColor: 'white',
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
    
  };
};
const mapDispatchToProps = dispatch => {
  return {
    setLocation: location => {
      dispatch(setLocation(location));
    },
    getData: (data, dataPoint) => {
      dispatch(getData(data, dataPoint));
    },    
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ApplicationHome);
