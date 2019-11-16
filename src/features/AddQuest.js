import { Field, initialize, reduxForm } from 'redux-form';
import { WrappedTextInput } from '../shared-components/FormField';
import * as React from 'react';
import { useEffect, useState } from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import { getData, putData } from '../logic/data/actions';
import { setLocation } from '../logic/location/actions';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { FormHeader } from '../shared-components/FormHeader';
import { Button, Card } from 'react-native-paper';
import { ScrollView, View } from 'react-native';

export const AddQuest = ({
  editProp,
  getData,
  putData,
  setLocation,
  auth,
  handleSubmit,
  profile,
  quest,
  quests
}) => {
  const uid = require('uuid/v4');
  let id = uid();

  const [initialized, setInitialized] = useState(false);
  /* istanbul ignore next*/
  useEffect(() => {
    if (!initialized) {
      initialize(editProp ? profile.quest : {});
      setInitialized(true);
    }
  });

  return (
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
          <Field
            name="expVal"
            id="expVal"
            props={{ title: 'XP' }}
            component={WrappedTextInput}
          />
          <Field
            name="skill"
            id="skill"
            props={{ title: 'Skill' }}
            component={WrappedTextInput}
          />
          
          
  
          <Button
            color="#064f2f"
            uppercase={false}
            mode="contained"
            style={styles.buttons}
            onPress={handleSubmit(values => {
             if(editProp){
              var newQuests = [...quests];
              newQuests[quest.id] = values; 
              putData(
                'https://levelup-10cfc.firebaseio.com/users/9dyqQWyX3lPtybCuF7OZCgMYbOa2/quests' +
                  
                  '.json',
                newQuests,
                'questlist'
              );
             } else{
              values.name &&
                putData(
                  'https://levelup-10cfc.firebaseio.com/users/9dyqQWyX3lPtybCuF7OZCgMYbOa2/quests' +
                    
                    '.json',
                  [...quests, values],
                  'questlist'
                );
            }})}>
            {editProp ? 'Edit quest' : 'Add quest'}
          </Button>
        </Card>
      </ScrollView>
    </View>
  );
};

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
  return {
    auth: state.auth,
    quests: state.data.quests,
    profile: state.data.profile,
    quest: state.data.quest,
    initialValues: editProp
      ? state.data.quest
      : { }
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

  /*if (!values.address) {
    errors.address = 'Required';
  } else if (values.address.length > 50) {
    errors.address = 'Must be less than 50 characters';
  }

  if (!values.city) {
    errors.city = 'Required';
  } else if (values.city.length > 50) {
    errors.city = 'Must be less than 50 characters';
  }

  if (!values.zip) {
    errors.zip = 'Required';
  } else if (!/^[0-9]{5}$/.test(values.zip)) {
    errors.zip = 'Must be 5 digits';
  }

  if (!values.availability) {
    errors.availability = 'Required';
  } else if (values.availability.length > 50) {
    errors.availability = 'Must be less than 50 characters';
  }

  if (!values.rent) {
    errors.rent = 'Required';
  } else if (parseInt(values.rent, 10) < 200 || parseInt(values.rent, 10) > 10000) {
    errors.rent = 'Must be 200-10000';
  } else if (isNaN(values.rent)) {
    errors.rent = 'Must be a number';
  }*/

  return errors;
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  reduxForm({ form: 'add-quest-form', validate })
)(AddQuest);
