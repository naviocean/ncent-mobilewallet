import React, {Component} from 'react';
import {Linking, Alert, Button, TextInput, Text, View, StyleSheet, TouchableHighlight, TouchableOpacity, TouchableNativeFeedback, TouchableWithoutFeedback  } from 'react-native';
import {connect} from 'react-redux';
import {Spinner} from '../Common';
import {Actions} from 'react-native-router-flux';
import {Icon} from 'react-native-elements';
import {investorInfoUpdate, submitWhitelistInfo} from '../../Actions';

class InvestorScreen3 extends Component {

  recordResponse() {
    const {resp1, resp2, usd, btc, eth} = this.props;
    return submitWhitelistInfo({resp1, resp2, usd, btc, eth});
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

  renderSubmitButton() {
    if ((+this.props.usd >= 1000 || +this.props.btc >= 1.00 || +this.props.eth >= 5.00) && (+this.props.usd <= 100000000 && +this.props.btc <= 2500 && +this.props.eth <= 55000 )) {
      return (
        <View style={{margin: 30, marginHorizontal: 70}}>
          <TouchableOpacity onPress={()=> this.recordResponse()}>
                <View style = {{backgroundColor: '#5c4da0', alignItems: 'center', 
                                justifyContent: 'center', borderRadius: 30, paddingRight: 50, paddingLeft: 50, height: 40, margin: 0, marginTop: 0}}
                       >
                       <Text style={{color:'white', fontSize: 18}}> Submit </Text>
                </View>
          </TouchableOpacity>
        </View>
      )
    }
  }

  renderTopSubmitButton() {
    if ((+this.props.usd >= 1000 || +this.props.btc >= 1.00 || +this.props.eth >= 5.00) && (+this.props.usd <= 100000000 && +this.props.btc <= 2500 && +this.props.eth <= 55000 )) {
      return (
          <TouchableWithoutFeedback onPress={() => this.recordResponse()}>
            <View>
              <Text style={styles.navBarButton}>Submit</Text>
            </View>
          </TouchableWithoutFeedback>
      )
    }
    else return (
        <Text style={styles.navBarButton}></Text>
      )
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
          {this.renderTopSubmitButton()}
        </View>

        <View style = {{marginHorizontal: 20}}>
          <Text style={styles.informationTextBold}> How much allocation would you like to request? </Text>
          <Text style={styles.informationTextLess}> (approximate) </Text>
            <View style={{margin: 5, marginTop: 13, flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{marginHorizontal: 5, fontSize: 25}}> USD </Text>
              <TextInput
                style={{height: 60, flex: 1, paddingLeft: 30, fontSize: 20, backgroundColor: '#F8F8F8'}}
                placeholder="0.00"
                keyboardType="numeric"
                onChangeText={(text) => this.props.investorInfoUpdate({prop:'usd', value: text})}
                value={this.props.usd}
              />
              <View style = {{width: 80}}>
                <Text style={{marginHorizontal: 5, paddingLeft: 5, fontSize: 15}}>1000 - $10 M </Text>
              </View>
            </View>
            
            <View style={{margin: 5, marginTop: 25, flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{marginHorizontal: 5, fontSize: 25}}> BTC </Text>
              <TextInput
                style={{height: 60, flex: 1, paddingLeft: 30, fontSize: 20, backgroundColor: '#F8F8F8'}}
                placeholder="0.00"
                keyboardType="numeric"
                onChangeText={(text) => this.props.investorInfoUpdate({prop:'btc', value: text})}
                value={this.props.btc}
              />
              <View style = {{width: 80}}>
                <Text style={{marginHorizontal: 5, paddingLeft: 5, fontSize: 15, textAlign: 'left'}}>1.00 - 2000 </Text>
              </View>
            </View>

            <View style={{margin: 5, marginTop: 25, flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{marginHorizontal: 5, fontSize: 25}}> ETH </Text>
              <TextInput
                style={{height: 60, flex: 1, paddingLeft: 30, fontSize: 20, backgroundColor: '#F8F8F8'}}
                placeholder="0.00"
                keyboardType="numeric"
                onChangeText={(text) => this.props.investorInfoUpdate({prop:'eth', value: text})}
                value={this.props.eth}
              />
              <View style = {{width: 80}}>
                <Text style={{marginHorizontal: 5, paddingLeft: 5, fontSize: 15}}>5.00 -   50 K </Text>
              </View>
            </View>

            {this.renderSubmitButton()}

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
    margin: 0,
    marginBottom: 10,
    fontSize: 16,
    textAlign: 'center',
    alignSelf: 'center',
    color: 'black'
    //color: '#5c4da0'
  },
  informationTextBold: {
    fontWeight: 'bold',
    marginTop: 20,
    marginHorizontal: 5,
    fontSize: 25,
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
  const {code, error, success, loading, usd, btc, eth, resp1, resp2} = state.whitelist;
  return {code, error, success, loading, usd, btc, eth, resp1, resp2};

};

module.exports = connect(mapStateToProps, {investorInfoUpdate})(InvestorScreen3);

