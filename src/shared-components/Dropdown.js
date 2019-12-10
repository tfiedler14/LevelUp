import { Text, Picker, View } from 'react-native';
import * as React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';

export const Dropdown = props => {
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
      <Picker
        {...inputProps}
        onValueChange={input.onChange}
        onBlur={input.onBlur}
        onFocus={input.onFocus}
        style={styles.textEntry}
        selectedValue={input.value}
      >
        {options.map(element => <Picker.Item key={element.label} label={element.label} value={element.value} />)}
      </Picker>
      {touched && error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = EStyleSheet.create({
  textEntry: {

    color: 'white',
    padding: '.5rem',
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
