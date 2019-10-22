import * as React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { ScrollView, Text, View } from 'react-native';
import { getData } from '../logic/data/actions';
import EStyleSheet from 'react-native-extended-stylesheet';
import QuestComponent from '../shared-components/QuestComponent';

export const QuestList = ({ quests, getData }) => {
  useEffect(() => {
    getData('https://roommate-finder-afd9b.firebaseio.com/quests' + '.json', 'quests');
  }, []);
  return (
    <View style={styles.sectionHeight}>
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
    }
  };
};

const mapStateToProps = state => {
  return {
    quests: state.data.quests,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestList);
