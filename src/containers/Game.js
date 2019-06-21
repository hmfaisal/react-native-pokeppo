/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  AppState
} from 'react-native';

import Sound from 'react-native-sound';
import firebase from 'react-native-firebase';

import {vw, vh, vmin, vmax} from '../services/viewport';

import Bird from "../components/Bird";
import Death from "../components/Death";
import PipeUp from "../components/PipeUp";
import PipeDown from "../components/PipeDown";
import GameOver from "../components/GameOver";
import Score from "../components/Score";
import Invisible from "../components/Invisible";
import Ground from "../components/Ground";
import Start from "../components/Start";
import StartAgain from "../components/StartAgain";
import HighScore from '../components/HighScore';
import Info from '../components/Info';

import BgImg1 from '../assets/images/bg1.gif';
import BgImg2 from '../assets/images/bg2.gif';
import BgImg3 from '../assets/images/bg3.gif';
import BgImg4 from '../assets/images/bg4.gif';
import BgImg5 from '../assets/images/bg5.gif';
import BgImg6 from '../assets/images/bg6.gif';
import BgImg7 from '../assets/images/bg7.gif';
import BgImg8 from '../assets/images/bg8.gif';
import BgImg9 from '../assets/images/bg9.gif';
import BgImg10 from '../assets/images/bg10.gif';
import Death1 from '../assets/images/death.gif';

import Bird1 from '../assets/images/bird1.gif';
import Bird2 from '../assets/images/bird2.gif';
import Bird3 from '../assets/images/bird3.gif';
import Bird4 from '../assets/images/bird4.gif';
import Bird5 from '../assets/images/bird5.gif';
import Bird6 from '../assets/images/bird6.gif';
import Bird7 from '../assets/images/bird7.gif';
import Bird8 from '../assets/images/bird8.gif';
import Bird9 from '../assets/images/bird9.gif';
import Bird10 from '../assets/images/bird10.gif';
import Bird11 from '../assets/images/bird11.gif';
import Bird12 from '../assets/images/bird12.gif';
import Bird13 from '../assets/images/bird13.gif';
import Bird14 from '../assets/images/bird14.gif';
import Bird15 from '../assets/images/bird15.gif';

import PipeUpImg1 from '../assets/images/pipe-up1.png';
import PipeUpImg2 from '../assets/images/pipe-up2.png';
import PipeUpImg3 from '../assets/images/pipe-up3.png';
import PipeUpImg4 from '../assets/images/pipe-up4.png';
import PipeUpImg5 from '../assets/images/pipe-up5.png';
import PipeUpImg6 from '../assets/images/pipe-up6.png';
import PipeUpImg7 from '../assets/images/pipe-up7.png';
import PipeUpImg8 from '../assets/images/pipe-up8.png';
import PipeUpImg9 from '../assets/images/pipe-up9.png';
import PipeUpImg10 from '../assets/images/pipe-up10.png';
import PipeUpImg11 from '../assets/images/pipe-up11.png';
import PipeUpImg12 from '../assets/images/pipe-up12.png';
import PipeUpImg13 from '../assets/images/pipe-up13.png';
import PipeUpImg14 from '../assets/images/pipe-up14.png';
import PipeUpImg15 from '../assets/images/pipe-up15.png';

import PipeDownImg1 from '../assets/images/pipe-down1.png';
import PipeDownImg2 from '../assets/images/pipe-down2.png';
import PipeDownImg3 from '../assets/images/pipe-down3.png';
import PipeDownImg4 from '../assets/images/pipe-down4.png';
import PipeDownImg5 from '../assets/images/pipe-down5.png';
import PipeDownImg6 from '../assets/images/pipe-down6.png';
import PipeDownImg7 from '../assets/images/pipe-down7.png';
import PipeDownImg8 from '../assets/images/pipe-down8.png';
import PipeDownImg9 from '../assets/images/pipe-down9.png';
import PipeDownImg10 from '../assets/images/pipe-down10.png';
import PipeDownImg11 from '../assets/images/pipe-down11.png';
import PipeDownImg12 from '../assets/images/pipe-down12.png';
import PipeDownImg13 from '../assets/images/pipe-down13.png';
import PipeDownImg14 from '../assets/images/pipe-down14.png';
import PipeDownImg15 from '../assets/images/pipe-down15.png';

