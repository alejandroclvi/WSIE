'use strict';
import React, { Component } from 'react';
import { StackNav } from './config/router';
import * as firebase from 'firebase';

// Set the configuration for your app
// TODO: Replace with your project's config object
const config = {
  apiKey: "AIzaSyCLF3TUcDztVsoxscLx7oEjJ-1xk-qz0bs",
  authDomain: "wsie-48705.firebaseapp.com",
  databaseURL: "https://wsie-48705.firebaseio.com",
  storageBucket: "wsie-48705.appspot.com"
};
firebase.initializeApp(config);

export default class App extends Component {
  render () {
    return (
      <StackNav />
    );
  }
}