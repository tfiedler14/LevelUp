import * as React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { ScrollView, Text, View } from 'react-native';
import { setLocation } from '../logic/location/actions';
import { getData } from '../logic/data/actions';
import EStyleSheet from 'react-native-extended-stylesheet';
import QuestComponent from '../shared-components/QuestComponent';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { FAB } from 'react-native-paper';

export const QuestList = ({ getData, setLocation, quests, location, auth }) => {
  /* istanbul ignore next */
  useEffect(() => {
    getData('https://levelup-10cfc.firebaseio.com/users/' + auth.uid + '/quests.json', 'quests');
  }, []);
  return (
    <View style={styles.sectionHeight}>
      <View style={styles.sectionPadding}>
        <Text style={styles.text}>Active Quests</Text>
        <FAB style={{...styles.fab, ...{zIndex: 9999999}}} icon="add" onPress={() => setLocation('addquest')} />
      </View>
      <ScrollView>
        <View>
          {quests &&
            Object.values(quests)
              .filter(quest => quest && quest.finishDate === 'incomplete')
              .map((quest, index) => (
                <View key={index} style={{ borderBottomColor: 'white', borderBottomWidth: 1 }}>
                  <QuestComponent info={{ ...quest, id: index }} />
                </View>
              ))}
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

  text: {
    fontSize: '1.5rem',
    textAlign: 'center',
    color: 'white'
  },

  sectionHeight: {
    height: '100%'
  },
  sectionPadding: {
    backgroundColor: '#555',
    padding: '1rem',
    flexDirection: 'row',
    borderBottomWidth: 0
  },
  fab: {
    backgroundColor: '#ff0066',
    color: 'white',
    position: 'absolute',
    marginTop: '2rem',
    right: 0,
    marginRight: '1rem',
    zIndex: 30
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
