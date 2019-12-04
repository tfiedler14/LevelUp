import * as React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';
import { setLocation } from '../logic/location/actions';
import { getData } from '../logic/data/actions';
import EStyleSheet from 'react-native-extended-stylesheet';
import moment from 'moment';
import { Button, Card, DataTable } from 'react-native-paper';
import { useState } from 'react';

export const CalendarPage = ({ getData, setLocation, quests, location, auth }) => {
  /* istanbul ignore next */
  useEffect(() => {
    getData('https://levelup-10cfc.firebaseio.com/users/' + auth.uid + '/quests.json', 'quests');
  }, []);

  let completeQuests = {};
  for (let i = 0; i < Object.keys(quests).length; i++) {
    let currQuest = Object.keys(quests)[i];
    if (quests[currQuest].finishDate && quests[currQuest].finishDate !== 'incomplete') {
      if (!completeQuests[quests[currQuest].finishDate]) {
        completeQuests[quests[currQuest].finishDate] = parseInt(quests[currQuest].expVal, 10);
      } else {
        completeQuests[quests[currQuest].finishDate] =
          parseInt(completeQuests[quests[currQuest].finishDate], 10) +
          parseInt(quests[currQuest].expVal, 10);
      }
    }
  }
  /*quests.forEach(quest => {
    if(quest.finishDate && quest.finishDate !== 'incomplete') {
      if(!(completeQuests[quest.finishDate])){
        completeQuests[quest.finishDate] = parseInt(quest.expVal,10);
      } else {
        completeQuests[quest.finishDate] = parseInt(completeQuests[quest.finishDate], 10) + parseInt(quest.expVal, 10);
      }
    }
  });*/

  const today = moment(new Date());

  const [month, setMonth] = useState(today.month());
  const [year, setYear] = useState(today.year());

  const weekDay = moment(new Date(year, month, 1)).weekday();
  const days = moment(`${year}-${month < 9 ? '0' : ''}${month + 1}`).daysInMonth();

  const monthInfo = [];
  let weekDayC = weekDay;
  let week = 1;

  for (let i = 0; i < days; i++) {
    let myColor = 'undefined';
    let myDay = '';
    if (i < 10) {
      myDay = '0' + (i + 1);
    } else {
      myDay = '' + (i + 1);
    }
    let checkDay = year + '-' + (month + 1) + '-' + myDay;
    if (completeQuests[checkDay]) {
      if (completeQuests[checkDay] < 20) {
        myColor = '#ee33cc';
      } else if (completeQuests[checkDay] < 40) {
        myColor = '#ee33aa';
      } else if (completeQuests[checkDay] < 60) {
        myColor = '#ee3366';
      } else if (completeQuests[checkDay] < 80) {
        myColor = '#ee3344';
      } else if (completeQuests[checkDay] > 99) {
        myColor = '#ee3322';
      }
    }
    monthInfo.push({
      date: i + 1,
      weekday: weekDayC,
      week,
      color: myColor
    });
    weekDayC++;
    weekDayC = weekDayC % 7;
    weekDayC === 0 && week++;
  }

  const firstDayOfWeek = monthInfo[0].weekday;

  for (let j = 0; j < firstDayOfWeek; j++) {
    monthInfo.unshift({ date: '', weekday: j, week: 1 });
  }

  const lastDayOfWeek = monthInfo[monthInfo.length - 1].weekday;

  for (let k = lastDayOfWeek + 1; k < 7; k++) {
    monthInfo.push({ date: '', weekday: k, week: monthInfo[monthInfo.length - 1].week });
  }

  return (
    <View style={styles.paddingTop}>
      <View style={styles.sectionHeight}>
        <Card style={styles.card}>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Button
              color="#FFFFFF"
              uppercase={false}
              mode="text"
              style={styles.buttonStyle}
              onPress={() => {
                month === 0 && setYear(year - 1);
                month === 0 ? setMonth(11) : setMonth(month - 1);
              }}>
              {'<'}
            </Button>
            <Text style={styles.monthInfo}>
              {`${month + 1}`}-{`${year}`}
            </Text>
            <Button
              color="#FFFFFF"
              uppercase={false}
              mode="text"
              style={styles.buttonStyle}
              onPress={() => {
                month === 11 && setYear(year + 1);
                month === 11 ? setMonth(0) : setMonth(month + 1);
              }}>
              {'>'}
            </Button>
          </View>
          <DataTable style={{ textAlign: 'center' }}>
            <DataTable.Header>
              <DataTable.Title style={{ justifyContent: 'center' }}>
                <Text style={{ color: '#FFFFFF' }}>Sun</Text>
              </DataTable.Title>
              <DataTable.Title style={{ justifyContent: 'center' }}>
                <Text style={{ color: '#FFFFFF' }}>Mon</Text>
              </DataTable.Title>
              <DataTable.Title style={{ justifyContent: 'center' }}>
                <Text style={{ color: '#FFFFFF' }}>Tue</Text>
              </DataTable.Title>
              <DataTable.Title style={{ justifyContent: 'center' }}>
                <Text style={{ color: '#FFFFFF' }}>Wed</Text>
              </DataTable.Title>
              <DataTable.Title style={{ justifyContent: 'center' }}>
                <Text style={{ color: '#FFFFFF' }}>Thu</Text>
              </DataTable.Title>
              <DataTable.Title style={{ justifyContent: 'center' }}>
                <Text style={{ color: '#FFFFFF' }}>Fri</Text>
              </DataTable.Title>
              <DataTable.Title style={{ justifyContent: 'center' }}>
                <Text style={{ color: '#FFFFFF' }}>Sat</Text>
              </DataTable.Title>
            </DataTable.Header>

            <DataTable.Row style={styles.table}>
              {monthInfo
                .filter(element => element.week === 1)
                .map((element, index) => (
                  <DataTable.Cell
                    key={`1-${index}`}
                    style={{ backgroundColor: element.color || '#555', justifyContent: 'center' }}>
                    <Text style={{ color: 'white' }}>{element.date}</Text>
                  </DataTable.Cell>
                ))}
            </DataTable.Row>

            <DataTable.Row style={styles.table}>
              {monthInfo
                .filter(element => element.week === 2)
                .map((element, index) => (
                  <DataTable.Cell
                    key={`2-${index}`}
                    style={{
                      backgroundColor: element.color || '#555',
                      justifyContent: 'center'
                    }}>
                    <Text style={{ color: 'white' }}>{element.date}</Text>
                  </DataTable.Cell>
                ))}
            </DataTable.Row>
            <DataTable.Row style={styles.table}>
              {monthInfo
                .filter(element => element.week === 3)
                .map((element, index) => (
                  <DataTable.Cell
                    key={`3-${index}`}
                    style={{ backgroundColor: element.color || '#555', justifyContent: 'center' }}>
                    <Text style={{ color: '#FFFFFF' }}>{element.date}</Text>
                  </DataTable.Cell>
                ))}
            </DataTable.Row>
            <DataTable.Row style={styles.table}>
              {monthInfo
                .filter(element => element.week === 4)
                .map((element, index) => (
                  <DataTable.Cell
                    key={`4-${index}`}
                    style={{ backgroundColor: element.color || '#555', justifyContent: 'center' }}>
                    <Text style={{ color: '#FFFFFF' }}>{element.date}</Text>
                  </DataTable.Cell>
                ))}
            </DataTable.Row>
            <DataTable.Row style={styles.table}>
              {monthInfo
                .filter(element => element.week === 5)
                .map((element, index) => (
                  <DataTable.Cell
                    key={`5-${index}`}
                    style={{ backgroundColor: element.color || '#555', justifyContent: 'center' }}>
                    <Text style={{ color: '#FFFFFF' }}>{element.date}</Text>
                  </DataTable.Cell>
                ))}
            </DataTable.Row>
            {monthInfo[monthInfo.length - 1].week === 6 && (
              <DataTable.Row style={styles.table}>
                {monthInfo
                  .filter(element => element.week === 6)
                  .map((element, index) => (
                    <DataTable.Cell
                      key={`6-${index}`}
                      style={{
                        backgroundColor: element.color || '#555',
                        justifyContent: 'center'
                      }}>
                      <Text style={{ color: '#FFFFFF' }}>{element.date}</Text>
                    </DataTable.Cell>
                  ))}
              </DataTable.Row>
            )}
          </DataTable>
        </Card>

        {/*<Calendar date={moment('23/10/2015', 'DD/MM/YYYY')} onSelect={this.onSelect} />*/}
      </View>
    </View>
  );
};

const styles = EStyleSheet.create({
  iconcontainer: {
    paddingLeft: '7rem',
    paddingTop: '.6rem'
  },
  card: {
    padding: '1rem',
    margin: '1rem',
    backgroundColor: '#555'
    //  border: 'none',
  },
  paddingTop: {
    paddingTop: '3rem'
  },
  sectionHeight: {
    height: '100%',
    color: 'white'
  },
  sectionPadding: {
    padding: '2rem',
    flexDirection: 'row'
  },
  buttonStyle: {
    width: '5rem'
  },
  monthInfo: {
    marginLeft: '1rem',
    marginRight: '1rem',
    color: 'white',
    lineHeight: '2.5rem'
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
)(CalendarPage);
