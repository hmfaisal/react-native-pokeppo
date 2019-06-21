import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Result from './Result';
import AwesomeButtonCartman from 'react-native-really-awesome-button/src/themes/cartman';

import {
	vmin,
	vmax
} from '../services/viewport';

import {
	fetchHighScores,
	mergeHighScores,
	saveHighScores
  } from '../storage/highScoreStorage';

import {
	HIGHSCORE,
	colorPrimaryDark,
	colorBlue,
	colorBlueText,
	fontFamily
} from '../constants';


export default class HighScore extends Component {

	constructor(props) {
		super(props);
		this.state = { 
			highScores: [],
			showResult:false
		};
	}

	componentDidMount(){
		this.updateHighScores(this.props.currentScore);
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

	async updateHighScores(total) {
		try {
		  let highScores = await fetchHighScores();
		  highScores = mergeHighScores(highScores, total);
		  saveHighScores(highScores);
		  this.setState({ highScores });
		} catch (error) {
		  console.log('Error fetching High Scores', error);
		}
	}

	render() {
		return (
			<View>
				<AwesomeButtonCartman style= {styles.container} type="primary"  backgroundColor={colorBlue} backgroundDarker={colorPrimaryDark} paddingTop={5} onPress={ this.showResult.bind(this) } >
						<Text style={styles.buttonText}>{HIGHSCORE}</Text>
				</AwesomeButtonCartman>
				{(this.state.showResult) ?
					<Result data ={this.state.highScores} onCloseResult={this.closeResult.bind(this)} /> : <View></View> 
				}
			</View>
		);
	}

}

const styles = StyleSheet.create({
	container:{
		position: 'absolute', 
		left: 20 * vmin, 
		top: 50 * vmax
	},
	buttonText: {
		color:colorBlueText,
		fontFamily:fontFamily,
		fontSize:16,
		padding:10
	}
});