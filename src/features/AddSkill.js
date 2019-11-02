import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Image, ScrollView, View, Text, TextInput, Button, TouchableHighlight, StyleSheet } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { setLocation } from '../logic/location/actions';
import { getData, putData } from '../logic/data/actions';
import Icon from 'react-native-vector-icons/MaterialIcons';
import RNPickerSelect from 'react-native-picker-select';
import { FormHeader } from '../shared-components/FormHeader';
import { Field, getFormValues, initialize, reduxForm } from 'redux-form';
import { compose } from 'redux';
import { WrappedTextInput } from '../shared-components/FormField';





export const AddSkill = ({ skills, setLocation, location, handleSubmit }) => {

    const placeHolder = {
        label: 'Select an Attribute for new skill',
        attr: '',
        def: ''

    };

    handleAttrValue = (attr) => {
        placeHolder.attr = attr;
        console.log(placeHolder.attr);
    }
    //currently undefined
    handleAttrDef = (def) => {
        placeHolder.def = def;
        console.log(placeHolder.def);
    }
    handleSkillSave = (location) => {
        console.log("saving new skill");
        setLocation('profile');
    }

    attrValue = placeHolder.value;
    console.log("made it to addSkill const");
    console.log(attrValue);

    return (


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

                    <FormHeader title={'Attribute:'} style={{ fontSize: 24, paddingBottom: '8' }} ></FormHeader>
                    <RNPickerSelect
                        style={pickerStyles} placeholder={placeHolder} onValueChange={(value) => this.handleAttrValue(value)}
                        items={[
                            { label: 'Academics', value: 'Academics' },
                            { label: 'Crafts', value: 'Crafts' },
                            { label: 'Mental', value: 'Mental' },
                            { label: 'Fitness', value: 'Fitness' },
                            { label: 'Community', value: 'Community' },
                            { label: 'Hobbies', value: 'Hobbies' },
                        ]}
                    />
                    <FormHeader title={'Definition of skill:'} style={{ fontSize: 18, paddingBottom: '8' }}></FormHeader>
                    <Field
                        name="addSkill"
                        id="addSkill"
                        component={WrappedTextInput}

                    />
                </View>

                <View>
                    <Button
                        color="#fff"
                        mode="contained"
                        title="Save Skill"
                        onPress={() => this.handleSkillSave(location)} />

                </View>

            </View>


        </View>

    );
};



const pickerStyles = StyleSheet.create({
    inputIOS: {
        color: 'white',
        fontSize: 22,
        paddingTop: 8,
        paddingHorizontal: 10,
        paddingBottom: 8,


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
        location: state.location
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

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    reduxForm({ form: 'addSkills-form' })
)(AddSkill);
