'use strict';
import React, { Component } from 'react';
import { StackNav } from './config/router';
import * as firebase from 'firebase';

  // Set the configuration for your app
  // TODO: Replace with your project's config object
  const config = {
    apiKey: "apiKey",
    authDomain: "projectId.firebaseapp.com",
    databaseURL: "https://databaseName.firebaseio.com",
    storageBucket: "bucket.appspot.com"
  };
  firebase.initializeApp(config);

export default class App extends Component {
  render () {
    return (
      <StackNav />
    );
  }
}