import {INTERSTITIAL_ADD_ID} from '../constants';

const bgImages= [BgImg1,BgImg2,BgImg3,BgImg4,BgImg5,BgImg6,BgImg7,BgImg8,BgImg9,BgImg10];
const birds= [Bird1,Bird2,Bird3,Bird4,Bird5,Bird6,Bird7,Bird8,Bird9,Bird10,Bird11,Bird12,Bird13,Bird14,Bird15];
const pipeUps= [PipeDownImg1,PipeDownImg2,PipeDownImg3,PipeDownImg4,PipeDownImg5,PipeDownImg6,PipeDownImg7,PipeDownImg8,PipeDownImg9,PipeDownImg10,PipeDownImg11,PipeDownImg12,PipeDownImg13,PipeDownImg14,PipeDownImg15];
const pipeDowns=[PipeUpImg1,PipeUpImg2,PipeUpImg3,PipeUpImg4,PipeUpImg5,PipeUpImg6,PipeUpImg7,PipeUpImg8,PipeUpImg9,PipeUpImg10,PipeUpImg11,PipeUpImg12,PipeUpImg13,PipeUpImg14,PipeUpImg15];

let myReqAnimationId;
let time  = new Date() ;
let requestAnimation = requestAnimationFrame;

const deadSound = new Sound('dead.mp3', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    return;
  }
});
const scoreSound = new Sound('collectcoin.mp3', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    return;
  }
});
const bounceSound = new Sound('jump.mp3', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    return;
  }
});

const advert = firebase.admob().interstitial(INTERSTITIAL_ADD_ID);
const AdRequest = firebase.admob.AdRequest;
const request = new AdRequest();

export default class Game extends Component {

  constructor() {
    super();
    this.state = { 
      rotation: 0,
      background:BgImg1,
      imgSrcIndex:0,
      birdSrc:Bird1,
      pipeUpSrc:PipeDownImg1,
      pipeDownSrc:PipeUpImg1,
      appState: AppState.currentState
    }; 
  }

  componentDidMount() { 
    this.setState({
      background:bgImages[Math.floor(Math.random() * bgImages.length)]
    })
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(nextState.gameOver){
      return false;
    }
    return true;
  }

  componentWillUpdate(nextProps, nextState) {
    if(this.props.bird.position.y < nextProps.bird.position.y){
      this.setState({  rotation : 30  })
    }
    else if (this.props.bird.position.y > nextProps.bird.position.y){
      this.setState({  rotation : -30  })
    }
    if(this.props.score!==nextProps.score){
      scoreSound.play();
      if(this.props.score !== 0 && this.props.score%10 === 0){
        this.updateImgSrc();
      }
    }
    if (nextProps.gameOver) {
      deadSound.play();
      this.showAd();
      this.setState({
        gameOver : true,
        background:bgImages[Math.floor(Math.random() * bgImages.length)],
        imgSrcIndex:0,
        birdSrc:Bird1,
        pipeUpSrc:PipeDownImg1,
        pipeDownSrc:PipeUpImg1
      },
      cancelAnimationFrame(myReqAnimationId)
      );  
    }
  }

  _backgroundState(state) {
    return state.match(/inactive|background/);
  }

  _handleAppStateChange = (nextAppState) =>{
    if (this._backgroundState(this.state.appState)) {
      this.props.doGamePause();
    } else if (this._backgroundState(this.state.appState) && (nextAppState === 'active')) {
      this.showAd();
    }
    this.setState({appState: nextAppState});
  };

  requestAd(){
    advert.loadAd(request.build());
    advert.on('onAdLoaded', () => {
      console.log('Advert ready to show.');
    });
  }

  showAd(){
    if (advert.isLoaded()) {
      advert.show(); 
    }
  }

  updateGround(){
    this.props.updateGround();
  }

  update() {
    var timediff = new Date() - time;
    time = new Date();
    this.props.tick(timediff);
    myReqAnimationId =  requestAnimation(this.update.bind(this))
  }


  startFlappyBird(){
    this.props.startGame();
    time = new Date();
    this.requestAd();
    this.setState({gameOver : false})
    myReqAnimationId = requestAnimation(this.update.bind(this));
  }

