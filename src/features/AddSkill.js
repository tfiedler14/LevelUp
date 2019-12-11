import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { View, ImageBackground, StyleSheet, Item, ScrollView } from 'react-native';
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
      <View style={styles.sectionHeight}>
        <ScrollView>
          <Card style={styles.card}>
            <FormHeader title={'Add Skill'} />
            <Field
              name="addSkillAttribute"
              component={attributeDropDown}
              mode="dropdown"
            />
            
            <Field
              name="addSkillName"
              id="addSkillName"
              props={{ title: 'Skill Name' }}
              component={WrappedTextInput}
            />



            <Button
              color="#064f2f"
              uppercase={false}
              mode="contained"
              style={styles.buttons}
              onPress={handleSubmit(values => {
                console.log(values.addSkillAttribute, values.addSkillName);
                if (values.addSkillAttribute !== undefined && values.addSkillName !== undefined) {
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
              })}>
                Save Skill
            </Button>

            <Button
              color="#4f0617"
              uppercase={false}
              mode="contained"
              style={styles.buttons}
              onPress={() => setLocation('profile')}>
                Cancel
            </Button>
          </Card>
        </ScrollView>
      </View>
    </ImageBackground >
  );
};



const attributeDropDown = ({ input: { onChange}}) => (
  <RNPickerSelect
    onValueChange={value => onChange(value)}
    useNativeAndroidPickerStyle={false}
    returnKeyType="next"
    enablesReturnKeyAutomatically
    style={{...pickerStyles,
    iconContainer: {
      top: 10,
      right: 12,
    }}}
    placeholder={{
      label: 'Select an Attribute...',
      color: 'white'
    }}
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
    paddingBottom: 8,
    borderColor: '#6e6e6e',
    borderRadius: 4,
    borderWidth: 2,
    marginBottom: 10,
    width: '90%',
    alignSelf: 'center'
  },
  inputAndriod: {
    color: 'white',
    fontSize: 22,
    paddingTop: 8,
    paddingHorizontal: 10,
    paddingBottom: 8,
    borderColor: '#6e6e6e',
    borderRadius: 4,
    borderWidth: 2,
    marginBottom: 10,
    width: '90%',
    alignSelf: 'center'
  }

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
    width: '95%',
    alignSelf: 'center'
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
    marginBottom: '.5rem',
    marginTop: '.5 rem'
  },
  topPadding: {
    paddingLeft: '2.5rem',
    paddingTop: '2.5rem'
  },
  pickHeader: {
    justifyContent: 'center',
    alignSelf: 'flex-start',
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
