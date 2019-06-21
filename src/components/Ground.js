import React, { Component } from 'react';
import { View, Image } from 'react-native';
import firebase from 'react-native-firebase';

import {vmin, vmax} from '../services/viewport';
import Bg from '../assets/images/bg-brow.png';
import {BANNER_ADD_ID} from '../constants';

export default class Ground extends Component{

	constructor(props){
		super(props);
	}
	
	render(){
		//const Banner = firebase.admob.Banner;
		//const AdReq = firebase.admob.AdRequest;
		//const req = new AdReq();
		return(
			<View  style={{  position : 'absolute', left : this.props.x , top : this.props.y * vmax  }}  >
				<Image  resizeMode="stretch" source ={Bg} 
				 style ={{ width : this.props.width * vmin, height : this.props.height  *vmax }}   />
				 <View style={{  position : 'absolute', left : 0 , bottom : 0, zIndex:1004 }}>
					 {/*
					 <Banner
						unitId={BANNER_ADD_ID}
						size={'SMART_BANNER'}
						request={req.build()}
						onAdLoaded={() => {
							console.log('Advert loaded');
						}}
					/>
					*/}
				 </View>
			</View>
		);
	}

}