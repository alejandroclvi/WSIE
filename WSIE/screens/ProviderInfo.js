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
import { Icon } from 'react-native-elements'
import Gadgets from '../components/Gadgets';
import MenuComponent from '../components/MenuComponent';

export default class ProviderInfo extends Component {

    handleCloseScreen = () => {
        this.props.navigation.goBack();
    };

    render () {
        const menu = [{
            data:[{name:'test', price:'0.99', desc:'test', category:'Bakery'}],
            title:'Bakery'
        }]
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.toBanner}>
                        <Icon onPress={this.handleCloseScreen} name="close" type="font-awesome" size={35} color={'#E53A40'} containerStyle={styles.topBarIcon}/>
                    </View>
                    <Image style = {styles.coverImg} source={{uri:'https://duyt4h9nfnj50.cloudfront.net/sku/f662d4a041512a5cac801c4e0f223fc0'}} />    
                </View>
                <Gadgets />

                <View style={{marginTop:30}} />

                <View style={styles.menuBar}>
                    <Text style={styles.menuLabel}>MENU</Text>
                </View>

                <MenuComponent menu={menu} />



            </View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        width:'100%',
        height:'35%',
        backgroundColor:'grey',
    },
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
        height:80,
    },
    topBarIcon: {
        paddingTop:40,
        position:'absolute',
        right:'7%'
    },
    menuBar: {
        width:'100%',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        marginTop:10,
    },
    menuLabel: {
        fontSize:16,
        fontWeight:'bold'
    },
    mapContainer: {
        width:'94%',
        height:150,
        borderRadius:5,
        overflow:'hidden',
        marginTop:5,
    }
});