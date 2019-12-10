import { Text, Picker, View } from 'react-native';
import * as React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Dropdown } from 'react-native-material-dropdown'

export const DropdownWrapper = props => {
  const {
    title,
    options,
    input,
    meta,
    ...inputProps
  } = props;

  const error = meta.error;
  const touched = meta.touched;
  return (
    <View>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.bgC}>
        <Dropdown
          {...inputProps}
          baseColor={'#CCCCCC'}
          labelFontSize={0}
          onChangeText={input.onChange}
          onBlur={input.onBlur}
          onFocus={input.onFocus}
          selectedValue={input.value}
          data={options}
          textColor={'#FFFFFF'}
          itemColor={'#555555'}
          selectedItemColor={'#000000'}
          dropdownOffset={{top: 8, bottom: -8}}
          rippleDuration={0}
          containerStyle={{marginBottom: -8}}
          rippleInsets={{bottom: -16}}
        />
      </View>
      {touched && error && <Text style={styles.errorText}>{error}</Text>}
    </View>

  );
};

const styles = EStyleSheet.create({
  container: {
    borderBottomColor: '#ccc',
    borderBottomWidth: '.1rem',
    marginBottom: -16,
    paddingLeft: '.5rem'
  },

  bgC: {
    backgroundColor: '#666',
    margin: '1rem',
    marginTop: 0
  },

  textEntry: {
    borderBottomColor: '#ccc',
    borderBottomWidth: '.1rem',
    backgroundColor: '#666',
    color: 'white',
    marginRight: '1rem',
    marginLeft: '1rem',
    marginBottom: '.5rem'
  },
  title: {
    color: 'white',
    marginBottom: '.25rem'
  },
  errorText: {
    color: '#880000',
    fontSize: '.9rem',
    marginLeft: '1rem',
    marginTop: '-.25rem'
  }
});
