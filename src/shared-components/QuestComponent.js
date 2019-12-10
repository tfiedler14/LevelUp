import * as React from 'react';
import { Text, View } from 'react-native';
import { Col, Grid } from 'react-native-easy-grid';
import { Card } from 'react-native-paper';
import EStyleSheet from 'react-native-extended-stylesheet';
import { setLocation } from '../logic/location/actions';
import { connect } from 'react-redux';
import { deleteData, setQuest } from '../logic/data/actions';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const QuestComponent = ({ info, key, setLocation, setQuest, deleteData }) => {
  return (
    <Card
      style={styles.card}
      onPress={() => {
        info.index = key;
        setQuest(info);
        setLocation('quest');
      }}>
      <View style={styles.informationWrapper}>
        <Text style={styles.questName}>{info ? info.name : 'No Info'}</Text>
      </View>
      <View style={styles.informationWrapper}>
        <Text style={styles.skills}>{info ? 'Skills: ' + info.skill : 'No skills'}</Text>
      </View>
    </Card>
  );
};

const styles = EStyleSheet.create({
  card: {
    width: '100%',
    padding: '1rem',
    color: 'white',
    backgroundColor: 'transparent'
  },

  questName: {
    fontWeight: 'bold',
    fontSize: '1rem',
    marginBottom: '.5rem',
    color: 'white'
  },

  skills: {
    fontSize: '1rem',
    fontStyle: 'italic',
    color: 'white'
  }
});

export const mapStateToProps = state => {
  return {
    location: state.location
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    setLocation: location => {
      dispatch(setLocation(location));
    },
    deleteData: (data, location) => {
      dispatch(deleteData(data, location));
    },
    setQuest: (data, location) => {
      dispatch(setQuest(data));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestComponent);
