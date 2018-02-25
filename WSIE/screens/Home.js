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
            userLocation: {
                lat:25.767934662748328,
                lon:-80.28324566001163,
            }
        }
    }

    componentDidMount () {
        this.getPopularPlates();
    }

    componentDidUpdate(prevProps, prevState) {
        if(!prevState.loadedData && this.state.loadedData) {
            this.setState({loading:false});
        }
        console.log(this.state.cardIndex);
    }

    getPopularPlates = () => {
        // loading
        //this.setState({loading: true});
        console.log("out");
        this.database.on('value', snapshot => {
            console.log("in");
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
        const currentIndex = this.state.index;
        this.props.navigation.navigate('ProviderInfo');
    };
    
    handleSwipe = (cardIndex) => {
        this.setState({cardIndex:cardIndex + 1});
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