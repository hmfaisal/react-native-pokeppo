import React, {
	Component
} from 'react';

import AwesomeButton from 'react-native-really-awesome-button';

import {
	View,
	Text,
	StyleSheet
} from 'react-native';

import {
	vmin,
	vmax
} from '../services/viewport';

import {
	SCORE,
	RANK,
	CLOSE,
	DATE,
	colorPrimary,
	colorPrimaryDark,
	colorRed,
	colorRedText,
	fontFamily
} from '../constants';

const getTopScores = (highScores) =>
	highScores
	.sort((first, second) => second.score - first.score)
	.slice(0, 10);

const Row = ({ highScore, index }) => {
	return (
		<View style={styles.item}>
			<Text style={[styles.rank, styles.text]}>
				{index + 1}.
			</Text>
			<Text style={[styles.score, styles.text]}>
				{highScore.score}
			</Text>
			<Text style={[styles.date, styles.text]}>
				{highScore.createdAt.toDateString()}
			</Text>
		</View>
	);
}
	
export default Result = ({ data,onCloseResult }) => {
	const highScores = getTopScores(data);
	return (
	  <View style={styles.container}>
			<View style={styles.tableHeader}>
				<Text style={[styles.rank, styles.text]}>{RANK}</Text>
				<Text style={[styles.score, styles.text]}>{SCORE}</Text>
				<Text style={[styles.date, styles.text]}>{DATE}</Text>
			</View>
			{
				highScores.map((highScore, index) =>
				<Row highScore={highScore} index={index} key={index} />)
			}
			<AwesomeButton style={styles.buttonContainer} width={160} backgroundColor={colorRed} backgroundDarker={colorPrimaryDark} type="primary" onPress={() =>onCloseResult()} >
				<Text style={styles.buttonText}>{CLOSE}</Text>
			</AwesomeButton>
	  </View>
	);
};

const styles = StyleSheet.create({
	container: {
		display:'flex',
		position: 'absolute',
		left: 10 * vmin, 
		top: 5 * vmax,
		backgroundColor:colorPrimary,
		zIndex:1002,
		width:80 * vmin,
		minHeight:60*vmax,
		shadowColor: '#fff',
		shadowOffset: { width: 0, height: 8 },
		shadowOpacity: 0.8,
		shadowRadius: 2,
		elevation: 5
	},
	tableHeader:{
		justifyContent: 'center',
		flexWrap: 'nowrap',
		flexDirection: 'row',
		marginBottom: 15,
		marginTop:15
	},
	thItem: {
		fontWeight: 'bold',
	},
	text:{
		fontSize: 12,
		fontFamily:fontFamily,
		textAlign:'center'
	},
	rank:{
		width:"20%"
	},
	score:{
		width:"30%"
	},
	date:{
		width:"50%"
	},
	item: {
		justifyContent: 'center',
		flexWrap: 'nowrap',
		flexDirection: 'row',
	},
	buttonContainer:{
		marginTop: 10,
		marginBottom: 10,
		alignSelf:'center'
	},
	buttonText: {
		color:colorRedText,
		fontFamily:fontFamily,
		fontSize:14,
	},
});