  startFlappyBirdAgain(){
    this.props.startGameAgain();
    time = new Date();
    this.requestAd();
    this.setState({
      gameOver : false,
      background:bgImages[Math.floor(Math.random() * bgImages.length)]
    });
    myReqAnimationId = requestAnimation(this.update.bind(this));
  }

  clickMeToBounce() {
    bounceSound.play();
    this.props.bounce();
  }

  updateImgSrc() {
    let {imgSrcIndex} = this.state;
    if(imgSrcIndex<birds.length && this.props.score<10*birds.length){
      imgSrcIndex++;
      this.setState({
        imgSrcIndex:imgSrcIndex,
        birdSrc: birds[imgSrcIndex],
        pipeUpSrc: pipeUps[imgSrcIndex],
        pipeDownSrc: pipeDowns[imgSrcIndex]
      })
    }else{
        imgSrcIndex=Math.floor(Math.random() * birds.length);
        this.setState({
          imgSrcIndex:imgSrcIndex,
          birdSrc: birds[imgSrcIndex],
          pipeUpSrc: pipeUps[imgSrcIndex],
          pipeDownSrc: pipeDowns[imgSrcIndex]
        })
    } 
  }

  render() {
    if(this.props.gameOver){
      
    }
    const {birdSrc,pipeUpSrc,pipeDownSrc,background} = this.state;
    return (
      <TouchableOpacity activeOpacity={1} onPress={ this.clickMeToBounce.bind(this) }  style={ styles.image} >
        <ImageBackground
          resizeMode="cover"
          style={ styles.image }
          source={background}>
          <View  style={{ position: 'absolute', top: 0, left: 0 }}>

            { !this.props.start  ?  
              <View>
                <Start onStart= { this.startFlappyBird.bind(this) } /> 
                <Info />
              </View>
              : <View></View> 
            }

            <PipeUp src={pipeUpSrc} x ={this.props.pipeUp.position.x * vmin}   y ={this.props.pipeUp.position.y}
              height = {this.props.pipeUp.dimension.height}
              width = { this.props.pipeUp.dimension.width } />

            <PipeUp src={pipeUpSrc} x ={this.props.pipeUpO.position.x * vmin}   y ={this.props.pipeUpO.position.y}
              height = {this.props.pipeUpO.dimension.height}
              width = { this.props.pipeUpO.dimension.width } />

            <Ground x ={this.props.ground.position.x * vmin}   y ={this.props.ground.position.y}
              height = {this.props.ground.dimension.height}
              width = { this.props.ground.dimension.width } />
            <Ground x ={this.props.groundO.position.x * vmin}   y ={this.props.groundO.position.y}
              height = {this.props.groundO.dimension.height}
              width = { this.props.groundO.dimension.width } />

            <PipeDown src={pipeDownSrc} x ={this.props.pipeDown.position.x * vmin}   y ={this.props.pipeDown.position.y * vmax}
              height = {this.props.pipeDown.dimension.height}
              width = { this.props.pipeDown.dimension.width }   />
            <PipeDown src={pipeDownSrc} x ={this.props.pipeDownO.position.x * vmin}   y ={this.props.pipeDownO.position.y * vmax}
              height = {this.props.pipeDownO.dimension.height}
              width = { this.props.pipeDownO.dimension.width }   />

            { (this.props.gameOver && this.props.start)  ? 
              <Death src={Death1} animate={this.state.animate}  />: 
              <Bird src={birdSrc} x={ this.props.bird.position.x * vw} y={  this.props.bird.position.y * vh} rotation={this.state.rotation} animate={this.state.animate}
                height = {this.props.bird.dimension.height}
                width = { this.props.bird.dimension.width }  />
            }
              <Score score = { this.props.score }  />

              {  (this.props.gameOver && this.props.start) ?
                <View>
                  <GameOver />
                  <StartAgain onStartAgain = { this.startFlappyBirdAgain.bind(this)} />
                  <HighScore currentScore={this.props.score} />
                </View>
                : <View></View>
              }

          </View>
        </ImageBackground>
      </TouchableOpacity>

    );
  }
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: undefined,
    height:undefined
  }
})
