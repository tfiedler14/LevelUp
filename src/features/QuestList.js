import * as React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { ScrollView, Text, View, Button } from 'react-native';
import { getData } from '../logic/data/actions';
import EStyleSheet from 'react-native-extended-stylesheet';
import QuestComponent from '../shared-components/QuestComponent';
import {setLoading} from '../logic/loading/actions';
import { setLocation } from '../logic/location/actions';
export const QuestList = ({ getData, quests, setLocation, location, auth}) => {
  
  const handleAddQuest = location => {
    setLocation('addquest');
    console.log('changing location to addQuest');
    console.log(location);
  };

  useEffect(() => {
    getData('https://levelup-10cfc.firebaseio.com/users/' + auth.uid + '/quests.json', 'quests');
  }, []);

  return (
    <View style={styles.sectionHeight}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={{ textAlign: 'center', fontSize:26, color: 'white', marginTop:20}}>
          {'Active Quests'}
        </Text>
        <Button color="#fff" title = "Add Quest" onPress={() => handleAddQuest(location)} />
      </View> 
     
      
      <ScrollView>
        <View style={styles.sectionPadding}>
          {quests &&
            Object.values(quests).map((quest, index) => {
              return (<QuestComponent key={index} available={true} info={quest} />);
            })}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = EStyleSheet.create({
  sectionHeight: {
    height: '100% - 6rem'
  },

  sectionPadding: {
    padding: '1rem'
  },

  buttons: {
    margin: '1rem'
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
