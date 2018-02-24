'use strict';
import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  Button,
  View
} from 'react-native';
import Swiper from 'react-native-deck-swiper';
import ImageLoad from 'react-native-image-placeholder';


export default class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data:['https://duyt4h9nfnj50.cloudfront.net/sku/f662d4a041512a5cac801c4e0f223fc0','https://d1ralsognjng37.cloudfront.net/c91007a5-4822-476c-bbb6-44694bad15cb','https://duyt4h9nfnj50.cloudfront.net/sku/28a7dc8276f7e3ca74e84cd53d4d37b2','https://duyt4h9nfnj50.cloudfront.net/sku/dc0d0cb8300ea0a985aecf1a3bd49ae0','https://duyt4h9nfnj50.cloudfront.net/sku/be3c429d9d4d35f7868d31ecfcae0146','https://duyt4h9nfnj50.cloudfront.net/sku/56f4865966ddd6c471ce713870564643', 'https://duyt4h9nfnj50.cloudfront.net/sku/27ecfa487fc761fc17a29cd80c638371', 'https://duyt4h9nfnj50.cloudfront.net/sku/7c56a19ee53bd58a61531d6bd1b624d9', 'https://duyt4h9nfnj50.cloudfront.net/sku/f8f16686fb30b2555138db05b75bb904'],
            index:0,
        }
    }

    handleLearnMore = () => {
        const currentIndex = this.state.index;
        this.props.navigation.navigate('ProviderInfo');
    };
        
    render () {
        return (
        <View style={styles.container}>
            <Swiper
                cards={this.state.data}
                renderCard={(card) => {
                    return (
                        <View style={styles.card}>
                        <ImageLoad
                            style={{ width: '100%', height: '100%' }}
                            loadingStyle={{ size: 'large', color: 'red' }}
                            source={{ uri: card }}
                        />
                        <View style={styles.info}>
                            <Text style={styles.name}>
                            Super Duper Burger
                            </Text>
                            <Text style={styles.description}>
                            Ham, Cheese, Bacon, Lettuce, Tomatoes, Fried Onions, Fried Cheese,& Egg.
                            </Text>
                        </View>
                        </View>
                    )
                }}
                onTapCard={() => this.props.navigation.navigate('BigPicture', {uri:this.state.data[this.state.index]})}
                disableBottomSwipe={true}
                disableTopSwipe={true}
                animateOverlayLabelsOpacity={true}
                onSwipedRight={this.handleLearnMore}
                onSwiped={(cardIndex) => this.setState({count:cardIndex})}
                infinite={true}
                cardIndex={this.state.index}
                backgroundColor={'#E53A40'}>
            </Swiper>
            <View style={styles.swipeLeftBtn}>
            </View>
        </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E53A40'
  },
  card: {
    height:'100%',
    width:'100%',
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#3E4348',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  info: {
    position:'absolute',
    width:'100%',
    bottom:0,
    height:'23%',
    backgroundColor:'#3E4348',
    opacity:0.85
  },
  text: {
    textAlign: 'center',
    fontSize: 50,
    backgroundColor: 'transparent'
  },
  description:{
    fontSize:13,
    color:'white',
    fontWeight:'bold',
    marginLeft:10,
    marginRight:10
  },
  name: {
    fontSize:20,
    color:'white',
    fontWeight:'bold',
    padding: 10,
  },
});