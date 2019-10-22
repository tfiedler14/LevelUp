import { Text, TextInput, View } from 'react-native';
import * as React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';

export const WrappedTextInput = props => {
  const { title, input, textContentType, autoCompleteType, password, multiline, meta, ...inputProps } = props;

  const error = meta.error;
  const touched = meta.touched;
  return (
    <View>
      <Text>{title}</Text>
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
    borderWidth: '.1rem',
    borderRadius: '.5rem',
    borderColor: '#999',
    padding: '.5rem',
    marginRight: '1rem',
    marginLeft: '1rem',
    marginBottom: '.5rem'
  },

  errorText: {
    color: '#880000',
    fontSize: '.9rem',
    marginLeft: '1rem',
    marginTop: '-.25rem'
  }
});
