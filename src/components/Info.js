import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import InfoDetails from './InfoDetails';
import AwesomeButtonCartman from 'react-native-really-awesome-button/src/themes/cartman';

import {
	vmin,
	vmax
} from '../services/viewport';

import {
	INFO,
	colorPrimaryDark,
	colorBlue,
	colorBlueText,
	fontFamily
} from '../constants';


export default class Info extends Component {

	constructor(props) {
		super(props);
		this.state = { 
			showResult:false
		};
	}

	showResult(){
		this.setState({
		  showResult:true
		})
	}

	closeResult(){
		this.setState({
		  showResult:false
		})
	}

	render() {
		return (
			<View>
				<AwesomeButtonCartman width={200} style= {styles.container} type="primary"  backgroundColor={colorBlue} backgroundDarker={colorPrimaryDark} paddingTop={5} onPress={ this.showResult.bind(this) } >
						<Text style={styles.buttonText}>{INFO}</Text>
				</AwesomeButtonCartman>
				{(this.state.showResult) ?
					<InfoDetails onCloseResult={this.closeResult.bind(this)} /> : <View></View> 
				}
			</View>
      
		);
	}

}

const styles = StyleSheet.create({
	container:{
		position: 'absolute', 
		left: 25 * vmin, 
		top: 50 * vmax
	},
	buttonText: {
		color:colorBlueText,
		fontFamily:fontFamily,
		fontSize:16,
		padding:10
	}
});