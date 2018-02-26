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

const defaultGetStateForAction = StackNav.router.getStateForAction;
let lastNavigationAction = null;

StackNav.router.getStateForAction = (action, state) => {
    const time = Date.now();

    if(lastNavigationAction === null) {
        lastNavigationAction = action;
        lastNavigationAction.time = time;

        return defaultGetStateForAction(action, state);
    }
    else if(time - lastNavigationAction.time < 1000) {

        return null;
    }
    else {
        lastNavigationAction = action;
        lastNavigationAction.time = time;
        return defaultGetStateForAction(action, state);
    } 
};
