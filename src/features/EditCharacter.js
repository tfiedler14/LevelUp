import * as React from 'react';
import { useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Image, ScrollView, View, Text, ImageBackground } from 'react-native';
import { Field, initialize, reduxForm } from 'redux-form';
import { WrappedTextInput } from '../shared-components/FormField';
import { setLocation } from '../logic/location/actions';
import { getData } from '../logic/data/actions';
import EStyleSheet from 'react-native-extended-stylesheet';
import {Divider} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Col, Grid } from 'react-native-easy-grid';

export const EditCharacter = ({ getData, setLocation, location, auth }) => {
  /* istanbul ignore next */
  useEffect(() => {
    getData('https://levelup-10cfc.firebaseio.com/users/' + auth.uid + '/quests.json', 'quests');
  }, []);
  return (
    <View style={styles.sectionHeight}>
      <View style={styles.sectionPadding}>
        <Text style={{ textAlign: 'center', fontSize: 26, color: 'white', marginTop: 20 }}>
          {'Edit Character'}
        </Text>
        <Field
          name="name"
          id="name"
          props={{ title: 'State your name peasant' }}
          component={WrappedTextInput}
        />
        <View stlye ={styles.avatarSelect}>      
          <Icon
            name="58820"
            size={48}
            color="white"
          />
          <Image
            style={styles.imageProfile}
            source={require('../../assets/images/waycoolercharacter.png')}
          />
          <Icon
            name="58820"
            size={48}
            color="white"
          />
        </View>
      </View>
    </View>
  );
};

const styles = EStyleSheet.create({
  avatarSelect: {
    flexDirection: 'row'
  },
  nameField: {
    padding: '20rem'
  },
  card: {
    width: '100%',
    height: '5rem',
    color: 'white',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center'
  },
  iconcontainer: {
    paddingLeft: '1rem',
    paddingTop: '40%'
  },
  imageProfile: {
    width: 225,
    height: 225,
    resizeMode: 'stretch'
  },
  sectionHeight: {
    height: '100%',
  },
  sectionPadding: {
    padding: '2rem',
  },

});

const mapDispatchToProps = dispatch => {
  return {
    getData: (data, dataPoint) => {
      dispatch(getData(data, dataPoint));
    },
    setLocation: location => {
        dispatch(setLocation(location));
    }
  };
};

const mapStateToProps = state => {
  return {
    location: state.location,
    auth: state.auth
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

  return errors;
};
export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  reduxForm({ form: 'add-quest-form', validate })
)(EditCharacter);
