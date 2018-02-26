"use strict";
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import ImageLoad from 'react-native-image-placeholder';

export default class MenuItem extends Component {
  render() {
    return(
        <View style={styles.menuItemContainer}>
            <View style={styles.menuItem}>
                <View style={styles.detailsContainer}>
                  <Text style={styles.nameTxt}> { this.props.name || 'Name' } </Text>
                  <Text style={styles.descriptionTxt}> { this.props.desc || 'Product description.' } </Text>
                  <Text style={styles.priceTxt}> { this.props.price || '$4.99' } </Text>
                </View>
                {(this.props.url !== undefined && this.props.url !==null)?
                  <View style={{height:'75%', width:'35%'}}>
                    <ImageLoad 
                      resizeMode={'cover'}
                      backgroundColor='white'
                      style={{ height:'100%', width:'100%' }} 
                      source={{uri:this.props.url}} 
                    />  
                  </View>
                :
                null
                }
            </View>   
        </View>
     );
  }
}

const styles = StyleSheet.create({
  menuItemContainer: {
    width:'100%',
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'stretch',
    backgroundColor:'white',
  },
  menuItem: {
      width:'100%',
      height:165,
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      paddingLeft:15,
      paddingRight:15,
      backgroundColor:'white',
  },
  priceTxt: {
    color:'grey',
    marginTop:7,
    fontSize:12,
  },
  nameTxt: {
    fontSize:16,
    marginTop:7,
  },
  descriptionTxt: {
    color:'grey',
    marginTop:7,
  },
  detailsContainer: {
    height: '70%',
    width:'60%',
    backgroundColor:'white'
  }
});
