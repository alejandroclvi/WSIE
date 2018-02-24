'use strict';
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';
import { Icon } from 'react-native-elements';
import Communications from 'react-native-communications';
//import getDirections from 'react-native-google-maps-directions'; --> * need to npm install this & configure

export default class Gadgets extends Component {

    shareMsg = `Hey, check out ${this.props.truckName} this delicious food on the WISE app, now in the App Store and Google Play!`;

    handleShare = () => {
        if(Platform.OS === 'ios') {
            Communications.text('',this.shareMsg);
        } else {
            Communications.textWithoutEncoding('',this.shareMsg);
        }
    };

    handleGetDirections = () => {
        //TODO: Configure this
        /*
        const data = {
           source: {
            latitude: this.props.source.lat,
            longitude: this.props.source.lon
          },
          destination: {
            latitude: this.props.destination.lat,
            longitude: this.props.destination.lon
          },
          params: [
            {
              key: "dirflg",
              value: "w"
            }
          ]
        };
        getDirections(data);
        */
      };

    render() {
        return(
            <View style={styles.gadgetsContainer}>
                <TouchableHighlight onPress={() => Communications.phonecall(this.props.phoneNumber.toString(), true)}>
                    <View style={styles.phoneGContainer}>
                        <Icon name='phone' type="font-awesome" size={30} color="#E53A40"/>
                        <Text style={styles.label}>call</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight style={{backgroundColor:'white'}} onPress={this.handleGetDirections.bind(this)}>   
                    <View style={styles.mapGContainer}> 
                        <Icon name="map-pin" type="feather" size={30} color="#E53A40" />
                        <Text style={styles.label}>go</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight onPress={this.handleShare.bind(this)}>   
                    <View style={styles.shareGContainer}> 
                        <Icon name="share" type="font-awesome" size={30} color="#E53A40" />
                        <Text style={styles.label}>share</Text>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    gadgetsContainer: {
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-between',
        padding:10,
        paddingLeft:20,
        paddingRight:20,
        backgroundColor:'white',
    },
    phoneGContainer: {
        width:80,
        height:60,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        paddingTop:12,
        backgroundColor:'white',
    },
    mapGContainer: {
        width:80,
        height:60,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        paddingTop:4,
        backgroundColor:'white',
    },
    shareGContainer: {
        width:80,
        height:60,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        paddingTop:5,
        backgroundColor:'white',
    },
    label: {
        fontSize:14,
        marginTop:5,
    }
});