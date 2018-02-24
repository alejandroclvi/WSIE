"use strict";
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  SectionList
} from 'react-native';
import MenuItem from './MenuItem';

export default class MenuComponent extends Component {
  render() {
    return(
        <View style={styles.menuContainer}>
         <SectionList
              renderItem={({item, index}) => 
              <MenuItem 
                name={item.name}
                desc={item.desc}
                price={item.price}
                url={item.url}
              /> 
              }
              keyExtractor={(item, index) => index}
              renderSectionHeader={ ({section}) => 
                <View style={{flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                  <Text style={styles.sectionHeader}>{section.title}</Text> 
                  <View style={styles.separator} />
                </View> }
              sections={this.props.menu}
         />
        </View>
     );
  }
}

const styles = StyleSheet.create({
  separator: {
    height:1,
    backgroundColor:'black',
    width:13,
    marginTop:5,
    marginBottom: 15,
  },
  sectionHeader: {
    color:'black',
    fontSize:16,
    fontWeight:'bold',
    marginTop:25,
  },
  menuContainer: {
    flex:1,
    marginTop:20,
    width:'100%',
  },
});
