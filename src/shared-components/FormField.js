import { Text, TextInput, View } from 'react-native';
import * as React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';

export const WrappedTextInput = props => {
  const { title, input, textContentType, autoCompleteType, password, multiline, meta, ...inputProps } = props;

  const error = meta.error;
  const touched = meta.touched;
  return (
    <View>
      <Text style={styles.title}>{title}</Text>
        <TextInput
          {...inputProps}
          onChangeText={input.onChange}
          onBlur={input.onBlur}
          onFocus={input.onFocus}
          style={styles.textEntry}
          textContentType={textContentType || 'none'}
          autoCompleteType={autoCompleteType || 'off'}
          secureTextEntry={password}
          multiline={multiline}
          maxLength={2500}
          value={input.value}
        />
      {touched && error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};



const styles = EStyleSheet.create({
  textEntry: {
    borderBottomColor: '#ccc',
    borderBottomWidth: '.1rem',
    backgroundColor: '#666',
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
