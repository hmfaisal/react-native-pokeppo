import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';

import {
	OVER,
	colorText,
	fontFamily
} from '../constants';

import {vmin, vmax} from '../services/viewport';

export default class GameOver extends Component{

	constructor(props){
		super(props);
	}

	render(){
		return(
			<View style={styles.container}  >
				<Text style={styles.text}>{OVER}</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container:{
		position: 'absolute', 
		left: 10 * vmin, 
		top: 30 * vmax,
		zIndex:1001
	},
	text: {
		color:colorText,
		fontFamily:fontFamily,
		fontSize:26
	}
});