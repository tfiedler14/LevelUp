import * as React from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';

export const Async = ({ render, loading }) => {
  console.log(loading);
  return (
    <View>
      {loading !== 0 ? (
        <View style={styles.page}>
          <Text style={styles.text}>Loading...</Text>
        </View>
      ) : (
        render
      )}
    </View>
  );
};

export const mapStateToProps = state => {
  return {
    loading: state.loading
  };
};

const styles = EStyleSheet.create({
  page: {
    height: '100%',
    backgroundColor: '#222',
    color: 'white'
  },

  text: {
    textAlign: 'center',
    paddingTop: '10rem',
    color: 'white'
  }
});

export default connect(mapStateToProps)(Async);
