import React, {Component} from 'react';
import {Linking, Alert, Button, TextInput, Text, View, StyleSheet, TouchableHighlight, TouchableOpacity, TouchableNativeFeedback, TouchableWithoutFeedback  } from 'react-native';
import {connect} from 'react-redux';
import {Spinner} from '../Common';
import {Actions} from 'react-native-router-flux';
import {Icon} from 'react-native-elements';
import {investorInfoUpdate} from '../../Actions';

class InvestorScreen1 extends Component {


  onCodeChange(text) {
    this.props.invitationCodeChanged(text);
  }
  onYesPress() {
    this.props.investorInfoUpdate({prop:'resp1', value: true});
    Actions.InvestorScreen2();
  }
  onNoPress() {
    this.props.investorInfoUpdate({prop:'resp1', value: false});
    Actions.InvestorScreen2();
  }
  renderError() {
    if (this.props.error) {
      return (
        <View> 
          <Text style={styles.errorTextStyle}>
            {this.props.error}
          </Text>
        </View>
      );
    }
    return (
        <View> 
          <Text style={styles.errorTextStyle}>
             {' '}
          </Text>
        </View>
      );
  }

  

  

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.navBar}>
          <TouchableWithoutFeedback onPress={() => Actions.TokensScreen()}>
            <View>
              <Text style={styles.navBarButton}>Cancel</Text>
            </View>
          </TouchableWithoutFeedback>
	      	<Text style={styles.navBarHeader}>Pre-Screen</Text>
	        <Text style={styles.navBarButton}></Text>
        </View>

        <View>
          <Text style={styles.informationTextBold}> Are you an accredited investor? </Text>
          <Text style={styles.informationTextLess}> Did you earned income that exceeded $200,000 (or $300,000
together with a spouse) in each of the prior two years,
and reasonably expect the same for the
current year? </Text>
          <Text style={styles.informationTextBoldLess}> OR </Text>
          <Text style={styles.informationTextLess}> Do you have a net work of at least $1,000,000.00, either alone or together with a spouse (excluding the value of your primary residence)? </Text>
          <Button title="Get more info" color={'#4c3e99'} onPress={ ()=>{ Linking.openURL('https://www.sec.gov/files/ib_accreditedinvestors.pdf')}} />
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <TouchableOpacity onPress= {this.onYesPress.bind(this)}>
                <View style = {{backgroundColor: '#5c4da0', alignItems: 'center', 
                                justifyContent: 'center', borderRadius: 50, height: 80, width: 80, marginBottom: 15, marginHorizontal: 30, marginTop: 30}}
                       >
                       <Text style={{color:'white', fontSize: 25}}> Yes </Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress= {this.onNoPress.bind(this)}>
                  <View style = {{backgroundColor: '#5c4da0', alignItems: 'center', 
                                  justifyContent: 'center', borderRadius: 50, height: 80, width: 80, marginBottom: 15, marginHorizontal: 30, marginTop: 30}}
                         >
                         <Text style={{color:'white', fontSize: 25}}> No </Text>
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
  errorTextStyle: {
    margin: 3,
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  },
  successTextStyle: {
    margin: 5,
    fontSize: 20,
    textAlign: 'center',
    alignSelf: 'center',
    color: 'black'
    //color: '#5c4da0'
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
  informationText: {
    marginTop: 0,
    marginBottom: 10,
    margin: 40,
    fontSize: 17,
    textAlign: 'center',
    alignSelf: 'center',
    color: 'black'
    //color: '#5c4da0'
  },
  informationTextLess: {
    marginTop: 10,
    margin: 40,
    marginBottom: 10,
    fontSize: 17,
    textAlign: 'center',
    alignSelf: 'center',
    color: 'black'
    //color: '#5c4da0'
  },
  informationTextBold: {
    fontWeight: 'bold',
    marginTop: 30,
    fontSize: 20,
    textAlign: 'center',
    alignSelf: 'center',
    color: 'black'
    //color: '#5c4da0'
  },
  informationTextBoldLess: {
    fontWeight: 'bold',
    marginTop: 0,
    fontSize: 20,
    textAlign: 'center',
    alignSelf: 'center',
    color: 'black'
    //color: '#5c4da0'
  }
});

const mapStateToProps = state => {
  const {code, error, success, loading, resp1} = state.whitelist;
  return {code, error, success, loading, resp1};

};

module.exports = connect(mapStateToProps, {investorInfoUpdate})(InvestorScreen1);
