'use strict';
import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  Button,
  View,
  Animated,
  TouchableHighlight,
  ScrollView
} from 'react-native';
import { Icon } from 'react-native-elements'
import Gadgets from '../components/Gadgets';
import MenuComponent from '../components/MenuComponent';
import MapComponent from '../components/MapComponent';
import ImageLoad from 'react-native-image-placeholder';

export default class ProviderInfo extends Component {

    handleCloseScreen = () => {
        this.props.navigation.goBack();
    };

    render () {
        const {
            menu,
            coverImg,
            name,
            description,
            phone,
            location
        } = this.props.navigation.state.params.provider;
        const formattedMenu = Object.values(menu).sort( category => {
            if(category.title.toLowerCase() == 'popular') {
                return -1;
            } else {
                return 1;
            }
        });
        return (
            <View style={styles.container}>
                <ScrollView style={{flex:1}}>
                <View style={styles.header}>
                    <View style={styles.toBanner}>
                        <Icon onPress={this.handleCloseScreen} name="close" type="font-awesome" size={35} color={'#E53A40'} containerStyle={styles.topBarIcon}/>
                    </View>
                    <ImageLoad 
                        backgroundColor='white'
                        style={styles.coverImg} 
                        source={{uri:coverImg}} 
                    />    
                </View>

                <Gadgets phone={phone} name={name}/>

                <View style={{flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                    <Text style={styles.label}>{name}</Text>
                    <Text style={styles.infoLabel}>{name}</Text>
                </View>

                <View style={{marginTop:15}} />

                <View style={styles.mapContainer}>
                    <MapComponent 
                        userLocationLat={25.749718515267066} 
                        userLocationLon={-80.25607891948833} 
                        truckLocationLat={25.749718515267043} 
                        truckLocationLon={-80.25607891948856} 
                        region={{
                            latitude:25.749718515267043,
                            longitude:-80.25607891948856,
                            latitudeDelta:0.018,
                            longitudeDelta:0.018,
                        }} 
                    />
                </View>

                <View style={{marginTop:15}} />

                <MenuComponent menu={formattedMenu} />
            </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        width:'100%',
        height:270,
        backgroundColor:'grey',
        marginBottom:10,
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
    label: {
        fontSize:16,
        fontWeight:'bold'
    },    
    infoLabel: {
        fontSize:14,
        color:'grey'
    },
    mapContainer: {
        width:'100%',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        marginTop:10
    }
});