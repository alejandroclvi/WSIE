'use strict';
import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  Button,
  View,
  Animated,
  TouchableHighlight
} from 'react-native';
import { Icon } from 'react-native-elements';
import ImageLoad from 'react-native-image-placeholder';

export default class BigPicture extends Component {

    handleCloseScreen = () => {
        this.props.navigation.goBack();
    };

    render () {
        const uri = this.props.navigation.state.params.uri;
        return (
            <View style={styles.container}>
                <View style={styles.toBanner}>
                    <Icon onPress={this.handleCloseScreen} name="close" type="font-awesome" size={35} color={'#E53A40'} containerStyle={styles.topBarIcon}/>
                </View>
                <ImageLoad
                    backgroundColor='white'
                    resizeMode={'contain'}
                    style={styles.coverImg}
                    loadingStyle={{ size: 'large', color: 'red' }}
                    source={{ uri: uri }}
                />  
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height:'100%',
        width:'100%',
        backgroundColor: 'white',
        flexDirection:'column',
        justifyContent:'flex-start',
    },
    coverImg: {
        position:'absolute',
        zIndex:0,
        width:'100%',
        height:'100%',
    },
    toBanner:{
        width:'100%',
        position:'absolute',
        backgroundColor:'white',
        opacity:0.7,
        zIndex:1,
        height:75,
    },
    topBarIcon: {
        paddingTop:50,
        position:'absolute',
        right:'7%'
    }
});