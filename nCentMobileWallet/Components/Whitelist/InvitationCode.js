import React, {Component} from 'react';
import {Linking, Alert, Button, TextInput, Text, View, StyleSheet, TouchableHighlight, TouchableOpacity, TouchableNativeFeedback, TouchableWithoutFeedback  } from 'react-native';
import {connect} from 'react-redux';
import {invitationCodeChanged} from '../../Actions';
import {Spinner} from '../Common';
import {Actions} from 'react-native-router-flux';
import {Icon} from 'react-native-elements';

// We aren't using this file right now
class InvitationCode extends Component {


  onCodeChange(text) {
    this.props.invitationCodeChanged(text);
  }
  onButtonPress() {
    Actions.InvestorScreen1();
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

  

  renderEnterButton() {
    if (this.props.loading) {
      return (<Spinner size="large"/>);
    }
    return (
      <TouchableOpacity onPress= {this.onButtonPress.bind(this)}>
              <View style = {{backgroundColor: '#5c4da0', alignItems: 'center', 
                              justifyContent: 'center', borderRadius: 30, height: 50, margin: 70, marginBottom: 30, marginTop: 0}}
                     >
                     <Text style={{color:'white', fontSize: 25}}> Enter </Text>
              </View>
        </TouchableOpacity>
    )
  }

  renderAuthorizedContent() {
    // for investors once they've recieved an authorization token through email
  	if (true) {
  		return (
  		<View>
        <Text style = {styles.informationTextBold}> To begin the pre-screen, enter your code below </Text>

	  		<View style={{margin: 12, marginTop: 20, marginBottom: 0}}>
	          <TextInput
	            style={{height: 100, paddingLeft: 30, fontSize: 25, backgroundColor: '#F8F8F8'}}
	            placeholder="your code here"
	            onChangeText={this.onCodeChange.bind(this)}
	            value={this.props.code}
	          />
	        </View>

	        {this.renderError()}
	        {this.renderEnterButton()}
	        <Text style = {styles.informationText}> Check your email for the  </Text>
	     </View>  
  		)
  	}
    // screen we'll show if not on our whitelist. edit this slightly come production
  	else {
  		return (
  		<View >
        <Text style = {styles.informationTextBold} > Our investor whitelist is not yet finalized </Text>
  			<Text style = {styles.informationTextLess}> Therefore, this account is not 
  			yet authorized to purchase our currency. However, if you have not already, you can sign up for a chance to get early access to the whitelist. </Text>
    		<View style={{paddingHorizontal: 30}}>
          <Button onPress={() => Linking.openURL('https://ncent.io')} 
          title="Sign up on our website for a chance to get whitelist access"
          color={'#4c3e99'}
          style={{paddingLeft: 100}}
          >         
         </Button>
        </View>
        <Text style = {styles.informationTextLess}> If you used a different email to sign up for the app and 
        our whitelist waiting list, but you received an autorization code, click below. </Text>
        
        <View style={{paddingHorizontal: 30}}>
        	<Button onPress={() => {}} 
    			title="I got a code but used a different email for my wallet and my whitelist access"
    			color={'#4c3e99'}
          style={{paddingLeft: 100}}
    			>  				
  			  </Button>
        </View>
  		</View>
  		
  		)
  	}
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.navBar}>
          <TouchableWithoutFeedback onPress={() => Actions.drawerOpen()}>
            <View style={{justifyContent: 'center', paddingLeft: 10}}>
              <Icon
                size={30}
                name='menu'
                color='#4c3e99' />
            </View>
          </TouchableWithoutFeedback>
	      	<Text style={styles.navBarHeader}>Become an Investor</Text>
	        <View style={{justifyContent: 'center', paddingLeft: 10}}>
	          <Icon
	            size={30}
	            name='menu'
	            color='#0000' />
	        </View>
        </View>
        {this.renderAuthorizedContent()}

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
    marginTop: 30,
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
  }
});

const mapStateToProps = state => {
  const {code, error, success, loading} = state.whitelist;
  return {code, error, success, loading};

};

module.exports = connect(mapStateToProps, 
  {invitationCodeChanged})(InvitationCode);
