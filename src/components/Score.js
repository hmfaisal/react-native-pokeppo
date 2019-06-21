import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import {vmin, vmax} from '../services/viewport';

import {
	fontFamily
} from '../constants';


export default class Score extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		let scoreString = this.props.score.toString();
		return (
			<View style={styles.container}  >
				<Text style={styles.text}>{scoreString}</Text>
			</View>
		);
	}

}

const styles = StyleSheet.create({
	container:{
		position: 'absolute', 
		left: 45 * vmin, 
		top: 20 * vmax
	},
	text: {
		color:'#fff',
		fontFamily:fontFamily,
		fontSize:22,
		padding:10
	}
});
