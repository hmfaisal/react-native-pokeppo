import React, { Component } from 'react';
import { View, Image } from 'react-native';

import {vmin, vmax} from '../services/viewport';

export default class PipeUp extends Component{

	constructor(props){
		super(props);
	}

	render(){
		return(
			<View  style={{ position : 'absolute', left : this.props.x , top : this.props.y  }}  >
				<Image resizeMode="stretch"  source ={this.props.src}
				   style ={{ width : this.props.width * vmin, height : this.props.height  *vmax }}   />
			</View>
		);
	}

}