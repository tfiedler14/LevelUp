import * as React from 'react';
import { Text } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

export const FormHeader = ({ title }) => {
  return <Text style={styles.header}>{title}</Text>;
};

const styles = EStyleSheet.create({
  header: {
    paddingBottom: '1rem',
    fontWeight: 'bold',
    fontSize: '1rem'
  }
});
