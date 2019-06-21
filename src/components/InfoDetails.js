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
    INFO_1,
    INFO_2,
    INFO_3,
    INFO_4,
	CLOSE,
	colorPrimary,
	colorPrimaryDark,
	colorRed,
	colorRedText,
	fontFamily
} from '../constants';
    
export default class InfoDetails extends Component {
    constructor(props) {
		super(props);
    }
    
    render() {
		return (
			<View style={styles.container}>
                <Text style={{...styles.text,marginTop:30}}>{INFO_1}</Text>
                <Text style={styles.text}>{INFO_2}</Text>
                <Text style={styles.text}>{INFO_3}</Text>
                <Text style={styles.text}>{INFO_4}</Text>
                <AwesomeButton style={styles.buttonContainer} width={160} backgroundColor={colorRed} backgroundDarker={colorPrimaryDark} type="primary" onPress={() =>this.props.onCloseResult()} >
                    <Text style={styles.buttonText}>{CLOSE}</Text>
                </AwesomeButton>
            </View>
      
		);
	}
}

const styles = StyleSheet.create({
	container: {
        display:'flex',
        flexDirection: 'column',
		position: 'absolute',
		left: 5 * vmin, 
		top: 5 * vmax,
		backgroundColor:colorPrimary,
		zIndex:1002,
		width:90 * vmin,
		minHeight:90*vmax,
		shadowColor: '#fff',
		shadowOffset: { width: 0, height: 8 },
		shadowOpacity: 0.8,
		shadowRadius: 2,
		elevation: 5
	},
	text:{
        marginLeft:5,
        marginRight:5,
        marginBottom: 10,
		marginTop:10,
		fontSize: 12,
        fontFamily:fontFamily,
        textAlign:'center'
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
