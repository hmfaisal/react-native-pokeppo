/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import { View, Image, StyleSheet } from 'react-native';

import {vmin, vmax} from '../services/viewport';

export default class Death extends Component {

  constructor(props) {
    super(props);
    this.state = {
      margin: 0
    };
  }

  render() {
    return (
      <View style={{
        position: 'absolute',
        left: 30 * vmin ,
        top: 60 * vmax ,
        width: 40*vmin,
        height: 40*vmin,
        overflow: 'hidden',
      }}>
        <View style={ { marginTop: -this.state.margin*vmin} }>
          <Image source={this.props.src} resizeMode="stretch" style={styles.birdContainer} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
	birdContainer: {
		width: 40*vmin,
    height: 40*vmin
	}
});
