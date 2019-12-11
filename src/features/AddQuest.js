import { Field, initialize, reduxForm } from 'redux-form';
import { WrappedTextInput } from '../shared-components/FormField';
import * as React from 'react';
import { useEffect, useState } from 'react';
import EStyleSheet, { value } from 'react-native-extended-stylesheet';
import { getData, putData } from '../logic/data/actions';
import { setLocation } from '../logic/location/actions';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { FormHeader } from '../shared-components/FormHeader';
import { Button, Card } from 'react-native-paper';
import { ScrollView, View, ImageBackground, StyleSheet, Text } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import moment from "moment";
import DatePicker from 'react-native-datepicker';


export const AddQuest = ({
  editProp,
  getData,
  putData,
  setLocation,
  auth,
  handleSubmit,
  profile,
  quest,
  quests,
  skills
}) => {
  const uid = require('uuid/v4');
  let id = uid();
  
  pickedDate = null;

  const [initialized, setInitialized] = useState(false);
  /* istanbul ignore next*/
  useEffect(() => {
    if (!initialized) {
      initialize(editProp ? profile.quest : {});
      setInitialized(true);
    }
  });
  return (
    <ImageBackground
      source={require('../../assets/images/newBackgroundNoPatterndarker.png')}
      style={{ height: '100%', width: '100%' }}>
      <View style={styles.sectionHeight}>
        <ScrollView>
          <Card style={styles.card}>
            <FormHeader title={editProp ? 'Edit quest' : 'Add quest'} />
            <Field name="name" id="name" props={{ title: 'Name' }} component={WrappedTextInput} />
            <Field
              name="description"
              id="description"
              props={{ title: 'Description' }}
              component={WrappedTextInput}
            />
            <Text style={{color: 'white'}}>Duration</Text>
             <Field
              name="finishDate"
              id="finishDate"
              component={timeDropDown}
              props={{ title: 'Time' }}
              mode="datetime"
            />

            <Field
              name="difficulty"
              id="difficulty"
              component={difficultDropDown}
              props={{ title: 'Difficulty' }}
              mode="dropdown"
            />

           
            <Field
              name="skill"
              id='skill'
              component={skillDropDown}
              props={{ title: 'Skill', skills: skills}}
              mode="dropdown"
            />

            <Button
              color="#fff600"
              uppercase={false}
              mode="contained"
              style={styles.buttons}
              onPress={handleSubmit(values => {
                let toInsert = { ...values, finishDate: 'incomplete', expVal: 0 };
                if (quests === []) {
                  let newQuests = [];
                  newQuests[0] = toInsert;
                  putData(
                    'https://levelup-10cfc.firebaseio.com/users/' + auth.uid + '/quests' +

                    '.json',
                    newQuests,
                    'questlist'
                  );
                } else
                  if (editProp) {
                    let newQuests = [...quests];
                    newQuests[quest.id] = toInsert;
                    putData(
                      'https://levelup-10cfc.firebaseio.com/users/' + auth.uid + '/quests' +

                      '.json',
                      newQuests,
                      'questlist'
                    );
                  } else {
                    values.name &&
                      putData(
                        'https://levelup-10cfc.firebaseio.com/users/' + auth.uid + '/quests' +

                        '.json',
                        [...quests, toInsert],
                        'questlist'
                      );
                  }
              })}>
              {editProp ? 'Edit quest' : 'Add quest'}
            </Button>

            <Button
              color="#ff005c"
              uppercase={false}
              mode="contained"
              style={styles.buttons}
              onPress={() => setLocation('questlist')}>
              Cancel
            </Button>
          </Card>
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

const difficultDropDown = ({ input: { onChange } }) => (
  <RNPickerSelect
    onValueChange={value => onChange(value)}
    useNativeAndroidPickerStyle={false}
    returnKeyType="next"
    enablesReturnKeyAutomatically
    style={{
      ...pickerStyles,
      iconContainer: {
        top: 10,
        right: 12,
      }
    }}
    placeholder={{
      label: 'Select a Difficulty...',
      color: 'white'
    }}
    items={[
      { label: 'hard', value: 'hard' },
      { label: 'medium', value: 'medium' },
      { label: 'easy', value: 'easy' },
    ]}

  >

  </RNPickerSelect>
);


const timeDropDown = ({ input: { onChange } }) => (
  <DatePicker
    date={getDate()}
    mode="date"
    placeholder="When will you finish?"
    format="MM-DD-YYYY"
    minDate={getDate()}
    maxDate="12-31-2025"
    confirmBtnText="Confirm"
    cancelBtnText="Cancel"
    style={{width: '100%', marginTop:8, marginBottom:8 }}
    customStyles={{
      dateInput: {
        marginLeft: 36,
        colors: 'white',
        backgroundColor: '#666',
      },
      dateText: {
        color: 'white',
        fontWeight: "bold"
      }
    }}
    onDateChange={(date) => onChange(date)}
    onValueChange={(value) => onChange(value)} />
);

const skillDropDown = ({input:{onChange}, skills}) => (
  pickItems= [],
  skills.map(skill=>{
    console.log("iteration", skill)
    if(skill !== 'empty' && skill !== undefined && skill !== null){
      console.log("passed check.", skill.name)
      pickItems.push({label: skill.name, value: skill.name})
    }
  }),

  <RNPickerSelect
    onValueChange={value => onChange(value)}
    useNativeAndroidPickerStyle={false}
    returnKeyType="next"
    enablesReturnKeyAutomatically
    style={{
      ...pickerStyles,
      iconContainer: {
        top: 10,
        right: 12,
      }
    }}
    placeholder={{
      label: 'Select a Skill...',
      color: 'white'
    }}
    items={
      pickItems
    }

  >

  </RNPickerSelect>
);

const getDate = (givenDate) => {
  return moment(givenDate).format('L');
};



const pickerStyles = StyleSheet.create({
  inputIOS: {
    color: 'white',
    fontSize: 22,
    paddingTop: 8,
    paddingHorizontal: 10,
    paddingBottom: 8,
    borderColor: '#6e6e6e',
    backgroundColor: '#666',
    borderRadius: 4,
    borderWidth: 2,
    marginTop: 10,
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
  sectionHeight: {
    height: '100% - 6rem'
  },

  card: {
    padding: '1rem',
    margin: '1rem',
    color: 'white',
    backgroundColor: '#555'
    //  border: 'none',
  },

  buttons: {
    marginTop: '1rem',
    marginLeft: '2rem',
    marginRight: '2rem'
  }
});

export const mapStateToProps = (state, { editProp }) => {
  console.log("state", state)
  return {
    auth: state.auth,
    quests: state.data.quests,
    profile: state.data.profile,
    quest: state.data.quest,
    skills: state.data.skills,
    initialValues: editProp
      ? state.data.quest
      : {}
  };
};

export const mapDispatchToProps = dispatch => {
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
    initialize: values => {
      dispatch(initialize('add-quest-form', values));
    }
  };
};

export const validate = values => {
  const errors = {};
  console.log("LOOK FOR SKILLS", values)
  if (!values.name) {
    errors.name = 'Required';
  } else if (values.name.length > 20) {
    errors.name = 'Must be twenty characters or less';
  }

  if (!values.description) {
    errors.description = 'Required';
  } else if (values.description.length > 500) {
    errors.description = 'Must be 500 characters or less';
  }
   if(!values.skill || values.skill === null){
    errors.skill = 'A quest is required to have a skill';
   }

  return errors;
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  reduxForm({ form: 'add-quest-form', validate })
)(AddQuest);
