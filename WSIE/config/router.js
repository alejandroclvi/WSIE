"use strict";
import React from 'react';
import { StackNavigator, TabNavigator, NavigationActions, TabBarBottom } from 'react-navigation';
import Home from '../screens/Home';
import ProviderInfo from '../screens/ProviderInfo';
import BigPicture from '../screens/BigPicture';

export const StackNav = StackNavigator({
    Home: {
        screen: Home,
    },
    ProviderInfo: {
        screen: ProviderInfo,
    },
    BigPicture: {
        screen:BigPicture,
    }
},{
    mode:'modal',
    headerMode:'none',
});
