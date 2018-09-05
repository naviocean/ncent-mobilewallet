import React, {Component} from 'react';
import {Linking, Alert, Button, TextInput, Text, View, StyleSheet, TouchableHighlight, TouchableOpacity, TouchableNativeFeedback, TouchableWithoutFeedback  } from 'react-native';
import {connect} from 'react-redux';
import {Spinner} from '../Common';
import {Actions} from 'react-native-router-flux';
import {Icon} from 'react-native-elements';

class InvestorDone extends Component {

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.navBar}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={{justifyContent: 'center', paddingLeft: 10}}>
              <Icon
                size={30}
                name='menu'
                color='#0000' />
            </View>
          </TouchableWithoutFeedback>
	      	<Text style={styles.navBarHeader}>Pre-Screen</Text>
	        <View style={{justifyContent: 'center', paddingLeft: 10}}>
	          <Icon
	            size={30}
	            name='menu'
	            color='#0000' />
	        </View>
        </View>

        <View>
          <Text style={styles.informationTextBold}> Your response has been recorded. Stay tuned. </Text>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <TouchableOpacity onPress= {()=>Actions.replace("TokensScreen")}>
                <View style = {{backgroundColor: '#5c4da0', alignItems: 'center', 
                                justifyContent: 'center', borderRadius: 50, height: 50, width: 170, marginBottom: 15, marginHorizontal: 30, marginTop: 50}}
                       >
                       <Text style={{color:'white', fontSize: 25}}> Okay </Text>
                </View>
            </TouchableOpacity>
          </View>
        </View>


      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navBar: {
    flexDirection: 'row',
    paddingTop: 10,
    height: 75,
    backgroundColor: '#F8F8F8',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: .2,
    zIndex:999
  },
  navBarHeader: {
    flex: 1,
    color: '#4c3e99',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 25,
    fontSize: 20,
  },
  navBarButton: {
    color: '#4c3e99',
    textAlign:'center',
    paddingTop: 25,
    width: 64 
  },
  informationTextBold: {
    fontWeight: 'bold',
    marginTop: 60,
    fontSize: 30,
    textAlign: 'center',
    alignSelf: 'center',
    color: 'black'
    //color: '#5c4da0'
  }
});

const mapStateToProps = state => {
  const {code, error, success, loading} = state.whitelist;
  return {code, error, success, loading};

};

module.exports = connect(mapStateToProps)(InvestorDone);
