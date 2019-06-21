import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';

import AwesomeButtonCartman from 'react-native-really-awesome-button/src/themes/cartman';
import {vmin, vmax} from '../services/viewport';

import {
	APPNAME,
	PLAYSTART,
	colorPrimaryDark,
	colorGreen,
	colorGreenText,
	colorText,
	fontFamily
} from '../constants';


export default class Start extends Component {

	constructor(props) {
		super(props);
	}
	
	pressMe(){	
		this.props.onStart();
	}

	render() {
		return (
			<View>
				<View style={styles.logoContainer}>
					<Text style={styles.logoText}>{APPNAME}</Text>
				</View>
				<AwesomeButtonCartman style={styles.buttonContainer} type="primary" width={200} backgroundColor={colorGreen} backgroundDarker={colorPrimaryDark} paddingTop={5} onPress={ this.pressMe.bind(this) } >
					<Text style={styles.buttonText}>{PLAYSTART}</Text>
				</AwesomeButtonCartman>
			</View>
		);
	}

}

const styles = StyleSheet.create({
	logoContainer:{
		position: 'absolute', 
		left: 15 * vmin, 
		top: 30 * vmax
	},
	logoText: {
		color:colorText,
		fontFamily:fontFamily,
		fontSize:30
	},
	buttonContainer:{
		position: 'absolute', 
		left: 25 * vmin, 
		top: 40 * vmax
	},
	buttonText: {
		color:colorGreenText,
		fontFamily:fontFamily,
		fontSize:18,
		padding:10
	}
});