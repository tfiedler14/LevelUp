import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

class customButton extends Component {
  render() {
    const { text, onPress } = this.props;
    return (
      <TouchableOpacity style={styles.buttonStyle} onPress={() => onPress()}>
        <Text style={styles.textStyle}>{text}</Text>
      </TouchableOpacity>
    );
  }
}

customButton.propTypes = {
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
};

const styles = EStyleSheet.create({
  textStyle: {
    fontSize: '1rem',
    color: '#ffffff',
    textAlign: 'center'
  },

  buttonStyle: {
    padding: '.5rem',
    width: '100%',
    backgroundColor: 'transparent',
  }
});

export default customButton;
