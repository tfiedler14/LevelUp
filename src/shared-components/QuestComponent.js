import * as React from 'react';
import { Text, View } from 'react-native';
import { Col, Grid } from 'react-native-easy-grid';
import { Card } from 'react-native-paper';
import EStyleSheet from 'react-native-extended-stylesheet';
import { setLocation } from '../logic/location/actions';
import { connect } from 'react-redux';
import {deleteData, setQuest} from '../logic/data/actions';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const QuestComponent = ({ info, setLocation, setQuest, deleteData }) => {
  return (
    <Card
      style={styles.card}
      onPress={() => {
        setQuest(info);
        setLocation('quest');
      }}>
      <Grid style={{ width: '100%' }}>
        <Col size={2}>
          <View style={styles.informationWrapper}>
              <Grid>
                <Col size={6}>
                  <View style={{ position: 'absolute' }}>
                    <Text style={styles.questName}>{info ? info.name : 'No Info'}</Text>
                  </View>
                </Col>

              </Grid>
              <View style={{ position: 'absolute' }}>
                <Text style={styles.questName}>{info ? info.name : 'No Info'}</Text>
              </View>
          </View>
          <View style={styles.informationWrapper}>
            <Text style={styles.description}>{info ? (info.description) : 'No Description'}</Text>

          </View>
        </Col>
      </Grid>
    </Card>
  );
};

const styles = EStyleSheet.create({
  card: {
    width: '100%',
    height: '5rem',
    //  border: 'none',
    marginBottom: '1rem',
    color: 'white',
    backgroundColor: '#555'
  },
  questnameContainer: {
    position: 'absolute',
    padding: '.5rem'
  },
  informationWrapper: {
    marginTop: '.5rem',
    marginBottom: '.5rem',
    marginRight: '.5rem',
    marginLeft: '.5rem'
  },

  questName: {
    fontWeight: 'bold',
    fontSize: '1rem',
    marginBottom: '1rem',
    color: 'white'
    // fontFamily: 'sans-serif',
  },

  description: {
    fontSize: '1rem',
    marginBottom: '.5rem',
    fontStyle: 'italic',
    color: 'white'
    // fontFamily: 'sans-serif',
  },

  subText: {
    fontSize: '.85rem',
    marginBottom: '.25rem'
    // fontFamily: 'sans-serif',
  }
});

const mapStateToProps = state => {
  return {
    location: state.location
  };
};
const mapDispatchToProps = dispatch => {
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
