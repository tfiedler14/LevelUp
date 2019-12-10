import * as React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, Item, Picker } from 'react-native';
import EStyleSheet, { value } from 'react-native-extended-stylesheet';
import { setLocation } from '../logic/location/actions';
import { setSkills } from '../logic/data/actions';
import { getData, putData } from '../logic/data/actions';
import { FormHeader } from '../shared-components/FormHeader';
import { Field, getFormValues, reduxForm } from 'redux-form';
import { compose } from 'redux';
import { WrappedTextInput } from '../shared-components/FormField';
import { Button, Card } from 'react-native-paper';
import { Dropdown } from '../shared-components/Dropdown';

export const AddSkill = ({
  auth,
  skills,
  setLocation,
  location,
  handleSubmit,
  putData,
  setSkills
}) => {
  const uid = require('uuid/v4');
  let id = uid();

  return (
    <View style={styles.viewPadding}>
      <Card style={styles.cardPadding}>
        <FormHeader
          title={"Define skill's attribute:"}
          style={{ fontSize: 24, paddingBottom: '8', alignSelf: 'center' }}
        />
        <Field
          name="chooseAttribute"
          id="chooseAttribute"
          props={{
            title: 'Attribute',
            options: [
              { label: 'Academics', value: 'academics' },
              { label: 'Crafts', value: 'crafts' },
              { label: 'Mental', value: 'mental' },
              { label: 'Fitness', value: 'fitness' },
              { label: 'Community', value: 'community' },
              { label: 'Hobby', value: 'hobby' }
            ]
          }}
          component={Dropdown}
        />
        <Field
          name="addSkillName"
          id="addSkillName"
          props={{
            title: 'Skill Name',
            textContentType: 'none'
          }}
          component={WrappedTextInput}
        />
        <View style={styles.buttons}>
          <Button
            color="#ff0066"
            mode="contained"
            uppercase={false}
            onPress={handleSubmit(values => {
              if (values.addSkillAttribute !== null && values.addSkillName !== null) {
                let toInsert = {};
                toInsert['attribute'] = values.chooseAttribute;
                toInsert['name'] = values.addSkillName;
                toInsert['val'] = 1;
                toInsert['xp'] = 0;
                toInsert['xpToNext'] = 50;
                console.log('VALUES: ', values);
                putData(
                  'https://levelup-10cfc.firebaseio.com/users/' + auth.uid + '/skills.json',
                  [...skills, toInsert],
                  'profile',
                  'profile'
                );
              } else {
                alert('Attribute and Name must be defined');
              }
            })}>
            Save Skill
          </Button>
        </View>
      </Card>
    </View>
  );
};

const handleAddSkill = (auth, sID, skills, values, putData, setSkills) => {
  let toInsert = {};
  if (values.addSkillAttribute !== undefined && values.addSkillName !== undefined) {
    toInsert['attribute'] = values.addSkillAttribute;
    toInsert['name'] = values.addSkillName;
    toInsert['val'] = 0;

    // skills.push({ [sID]: toInsert });

    setSkills(skills);

    putData(
      'https://levelup-10cfc.firebaseio.com/users/' + auth.uid + '/skills.json',
      [...skills, toInsert],
      'profile',
      'profile'
    );
  } else {
    alert('Must add attribute and name');
  }
};

const placeHolder = {
  label: 'Select an Attribute for new skill'
};

const attributeDropDown = ({
  input: { onChange, value, ...inputProps },
  children,
  ...pickerProps
}) => (
  <Picker
    itemStyle={{ color: 'white', fontSize: 16 }}
    selectedValue={value}
    onValueChange={value => onChange(value)}
    {...inputProps}
    {...pickerProps}>
    {children}
  </Picker>
);
const pickerStyles = StyleSheet.create({
  inputIOS: {
    color: 'white',
    fontSize: 22,
    paddingTop: 8,
    paddingHorizontal: 10,
    paddingBottom: 15
  }
});

const styles = EStyleSheet.create({
  container: {
    flex: 1
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
    height: '100% - 4.5rem',
    margin: '1rem'
  },

  sectionHeight: {
    height: '100% - 18rem'
  },

  buttons: {
    marginTop: '1rem',
    marginLeft: '2rem',
    marginRight: '2rem'
  },

  topPadding: {
    paddingLeft: '2.5rem',
    paddingTop: '2.5rem'
  },

  cardPadding: {
    padding: '1rem',
    backgroundColor: '#555'
  }
});

const mapStateToProps = state => {
  return {
    skills: state.data.skills,
    quests: state.data.quests,
    location: state.location,
    auth: state.auth,
    initialValues: {
      chooseAttribute: 'academics'
    }
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
    mapDispatchToProps
  ),
  reduxForm({ form: 'addSkills-form' })
)(AddSkill);
