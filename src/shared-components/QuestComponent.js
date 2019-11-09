import * as React from 'react';
import { Text, View } from 'react-native';
import { Col, Grid } from 'react-native-easy-grid';
import { Card } from 'react-native-paper';
import EStyleSheet from 'react-native-extended-stylesheet';
import { setLocation } from '../logic/location/actions';
import { connect } from 'react-redux';
import {deleteData} from '../logic/data/actions';
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
                <Col size={1}>
                  <View style={{ position: 'absolute' }}>
                    <Icon
                      name="edit"
                      size={24}
                      color="#999999"
                      onPress={() => {
                        setQuest(info);
                        setLocation('editQuest');
                      }}
                    />
                  </View>
                </Col>
                <Col size={1}>
                  <View style={{ position: 'absolute' }}>
                    <Icon
                      name="delete"
                      size={24}
                      color="#999999"
                      onPress={() => {
                        deleteData("https://roommate-finder-afd9b.firebaseio.com/houses/" + info.id + ".json", "home");
                      }}
                    />
                  </View>
                </Col>
              </Grid>
              <View style={{ position: 'absolute' }}>
                <Text style={styles.questName}>{info ? info.name : 'No Info'}</Text>
              </View>
          </View>
          <View style={styles.informationWrapper}>
            <Text style={styles.availability}>{info ? (info.availability + ' room(s) available') : 'Not Available'}</Text>
            <Text style={styles.subText}>{info ? info.address : 'No Info'}</Text>
            <Text style={styles.subText}>
              {info ? info.city : 'No Info'}, {info ? info.zip : 'No Info'}
            </Text>
          </View>
        </Col>
      </Grid>
    </Card>
  );
};

const styles = EStyleSheet.create({
  card: {
    width: '100%',
    height: '8rem',
    //  border: 'none',
    marginBottom: '1rem',
    color: 'white',
    backgroundColor: '#555'
  },

  informationWrapper: {
    marginTop: '1rem',
    marginBottom: '.5rem',
    marginRight: '1rem'
  },

  questName: {
    fontWeight: 'bold',
    fontSize: '1rem',
    marginBottom: '.5rem'
    // fontFamily: 'sans-serif',
  },

  availability: {
    fontSize: '1rem',
    marginBottom: '.5rem',
    fontStyle: 'italic'
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
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestComponent);