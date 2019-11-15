import { Image, ScrollView, Text, View } from 'react-native';
import React from 'react';
import { Button, Card } from 'react-native-paper';
import { getData, putData } from '../logic/data/actions';
import { connect } from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import { FormHeader } from '../shared-components/FormHeader';
import { WrappedTextInput } from '../shared-components/FormField';
import { Field, reduxForm } from 'redux-form';
import { compose } from 'redux';

export const Quest = ({ info, auth, putData, handleSubmit }) => {
  return (
    <View style={styles.sectionHeight}>
      <View style={styles.formPadding}>
      </View>
      <ScrollView>
        <View style={styles.formPadding}>
          <Card style={styles.card}>
            <View>
              <FormHeader title={info && info.name} />

              <View style={styles.infoWrapper}>
                <Text style={styles.availability}>
                  {info ? ('Quest Description: ' + info.description) : 'Not Available'}
                </Text>
                <Text style={styles.address}>{info ? ('Experience Reward: ' + info.expVal) : 'No Info'}</Text>
                <Text style={styles.city}>
                  {info ? ('Associated Skills: ' + info.skill) : 'No Info'}
                </Text>

              </View>
            </View>
          </Card>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = EStyleSheet.create({

  sectionHeight: {
    height: '100% - 6rem'
  },

  card: {
    //  border: 'none',
    marginBottom: '1rem',
    height: '30rem',
    padding: '1rem',
    backgroundColor: '#555'
  },
  buttonPadding: {
    padding: '20rem'
  },
  comment: {
    marginBottom: '1rem',
    padding: '1rem'
  },

  poster: {
    fontWeight: 'bold'
  },

  imageWrapper: {
    flex: 1,
    height: '10rem'
  },

  infoWrapper: {
    paddingTop: '1rem'
  },

  imageArea: {
    width: '100%',
    height: '10rem'
  },

  questName: {
    fontWeight: 'bold',
    fontSize: '3rem',
    marginBottom: '.5rem',
    color: 'black'
    // fontFamily: 'sans-serif',
  },

  availability: {
    fontSize: '1rem',
    marginBottom: '.5rem',
    // fontFamily: 'sans-serif',
  },

  address: {
    fontSize: '.9rem',
    marginBottom: '.25rem'
    // fontFamily: 'sans-serif',
  },

  city: {
    fontSize: '.9rem',
    marginBottom: '.25rem'
    // fontFamily: 'sans-serif',
  },

  formPadding: {
    padding: '1rem'
  }
});

const mapStateToProps = state => {
  return {
    info: state.data.quest,
    auth: state.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    putData: (path, data, redirect) => {
      dispatch(putData(path, data, redirect));
    },
    getData: (data, dataPoint) => {
      dispatch(getData(data, dataPoint));
    }
  };
};

const validate = values => {
  const errors = {};

  if (!values.comment) {
    errors.comment = 'Required';
  } else if (values.comment.length > 2000) {
    errors.comment = 'Must be less than 3000 characters';
  }

  return errors;
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  reduxForm({ form: 'quest-comment-form', validate })
)(Quest);
