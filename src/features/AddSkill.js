import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import DropdownList from 'react-widgets/lib/DropdownList';
import { View, ImageBackground, Button, StyleSheet, Item, Picker } from 'react-native';
import EStyleSheet, { value } from 'react-native-extended-stylesheet';
import { setLocation} from '../logic/location/actions';
import { setSkills } from '../logic/data/actions';
import { getData, putData } from '../logic/data/actions';
import Icon from 'react-native-vector-icons/MaterialIcons';
import RNPickerSelect from 'react-native-picker-select';
import { FormHeader } from '../shared-components/FormHeader';
import { Field, getFormValues, initialize, reduxForm } from 'redux-form';
import { compose } from 'redux';
import { WrappedTextInput } from '../shared-components/FormField';

export const AddSkill = ({ auth, skills, setLocation, location, handleSubmit, putData, setSkills}) => {
    const uid = require('uuid/v4');
    let id = uid();


    return (

        <ImageBackground source={require('../../assets/images/darkverylowopacityshapes.png')} style={{ height: '100%', width: '100%' }}>
            <View style={{}}>
                <View>
                    <View>
                        <View style={{ position: 'absolute', alignSelf: 'flex-end', flex: 1 }}>
                            <Icon
                                style={styles.padding}
                                name="settings-applications"
                                size={48}
                                color="white"
                                onPress={() => setLocation('settings')}
                            />
                        </View>

                    </View>

                    <View >

                    </View>

                    <View style={styles.cardPadding}>

                        <FormHeader title={'Define skill\'s attribute:'} style={{ fontSize: 24, paddingBottom: '8' }} />
                        <Field
                            name="addSkillAttribute"
                            component={attributeDropDown}
                            iosHeader="Select one"
                            mode="dropdown"
                            style={pickerStyles}
                        >
                            <Picker.Item style={pickerStyles}label="Academics" value="Academics" />
                            <Picker.Item style={pickerStyles} label="Crafts" value="Crafts" />
                            <Picker.Item style={pickerStyles} label="Mental" value="Mental" />
                            <Picker.Item style={pickerStyles} label="Fitness" value="Fitness" />
                            <Picker.Item style={pickerStyles} label="Community" value="Community" />
                            <Picker.Item style={pickerStyles}  label="Hobbies" value="Hobbies" />
                        </Field>

                        <Field
                            name="addSkillDefinition"
                            id="addSkillDefinition"
                            props={{
                                title: 'Skill Definition',
                                textContentType: 'string',
                            }}
                            component={WrappedTextInput}
                        />
                    </View>

                    <View>
                        <Button
                            color="#fff"
                            mode="contained"
                            title="Save Skill"
                            onPress={handleSubmit(values => {
                                handleAddSkill(auth, id, skills, values, putData, setSkills);
                            })}>Save Skill</Button>

                    </View>

                </View>


            </View>
        </ImageBackground >
    );
};



const handleAddSkill = (auth, sID, skills,  values, putData, setSkills) => {
    console.log(sID);
    
    // let key = values.addSkillAttribute;
    // let value = values.addSkillDefinition;
    // let insert = {values.attributeDropDown : values}
    console.log(values);
    console.log(values.addSkillAttribute);
    console.log(values.addSkillDefinition);
    // inserting newSkill { attr: def , val: 0}
    //insert skill to {sID : newSkill}
    //also need to add old skills to master
    //for each object is skills
    //master.push(skill)
    //add skill to master [{sid: newSkill}]
    let toInsert = {};
    let masterSkill = [];
    toInsert[values.addSkillAttribute] = values.addSkillDefinition;
    toInsert["val"] = 0;
    masterSkill.push({sID: toInsert});
    console.log("mater", masterSkill);
    Object.entries(skills).forEach( prevSkill => {
        if(prevSkill[1] && prevSkill[1] !== "empty"){
           console.log(prevSkill);
        }
        console.log('prevSkill', prevSkill);
      
    })


    setSkills(masterSkill);
    

    console.log("TOMM VALUES THE FIRST TIME RIGHT HERE", toInsert);
    console.log("TOMM skills THE FIRST TIME RIGHT HERE", skills);

    
    

        putData('https://levelup-10cfc.firebaseio.com/users/' + auth.uid + 'skills.json', {
 
       skills:  masterSkill,
      }, 'profile');
}


const placeHolder = {
    label: "Select an Attribute for new skill"
}


const attributeDropDown = ({ input: { onChange, value, ...inputProps }, children, ...pickerProps }) => (
    <Picker
      itemStyle={{color: "#ccc", fontFamily:"Ebrima", fontSize:17 }}
      selectedValue={ value }
      onValueChange={ value => onChange(value) }
      { ...inputProps }
      { ...pickerProps }
    >
      { children }
      
    </Picker>
  );
const pickerStyles = StyleSheet.create({
    inputIOS: {
        color: 'white',
        fontSize: 22,
        paddingTop: 8,
        paddingHorizontal: 10,
        paddingBottom: 15,
    },

});

const styles = EStyleSheet.create({

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

    padding: {
        paddingTop: '2rem',
        paddingRight: '1rem',
        paddingBottom: '2rem',
        paddingLeft: '1rem'
    },
    infoMargin: {
        marginTop: '1rem'
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
    topPadding: {
        paddingLeft: '2.5rem',
        paddingTop: '2.5rem'
    },

    cardPadding: {
        padding: '1rem',
        margin: '1rem'
    }
});

const mapStateToProps = state => {
    return {
        skills: state.data.skills,
        quests: state.data.quests,
        location: state.location,
        auth: state.auth,
        values: getFormValues('addSkills-form')(state)
    };
};

const mapDispatchToProps = dispatch => {
    return {
        putData: (path, data, redirect) => {
            dispatch(putData(path, data, redirect));
        },
        getData: (data, dataPoint) => {
            dispatch(getData(data, dataPoint));
        },
        setLocation: location => {
            dispatch(setLocation(location));
        },
        setSkills : skills => {
            dispatch(setSkills(skills));
        }
    };
};

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    ),
    reduxForm({ form: 'addSkills-form' })
)(AddSkill);