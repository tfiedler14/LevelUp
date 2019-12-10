import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EStyleSheet from 'react-native-extended-stylesheet';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

class customButton extends Component {
	render() {
		const { text, onPress} = this.props;
		return (
		  <TouchableOpacity style={styles.buttonStyle}
			onPress={() => onPress()}
		  >
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
    fontSize:'1.5rem',
	color: '#ffffff',
    textAlign: 'center',
    fontFamily: 'inconsolata'
  },
  
  buttonStyle: {
	backgroundColor: 'transparent',
	borderRadius:'.5rem'
  }
});

export default customButton;