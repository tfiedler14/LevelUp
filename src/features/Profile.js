import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Image, ScrollView, View, Text } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { setLocation } from '../logic/location/actions';
import { getData, putData } from '../logic/data/actions';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Progress from 'react-native-progress';
import { Divider } from 'react-native-elements';
import { tsConstructorType } from '@babel/types';

export const Profile = ({ profile, putData, getData, auth, quests }) => {
  
    

 
  
    console.log(quests);



  return (
    
    <View style={{}}>
      
          <View >
            <View>
              <View style={{ position: 'absolute', alignSelf: 'flex-end', flex: 1}}>
                <Icon
                  style={styles.padding}
                  name="settings-applications"
                  size={48}
                  color="white"
                  onPress={() => setLocation('settings')}
                />
              </View>
              <View style={{ flex: 1, alignItems: 'center', paddingTop: 30 }}>
                <Image
                  style={styles.addBorder}
                  source={require('../../assets/images/girlwhiteorange.png')}
                />
                <View style={{ paddingTop: 15 }}>
                  <Progress.Bar
                    style={styles.progress}
                    color='white'
                    height={15}
                    progress={0.3}
                  />
                </View>
              </View>
              <View style={{paddingTop:280}}>
                <Divider style={{ backgroundColor: 'white' , height: 2 }} />
              </View>
            </View >
            
          </View>
          <View >
            <Text style={{fontSize:17}}>
                Academics
            </Text>
            <AttributeListItem skills={skills.filter(skill=>skill.attribute='academics').map((data)=>{return(data.name)})}></AttributeListItem>
            </View>

            <View >
            <Text style={{fontSize:17}}>
                Crafts
            </Text>
            <AttributeListItem skills={skills.filter(skill=>skill.attribute='crafts').map((data)=>{return(data.name)})}></AttributeListItem>
            </View>

            <View >
            <Text style={{fontSize:17}}>
                Mental
            </Text>
            <AttributeListItem skills={skills.filter(skill=>skill.attribute='mental').map((data)=>{return(data.name)})}></AttributeListItem>
            </View>

            <View >
            <Text style={{fontSize:17}}>
                Fitness
            </Text>
            <AttributeListItem skills={skills.filter(skill=>skill.attribute='fitness').map((data)=>{return(data.name)})}></AttributeListItem>
            </View>
            <View >
            <Text style={{fontSize:17}}>
                Community
            </Text>
            <AttributeListItem skills={skills.filter(skill=>skill.attribute='community').map((data)=>{return(data.name)})}></AttributeListItem>
            </View>
            <View >
            <Text style={{fontSize:17}}>
                Hobby
            </Text>
            <AttributeListItem skills={skills.filter(skill=>skill.attribute='hobby').map((data)=>{return(data.name)})}></AttributeListItem>
            </View>
            

            
       
    
    
    
  
  </View>
  );
};

const AttributeListItem = ({skills}) => {
  return (
    
      
      skills.map((data) => {
        return (
          <View>
          
          <Text>
            {data}
          </Text>
          </View>
        )
      })

    
  );
}

const styles = EStyleSheet.create({
  profileHeader: {
    backgroundColor: '#0a6e44',
    width: '100%',
    height: '12rem',
    zIndex: 4
  },
  container: {
    flex: 1
  },
  addBorder: {
    width: 225,
    height: 225,
    resizeMode: "stretch",
    // Set border width.
    borderWidth: 2,
    // Set border color.
    borderColor: 'white',
  },
  progress: {
    height: 15,
    width: 100,
    borderColor: 'white',
    borderWidth: 1
  },
  padding: {
    paddingTop: '2rem',
    paddingRight: '1rem',
    paddingBottom: '2rem',
    paddingLeft: '1rem'
  },
  profileWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    textAlign: 'center'
  },

  profileImage: {
    borderRadius: 50,
    width: '6rem',
    height: '6rem',
    marginTop: '1rem',
    margin: 'auto'
  },

  infoMargin: {
    marginTop: '1rem'
  },

  mainInfo: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: '1.5rem',
    margin: 'auto'
  },

  secondaryInfo: {
    color: 'white',
    fontWeight: '300',
    margin: 'auto',
    fontSize: '1rem'
  },

  viewPadding: {
    margin: '1rem'
  },

  sectionHeight: {
    height: '100% - 18rem'
  },

  buttons: {
    marginBottom: '2rem'
  },

  cardPadding: {
    padding: '1rem',
    margin: '1rem'
  }
});

const mapStateToProps = state => {
  return {
    skills: state.skills,
    quests: state.quests
    
  };
};

const mapDispatchToProps = dispatch => {
  return {
    putData: data => {
      dispatch(putData(data));
    },
    getData: (data, dataPoint) => {
      dispatch(getData(data, dataPoint));
    },
    setLocation: location => {
      dispatch(setLocation(location));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
