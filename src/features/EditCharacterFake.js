import * as React from 'react';
import { useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Image, ScrollView, View, Text, ImageBackground, Button } from 'react-native';
import { Field, initialize, getFormValues, reduxForm  } from 'redux-form';
import { WrappedTextInput } from '../shared-components/FormField';
import { setLocation} from '../logic/location/actions';
import { getData, putData} from '../logic/data/actions';
import { setLoading } from '../logic/loading/actions';
import EStyleSheet from 'react-native-extended-stylesheet';
import {Divider} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Col, Grid } from 'react-native-easy-grid';
import { NUM_AVATARS } from '../../Const';
import {avatars} from '../../Const';

export const EditCharacterFake = ({ getData, setLocation, character, location, putData, auth }) => {
  console.log(JSON.stringify(character));
  var avatarString = (('../../assets/images/waycoolercharacter1.png'));
  console.log(avatarString)

  return (
    <View style={styles.sectionHeight}>
      <View style={styles.nameField}>
        <Text style={styles.title}>
          {'Edit Character'}
        </Text>
      </View>

      <Field
        name="characterName"
        id="characterName"
        props={{ title: 'Character Name' }}
        component={WrappedTextInput}
      />

      <Grid style={styles.avatarSelect}>
        <Col style ={styles.arrows}>
          <View>
            <Icon style={{paddingRight:10}}
              name="arrow-back"
              size={48}
              color="white"

            />
          </View>
        </Col>
        <Col style={styles.avatar}>
          <Image
            style={styles.imageProfile}
            source={{}}
          />
        </Col>
        <Col style ={styles.arrows}>
          <View>
            <Icon style={{paddingLeft:10}}
              name="arrow-forward"
              size={48}
              color="white"



            />
          </View>
        </Col>
      </Grid>

      <Grid>
        <Col style = {styles.buttons}>
          <Button
            color='green'
            mode= 'contained'
            title="Confirm Changes"
            onPress={() => setLocation('profile')}>
            Confirm Changes
          </Button>
        </Col>
        <Col>
        </Col>
        <Col style = {styles.buttons}>
          <Button
            color='red'
            mode='contained'
            title="Cancel Changes"
            onPress={() => setLocation('profile')}>
            Confirm Changes
          </Button>
        </Col>
      </Grid>

    </View>
  );
};

const styles = EStyleSheet.create({
  avatarSelect: {
    paddingTop: '2rem'
  },
  title: {
    fontSize: '2rem',
    marginTop: '.8rem',
    textAlign: 'center',
    color:'white',
    fontFamily: 'inconsolata'

  },
  arrows: {
    paddingTop: '5rem',
    width: '20%'
  },
  avatar: {
    width: '60%',
    alignItems: 'center'
  },
  nameField: {
    paddingBottom: '1rem'
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
    width: '14rem',
    height: '14rem',
    resizeMode: 'stretch'
  },
  sectionHeight: {
    height: '100%',
    padding: '2rem',
    paddingTop: '2rem'
  },
  sectionPadding: {
    padding: '2rem',
  },
  buttons: {
    width: '40%'
  }


});

const mapDispatchToProps = dispatch => {
  return {
    getData: (data, dataPoint) => {
      dispatch(getData(data, dataPoint));
    },
    putData: (path, data, redirect) => {
      dispatch(putData(path, data, redirect));
    },
    setLocation: location => {
        dispatch(setLocation(location));
    },
    setLoading: loading => {
      dispatch(setLoading(loading));
    }
  };
};

const mapStateToProps = state => {
  return {
    location: state.location,
    character: state.data.character,
    auth: state.auth,
    initialValues: {
      characterName: state.data.character.characterName
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

  return errors;
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  reduxForm({ form: 'add-quest-form', validate, enableReinitialize: true })
)(EditCharacterFake);
