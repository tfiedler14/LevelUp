import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import DropdownList from 'react-widgets/lib/DropdownList';
import { View, ImageBackground, Button, StyleSheet, Item, Picker } from 'react-native';
import EStyleSheet, { value } from 'react-native-extended-stylesheet';
import { setLocation } from '../logic/location/actions';
import { setSkills } from '../logic/data/actions';
import { getData, putData } from '../logic/data/actions';
import Icon from 'react-native-vector-icons/MaterialIcons';
import RNPickerSelect from 'react-native-picker-select';
import { FormHeader } from '../shared-components/FormHeader';
import { Field, getFormValues, initialize, reduxForm } from 'redux-form';
import { compose } from 'redux';
import { WrappedTextInput } from '../shared-components/FormField';

export const AddSkill = ({ auth, skills, setLocation, location, handleSubmit, putData, setSkills }) => {
    const uid = require('uuid/v4');
    let id = uid();


    return (

        <ImageBackground source={require('../../assets/images/darkverylowopacityshapes.png')} style={{ height: '100%', width: '100%' }}>
            <View>
                <View>

                    <View style={styles.cardPadding}>

                        <FormHeader title={'Define skill\'s attribute:'} style={{ fontSize: 24, paddingBottom: '8', alignSelf: 'center' }} />
                        <Field
                            name="addSkillAttribute"
                            component={attributeDropDown}
                            iosHeader="Select one"
                            mode="dropdown"
                            style={pickerStyles}
                        >
                            <Picker.Item style={pickerStyles} label="academics" value="academics" />
                            <Picker.Item style={pickerStyles} label="crafts" value="crafts" />
                            <Picker.Item style={pickerStyles} label="mental" value="mental" />
                            <Picker.Item style={pickerStyles} label="fitness" value="fitness" />
                            <Picker.Item style={pickerStyles} label="community" value="community" />
                            <Picker.Item style={pickerStyles} label="hobby" value="hobby" />
                        </Field>

                        <Field
                            name="addSkillName"
                            id="addSkillName"
                            props={{
                                title: 'Skill Name',
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
                                if (values.addSkillAttribute !== undefined && values.addSkillName !== undefined) {
                                    let toInsert = {};
                                    toInsert["attribute"] = values.addSkillAttribute;
                                    toInsert["name"] = values.addSkillName;
                                    toInsert["val"] = 1;
                                    toInsert["xp"] = 0;
                                    toInsert["xpToNext"] = 50;

                                    putData('https://levelup-10cfc.firebaseio.com/users/' + auth.uid + '/skills.json', [...skills, toInsert], 'profile', 'profile');
                                } else {
                                    alert("Attribute and Name must be defined");
                                }
                            })}>Save Skill</Button>

                    </View>

                </View>


            </View>
        </ImageBackground >
    );
};



const handleAddSkill = (auth, sID, skills, values, putData, setSkills) => {

    let toInsert = {};
    if (values.addSkillAttribute !== undefined && values.addSkillName !== undefined) {

        toInsert["attribute"] = values.addSkillAttribute;
        toInsert["name"] = values.addSkillName;
        toInsert["val"] = 0;

        // skills.push({ [sID]: toInsert });

        console.log("skills", skills);
        setSkills(skills);

        putData('https://levelup-10cfc.firebaseio.com/users/' + auth.uid + '/skills.json', [...skills, toInsert], 'profile', 'profile');
    } else {
        alert("Must add attribute and name");
    }
}


const placeHolder = {
    label: "Select an Attribute for new skill"
}


const attributeDropDown = ({ input: { onChange, value, ...inputProps }, children, ...pickerProps }) => (
    <Picker
        itemStyle={{ color: "#ccc", fontFamily: "Academy Engraved LET", fontSize: 17 }}
        selectedValue={value}
        onValueChange={value => onChange(value)}
        {...inputProps}
        {...pickerProps}
    >
        {children}

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
        setSkills: skills => {
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
