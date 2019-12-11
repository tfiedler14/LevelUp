import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { View, ImageBackground, StyleSheet, Item, Text } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import EStyleSheet, { value } from 'react-native-extended-stylesheet';
import { setLocation } from '../logic/location/actions';
import { setSkills } from '../logic/data/actions';
import { getData, putData } from '../logic/data/actions';
import { FormHeader } from '../shared-components/FormHeader';
import { Field, getFormValues, initialize, reduxForm } from 'redux-form';
import { compose } from 'redux';
import { WrappedTextInput } from '../shared-components/FormField';
import { Button, Card } from 'react-native-paper';

export const AddSkill = ({ auth, skills, setLocation, location, handleSubmit, putData, setSkills }) => {
  const uid = require('uuid/v4');
  let id = uid();


  return (

    <ImageBackground source={require('../../assets/images/newBackgroundNoPatterndarker.png')} style={{ height: '100%', width: '100%' }}>
      <View>
        <Card style={styles.card}>

          {/* <View style={styles.cardPadding}> */}

          <View style={{ flex: 1, position: 'absolute', top: 0, justifyContent: 'center', alignSelf: 'center', paddingBottom: '0%', paddingTop: '5%' }}>
            <Text style={styles.pickHeader}> Define an attribute for your new skill!</Text>
          </View>

          <View style={{ flex: 1, backgroundColor:'#666', position: 'absolute', top: 70, justifyContent: 'center', alignSelf: 'center',  }} >
            <Field
              name="addSkillAttribute"
              component={attributeDropDown}
              mode="dropdown"
              style={pickerStyles}
            >
            </Field>
          </View>



          <View style={{ flex: 1, position: 'absolute', top: 150, justifyContent: 'center', alignSelf: 'center', width: '80%' }} >
            <View style={{ position: 'relative'}}>
              <Text style={styles.pickHeader}>Name your skill!</Text>
            </View>
            
            <Field
                name="addSkillName"
                id="addSkillName"
                props={{
                  textContentType: 'string',
                }}
                component={WrappedTextInput}
              />
          </View>

          {/* </View> */}
          
          <View style={{ flex: 1, position: 'absolute', top: 400, justifyContent: 'center', alignSelf: 'center', width: '80%' }} >
            <Button
              color="#fff"
              mode="contained"
              title="Save Skill"
              onPress={handleSubmit(values => {
                if (values.addSkillAttribute !== null && values.addSkillName !== null) {
                  let toInsert = {};
                  toInsert["attribute"] = values.addSkillAttribute;
                  toInsert["name"] = values.addSkillName;
                  toInsert["val"] = 1;
                  toInsert["xp"] = 0;
                  toInsert["xpToNext"] = 50;

                  putData('https://levelup-10cfc.firebaseio.com/users/' + auth.uid + '/skills.json', [...skills, toInsert], 'profile', 'profile');
                } else {
                  alert("Attribute and Name must be defined");
                }
              })}>Save Skill</Button>

          </View>

        </Card>


      </View>
    </ImageBackground >
  );
};



const attributeDropDown = ({ input: { onChange, value, ...inputProps }, children, ...pickerProps }) => (
  <RNPickerSelect
    onValueChange={value => onChange(value)}
    useNativeAndroidPickerStyle={true}
    returnKeyType="next"
    enablesReturnKeyAutomatically
    items={[
      { label: 'academics', value: 'academics' },
      { label: 'crafts', value: 'crafts' },
      { label: 'mental', value: 'mental' },
      { label: 'fitness', value: 'fitness' },
      { label: 'community', value: 'community' },
      { label: 'hobby', value: 'hobby' },
    ]}

  >

  </RNPickerSelect>
);
const pickerStyles = StyleSheet.create({
  inputIOS: {
    color: 'white',
    fontSize: 22,
    paddingTop: 8,
    paddingHorizontal: 10,
    paddingBottom: 0,
    borderColor: 'white',
    borderRadius: 4,
    borderWidth: 2,
  },

});

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
  card: {
    padding: '1rem',
    margin: '1rem',
    color: 'white',
    backgroundColor: '#555',
    flex: 1, 
    flexDirection: 'column', 
    width: '95%'
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
    // padding: '1rem',
    // margin: '1rem'
  },
  pickHeader: {
    justifyContent: 'center',
    alignSelf:'flex-start',
    position: 'relative',
    fontSize: '1rem',
    color: 'white',
    fontFamily: 'inconsolata'
  }
});

const mapStateToProps = state => {
  return {
    skills: state.data.skills,
    quests: state.data.quests,
    location: state.location,
    auth: state.auth,
    values: getFormValues('addSkills-form')(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    putData: (path, data, redirect) => {
      dispatch(putData(path, data, redirect));
    },
    getData: (data, dataPoint) => {
      dispatch(getData(data, dataPoint));
    },
    setLocation: location => {
      dispatch(setLocation(location));
    },
    setSkills: skills => {
      dispatch(setSkills(skills));
    }
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  reduxForm({ form: 'addSkills-form' })
)(AddSkill);
