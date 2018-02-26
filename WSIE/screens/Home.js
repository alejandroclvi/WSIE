'use strict';
import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  Button,
  View,
  ActivityIndicator
} from 'react-native';
import Swiper from 'react-native-deck-swiper';
import ImageLoad from 'react-native-image-placeholder';
import { nearEachOther } from '../helpers/nearEachOther';
import * as firebase from 'firebase';
import { NEARBY_CONST_IN_MILES } from '../data/distanceConstant';


export default class Home extends Component {

    constructor(props) {
        super(props);

        this.database = firebase.database().ref('/providers');


        this.state = {
            loading:true,
            loadedData:false,
            currentUrl:'',
            cardIndex:0,
            data:[],
            lastLocation:{},
            locationEnabled:true,
            userLocation: {
                lat:0,
                lon:0,
            }
        }
    }

    componentDidMount () {
        this.getUserLocation();
        this.watchUserLocation();
        this.getPopularPlates();
    }

    componentDidUpdate(prevProps, prevState) {
        if(!prevState.loadedData && this.state.loadedData) {
            this.setState({loading:false});
        }
    }

    getUserLocation = (callback) => {
        navigator.geolocation.getCurrentPosition((position) => {
            let lat = parseFloat(position.coords.latitude);
            let lon = parseFloat(position.coords.longitude);
    
            let userCoords = {
                lat:lat,
                lon:lon,
            }

            this.setState({ 
                userLocation:userCoords,
                lastLocation:userCoords
            });
        },
        (error) => this.setState({ locationEnabled: false })
        );
    };

    watchUserLocation = () => {
        // set a listener for changes in the user location.
        this.watchId = navigator.geolocation.watchPosition((position)=> {
            var lat = parseFloat(position.coords.latitude);
            var lon = parseFloat(position.coords.longitude);
            const lastUserCoords = {
                lat:lat,
                lon:lon,
            }

            this.setState({
                userLocation:lastUserCoords
            });
            
            const lastLocation = this.state.lastLocation;

            if(!nearEachOther(lastUserCoords, lastLocation, 1)) {
                this.setState({lastLocation: lastUserCoords});
                this.getPopularPlates();
            }

        });
    };

    getPopularPlates = () => {
        this.database.on('value', snapshot => {
            const dataObj = snapshot.val();
            if(dataObj && Object.values(dataObj).length > 0) {
                let popular = [];
                let popularTruckItems = [];
                snapshot.forEach( provider => {
                    if( provider.key !== undefined) {
                        if(nearEachOther(this.state.userLocation, provider.val().location, NEARBY_CONST_IN_MILES)) {
                
                            if(provider.val().menu && provider.val().menu.hasOwnProperty('popular')) {
                                popularTruckItems = Object.values(provider.val().menu.popular.data);
                            }
                            else if(provider.val().menu && provider.val().menu.hasOwnProperty('Popular')) {
                                popularTruckItems = Object.values(provider.val().menu.Popular.data);
                            }

                            if(popularTruckItems !== null) {
                                for(let popularItem of popularTruckItems) {
                                    popularItem.key = provider.key;
                                    if(popularItem.popular){
                                        popular.push(popularItem);
                                    }
                                }
                            }    
                        }
                    }
            
                });

                this.setState({
                    data: popular,
                    loadedData:true,
                });
            }  else {
                /*
                this.setState({
                    loading:false,
                });
                */
            }
        });
    }

    handleLearnMore = () => {
        const currentIndex = this.state.cardIndex;
        const providerKey = this.state.data[currentIndex].key;
        console.log(providerKey);
        const firebaseDBRef = firebase.database().ref(`/providers/${providerKey}`);
        firebaseDBRef.once('value', snap => {
            const provider = snap.val();
            this.props.navigation.navigate('ProviderInfo', {userLocation: this.state.userLocation, provider: provider});    
        });
    };
    
    handleSwipe = (cardIndex) => {
        this.setState({cardIndex:cardIndex});
    };

    render () {
        if(!this.state.loading) {
            return (
                <View style={styles.container}>
                    <Swiper
                        cards={this.state.data}
                        renderCard={ card => {
                            return (
                                <View style={styles.card}>
                                    <View style={styles.imgContainer}>
                                        <ImageLoad
                                            backgroundColor='white'
                                            resizeMode={'contain'}
                                            style={{ width: '100%', height: '100%'}}
                                            loadingStyle={{ size: 'large', color: 'red' }}
                                            source={{ uri: card.url }}
                                        />
                                    </View>
                                    <View style={styles.info}>
                                        <Text style={styles.name}>
                                        {card.name}
                                        </Text>
                                        <Text style={styles.description}>
                                        {card.desc}
                                        </Text>
                                    </View>
                                </View>
                            );
                        }}
                        onTapCard={() => this.props.navigation.navigate('BigPicture', {uri:this.state.data[this.state.cardIndex].url})}
                        disableBottomSwipe={true}
                        disableTopSwipe={true}
                        animateOverlayLabelsOpacity={true}
                        onSwipedRight={this.handleLearnMore}
                        onSwiped={ cardIndex => this.handleSwipe(cardIndex)}
                        infinite={true}
                        cardIndex={this.state.cardIndex}
                        backgroundColor={'#E53A40'}>
                    </Swiper>
                </View>
            );
        }

        return (
            <View style={{flex:1, flexDirection:'column', backgroundColor: '#E53A40', justifyContent:'center', alignItems:'center'}}>
                
                    <ActivityIndicator
                        loading={this.state.loading}
                        size='large'
                        color='white'
                    />
                    <Text style={{marginTop:5, textAlign:'center', color:'white'}}>loading ...</Text>
                
            </View>
        );
        
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E53A40'
  },
  imgContainer: {
    width:'100%',
    height:'50%'
  },
  card: {
    height:'100%',
    width:'100%',
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#3E4348',
    flexDirection:'column',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
  },
  info: {
    position:'absolute',
    width:'100%',
    bottom:0,
    height:'50%',
    //backgroundColor:'grey',
    opacity:0.7
  },
  text: {
    textAlign: 'center',
    fontSize: 50,
    backgroundColor: 'transparent'
  },
  description:{
    fontSize:13,
    color:'black',
    fontWeight:'bold',
    marginLeft:10,
    marginRight:10
  },
  name: {
    fontSize:20,
    color:'black',
    fontWeight:'bold',
    padding: 10,
  },
  swiperContainer: {
    flex: 1,
    backgroundColor: '#E53A40'
  },
  loadingContainer: {
    width:100,
    height:100,
    borderRadius:15,
    backgroundColor:'grey',
    opacity:0.75,
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center'
  }
});