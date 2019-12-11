import * as React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { ScrollView, Text, View, Button } from 'react-native';
import { setLocation } from '../logic/location/actions';
import { getData } from '../logic/data/actions';
import EStyleSheet from 'react-native-extended-stylesheet';
import {Divider} from 'react-native-elements';
import QuestComponent from '../shared-components/QuestComponent';
import { Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Col, Grid } from 'react-native-easy-grid';
import { attributes, colors } from '../../Const';

export const QuestList = ({ getData, setLocation, quests, location, auth }) => {
  /* istanbul ignore next */
  useEffect(() => {
    getData('https://levelup-10cfc.firebaseio.com/users/' + auth.uid + '/quests.json', 'quests');
  }, []);
  return (
    <View style={styles.sectionHeight}>
      <View style = {styles.sectionPadding}>

        <Text style={styles.title}>
          {'Active Quests'}
        </Text>
        <View style = {styles.iconcontainer}>
          <Icon
            name="add"
            size={48}
            color="yellow"
            onPress={() => setLocation('addquest')}
            />
        </View>

      </View>
      <ScrollView>
        <View>
          {quests &&
            Object.values(quests).map((quest, index) => (
              <>
                {quest && quest.finishDate === 'incomplete' &&
                <View style={{ borderBottomColor: colors['academics'], borderBottomWidth: 1 }}>
                  <QuestComponent key={null} info={{ ...quest, id: index }}/>
                </View>}
                </>
            ))
          }
        </View>
      </ScrollView>
    </View>
  );
};

const styles = EStyleSheet.create({
  title: {
    fontSize: '2rem',
    marginTop: '.8rem',
    textAlign: 'center',
    color:colors['academics'],
    fontFamily: 'inconsolata'

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
    paddingLeft: '4rem',
    paddingTop: '.5rem'
  },
  sectionHeight: {
    height: '100%',
  },
  sectionPadding: {
    padding: '1.7rem',
    flexDirection: 'row'
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
    quests: state.data.quests,
    location: state.location,
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestList);
