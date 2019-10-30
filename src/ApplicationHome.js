import * as React from 'react';
import { Text, Image, View, TouchableOpacity, ScrollView} from 'react-native';
import {Button, ThemeProvider} from 'react-native-elements';
import { connect } from 'react-redux';
import { setLocation } from './logic/location/actions';
import EStyleSheet, { absoluteFill } from 'react-native-extended-stylesheet';
import Profile from './features/Profile';
import HouseList from './features/QuestList';
import SignIn from './features/SignIn';
import SignUp from './features/SignUp';
import Quest from './features/Quest';
import AddQuest from './features/AddQuest';
import { Col, Grid } from 'react-native-easy-grid';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Settings from './features/Settings';
//import Char from '../assets/images/char.png';

export const ApplicationHome = ({ location, setLocation }) => {
  return (
    <View>
      <View style={styles.topNav}>
       <Grid>
          <Col size={2}>
              <View style={{ position: 'absolute', alignSelf: 'flex-end' }}>
                <Icon
                  style={styles.padding}
                  name="settings-applications"
                  size={48}
                  color="white"
                  onPress={() => setLocation('settings')}
                />
              </View>
            </Col>
          </Grid>
      </View>
    <ScrollView>
      <View style={styles.body}>
        <View style={styles.bodyTop}>
          <View style={styles.leftCol}>
            <Text>Test1</Text>
          </View>
          <View style={styles.rightCol}>
            <Text>Test2</Text>
          </View>
        </View>
        <View style={styles.bodyBottom}>
          <View style={styles.leftCol}>
            <Text>Test3</Text>
          </View>
          <View style={styles.rightCol}>
            <Text>Test4</Text>
          </View>
        </View>  
      </View>
    </ScrollView>
      <View style={styles.bottomNav}>
        <View>
          <Grid>
            <Col size={3}>
              <View style={{ position: 'absolute' }}>
              <ThemeProvider theme={theme}>
              <Button 
                  title="Character"
                  style={styles.padding}
                  onPress={() => setLocation('profile')}
                /> 
                </ThemeProvider>
              </View>
            </Col>
            <Col size={3}>
              <View style={{ position: 'absolute' }}>
              <ThemeProvider theme={theme}>
              <Button
                  title="Quest"
                  style={styles.padding}
                  onPress={() => setLocation('profile')}
                />
                </ThemeProvider>
              </View>
            </Col>
            <Col size={3}>
              <View style={{ position: 'absolute' }}>
              <ThemeProvider theme={theme}>
              <Button 
                  title="Map"
                  style={styles.padding}
                  onPress={() => setLocation('home')}
                />
                </ThemeProvider>
              </View>
            </Col>
          </Grid>
        </View>
      </View>  
      <View>
        {location === 'profile' && <Profile />}
        {location === 'addquest' && <AddQuest editProp={false}/>}
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
  body: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    alignItems: 'flex-start', // if you want to fill rows left to right
  },
  bodyTop: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  bodyBottom: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  leftCol: {
    width: '70%',

  },
  rightCol: {
    width: '30%',
  },
  header: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: '1.5rem',
    //fontFamily: 'sans-serif',
    marginTop: '2.5rem',
    marginLeft: '1rem'
  },

  topNav: {
    height: '2rem',
    backgroundColor: 'transparent',
    top: 0,
    right: 0,
    width: '100%'
  },

  bottomNav: {
    height: '2rem',
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%'
  },

  profileButton: {
    marginTop: '16rem'
  },

  padding: {
    paddingTop: '2rem',
    paddingRight: '1rem',
    paddingBottom: '2rem',
    paddingLeft: '1rem'
  }
});

const mapStateToProps = state => {
  return {
    location: state.location
  };
};
const mapDispatchToProps = dispatch => {
  return {
    setLocation: location => {
      dispatch(setLocation(location));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ApplicationHome);
