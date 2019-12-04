import * as React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { ScrollView, Text, View, Button } from 'react-native';
import { setLocation } from '../logic/location/actions';
import { getData } from '../logic/data/actions';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Divider } from 'react-native-elements';
import QuestComponent from '../shared-components/QuestComponent';
import { Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Col, Grid } from 'react-native-easy-grid';

export const QuestList = ({ getData, setLocation, quests, location, auth }) => {
  /* istanbul ignore next */
  useEffect(() => {
    getData('https://levelup-10cfc.firebaseio.com/users/' + auth.uid + '/quests.json', 'quests');
  }, []);
  return (
    <View style={styles.sectionHeight}>
      <View style={styles.sectionPadding}>
        <Text style={{ textAlign: 'center', fontSize: 26, color: 'white', marginTop: 20 }}>
          {'Active Quests'}
        </Text>
        <View style={styles.iconcontainer}>
          <Icon name="add" size={48} color="white" onPress={() => setLocation('addquest')} />
        </View>
      </View>
      <ScrollView>
        <View>
          {quests &&
            Object.values(quests).map((quest, index) => {
              if (quest != null) {
                if (quest.finishDate === 'incomplete') {
                  return (
                    <View
                      style={{
                        borderBottomColor: 'white',
                        borderBottomWidth: 1
                      }}>
                      <QuestComponent info={{ ...quest, id: index }} />
                    </View>
                  );
                } else {
                  return;
                }
              } else {
                return;
              }
            })}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = EStyleSheet.create({
  card: {
    width: '100%',
    height: '5rem',
    color: 'white',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center'
  },
  iconcontainer: {
    paddingLeft: '7rem',
    paddingTop: '.6rem'
  },
  sectionHeight: {
    height: '100%'
  },
  sectionPadding: {
    padding: '2rem',
    flexDirection: 'row'
  }
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
    quests: state.data.quests,
    location: state.location,
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestList);
