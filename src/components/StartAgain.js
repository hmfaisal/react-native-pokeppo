import React, { Component } from 'react';
import { Text, StyleSheet} from 'react-native';
import AwesomeButtonCartman from 'react-native-really-awesome-button/src/themes/cartman';

import {
	vmin,
	vmax
} from '../services/viewport';

import {
	PLAYAGAIN,
	colorPrimaryDark,
	colorGreen,
	colorGreenText,
	fontFamily
} from '../constants';

export default class StartAgain extends Component {

	constructor(props) {
		super(props);
	}
	
	pressMe(){
		this.props.onStartAgain();
	}

	render() {
		return (
			<AwesomeButtonCartman style= {styles.container} type="primary" backgroundColor={colorGreen} backgroundDarker={colorPrimaryDark} paddingTop={5} onPress={ this.pressMe.bind(this) } >
				<Text style={styles.buttonText}>{PLAYAGAIN}</Text>
			</AwesomeButtonCartman>
		);
	}

}

const styles = StyleSheet.create({
	container:{
		position: 'absolute', 
		left: 20 * vmin, 
		top: 40 * vmax
	},
	buttonText: {
		color:colorGreenText,
		fontFamily:fontFamily,
		fontSize:16,
		padding:10
	}
});
