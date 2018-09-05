import React, {Component} from 'react';
import {Button, FlatList, TextInput, StyleSheet, Text, View,
 TouchableHighlight, TouchableOpacity, TouchableNativeFeedback, TouchableWithoutFeedback, Image  } from 'react-native';
import {Actions} from 'react-native-router-flux';
import FadeImage from 'react-native-fade-image';
import SInfo from 'react-native-sensitive-info';

class LoginOrSignup extends Component {

  componentDidMount() {
    console.log("mounted");
    SInfo.getItem("pin", {})
    .then(value => {
      console.log("PIN VALUE");
      console.log(value);
      console.log("*****");
      if (value === undefined || value === null) {
        return;
      }
      else {
        Actions.LoginScreen();
      }
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style = {{flex:2}}>
          
          <View style = {{flex:1, backgroundColor: '#1D154A'}}>
            <FadeImage 
              duration={2000}
              source={require('../Img/ncent_NOsubline_1000px_BG_blue.png')}
              style = {{width: '100%', height: '100%'}}
            />
          </View>
          
        </View>
        <View style= {{flex: 1}}>
          <TouchableOpacity style={{flex: 1}} onPress= {() => Actions.LoginScreen()}>
              <View style = {{backgroundColor: '#C4C7DA', alignItems: 'center', 
                              justifyContent: 'center', flex: 1}}
                     >
                     <Text style={{color:'white', fontSize: 30}}> Login </Text>
              </View>
          </TouchableOpacity>
          <TouchableOpacity style={{flex: 1}} onPress= {() => Actions.NameSignup()}>
              <View style = {{backgroundColor: '#6D6792', alignItems: 'center', 
                              justifyContent: 'center', flex: 1}}
                     >
                     <Text style={{color:'white', fontSize: 30}}> Create Wallet </Text>
              </View>
          </TouchableOpacity>
        </View>
        
      </View>

    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});

module.exports = LoginOrSignup;