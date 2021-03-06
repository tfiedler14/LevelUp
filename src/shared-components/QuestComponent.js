import * as React from 'react';
import { Text, View } from 'react-native';
import { Col, Grid } from 'react-native-easy-grid';
import { Card } from 'react-native-paper';
import EStyleSheet from 'react-native-extended-stylesheet';
import { setLocation } from '../logic/location/actions';
import { connect } from 'react-redux';
import {deleteData, setQuest} from '../logic/data/actions';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { attributes, colors } from '../../Const';


export const QuestComponent = ({ info, key, setLocation, setQuest, deleteData }) => {
  return (
    <Card
      style={styles.card}
      onPress={() => {
        info.index = key;
        console.log("Info: ",info);
        setQuest(info);
        setLocation('quest');
      }}>
      <Grid style={{ width: '100%' }}>
        <Col size={2}>
          <View style={styles.informationWrapper}>
            <View style={{ position: 'absolute' }}>
              <Text style={styles.questName}>{info ? info.name : 'No Info'}</Text>
            </View>
          </View>
          <View style={styles.informationWrapper}>
            <Text style={styles.skills}>{info ? ('Skills: ' + (info.skill)) : 'No skills'}</Text>
          </View>
        </Col>
      </Grid>
    </Card>
  );
};

const styles = EStyleSheet.create({
  card: {
    width: '100%',
    height: '4rem',
    //  border: 'none',
    marginBottom: '.4rem',
    color: 'white',
    backgroundColor: 'transparent'
  },
  informationWrapper: {
    paddingTop: '.3rem',
    marginTop: '.5rem',
    marginBottom: '.5rem',
    marginRight: '.5rem',
    marginLeft: '.5rem'
  },

  questName: {
    fontWeight: 'bold',
    fontSize: '1.1rem',
    marginBottom: '1rem',
    color:colors['academics'],
    fontFamily: 'inconsolata'
    // fontFamily: 'sans-serif',
  },

  skills: {
    fontSize: '1rem',
    marginBottom: '.5rem',
    fontStyle: 'italic',
    color:colors['academics'],
    fontFamily: 'inconsolata'
    // fontFamily: 'sans-serif',
  },
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
