import {Provider} from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './Reducers';
import RouterComponent from './Components/Navigation.js';

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

// Main App class
export default class App extends Component {


  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>       
        <RouterComponent />

      </Provider>
    );
  }
}


// see here: https://www.youtube.com/watch?v=ifXXjXifD8g to see where this came from
// if you need it in development:
// <key>NSAppTransportSecurity</key>
// <dict>
// 	<key>NSExceptionDomains</key>
// 	<dict>
// 		<key>localhost</key>
// 		<dict>
// 			<key>NSExceptionAllowsInsecureHTTPLoads</key>
// 			<true/>
// 		</dict>
// 	</dict>
// </dict>