import React, { Component } from 'react';
import { View, Text} from 'react-native';

import {vmin, vmax} from '../services/viewport';


export default class Invisible extends Component{

	constructor(props){
		super(props);
	}

	render(){
		return(
			<View  style={{  position : 'absolute', left : this.props.x , top : this.props.y*vmax  }}  >
				<Text style ={{ width : this.props.width * vmin, height : this.props.height  *vmax }}>  </Text>
			</View>
		);
	}

}