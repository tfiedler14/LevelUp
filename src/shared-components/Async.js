import * as React from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';

export const Async = ({ render, loading }) => {
  return <View>{loading ? <Text>Loading...</Text> : render}</View>;
};

const mapStateToProps = state => {
  return {
    loading: state.loading
  };
};

export default connect(mapStateToProps)(Async);
