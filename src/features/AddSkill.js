import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Image, ScrollView, View, Text, Button, TouchableHighlight } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { setLocation } from '../logic/location/actions';
import { getData, putData } from '../logic/data/actions';
import Icon from 'react-native-vector-icons/MaterialIcons';




export const AddSkill = ({ skills }) => {

  console.log("made it to addSkill const");

  return (


    <View style={{}}>
      <View>
        <View>
          <View style={{ position: 'absolute', alignSelf: 'flex-end', flex: 0 }}>
            <Icon
              style={styles.padding}
              name="settings-applications"
              size={48}
              color="white"
              onPress={() => setLocation('settings')}
            />
          </View>

          <View style={{ flex: 1, alignItems: 'center', paddingTop: 30 }}>
            <Text style={{ color: '#ffffff', fontSize: 17 }}>Associate New Skill with an Attribute</Text>
          </View>

        </View>

      </View>


    </View>

  );
};



const styles = EStyleSheet.create({

  container: {
    flex: 1
  },
  addBorder: {
    width: 225,
    height: 225,
    resizeMode: "stretch",
    // Set border width.
    borderWidth: 2,
    // Set border color.
    borderColor: 'white',
  },

  padding: {
    paddingTop: '2rem',
    paddingRight: '1rem',
    paddingBottom: '2rem',
    paddingLeft: '1rem'
  },
  infoMargin: {
    marginTop: '1rem'
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
    quests: state.data.quests

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
)(AddSkill);