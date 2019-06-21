/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import { View, Image, StyleSheet } from 'react-native';

import {vmin, vmax} from './../services/viewport';

export default class Bird extends Component {

  constructor(props) {
    super(props);
    this.state = {
      margin: 0
    };
  }

  startAnimation() {
    if(this.animating)
      return;

    this.intervalId = setInterval(()=>{ 
      this.setState({
        margin: (this.state.margin+10)%30
      })
    }, 100);

    this.animating = true;
  }

  stopAnimation() {
    if(this.animating) {
      clearInterval(this.intervalId)
      this.animating = false;
    }
  }

  componentDidMount() {
    if(this.props.animate)
      this.startAnimation();
  }

  componentWillUnmount() {
      this.stopAnimation();
  }

  componentWillUpdate(nextProps, nextState) {
    if(this.props.animate != nextProps.animate) {
      if(nextProps.animate)
        this.startAnimation();
      else
        this.stopAnimation();
    }
  }

  render() {
    return (
      <View style={{
        position: 'absolute',
        left: this.props.x ,
        top: this.props.y ,
        width: 13*vmin,
        height: 13*vmin,
        overflow: 'hidden',
        transform: [{rotate: this.props.rotation+'deg'}],
        zIndex:1100
      }}>
        <View style={ { marginTop: -this.state.margin*vmin} }>
          <Image source={this.props.src} resizeMode="stretch" style={styles.birdContainer} />
          <Image source={this.props.src} resizeMode="stretch" style={styles.birdContainer} />
          <Image source={this.props.src} resizeMode="stretch" style={styles.birdContainer} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
	birdContainer: {
		width: 13*vmin,
    height: 13*vmin
	}
});
