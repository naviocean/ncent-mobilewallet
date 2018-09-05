import React, {Component} from 'react';
import {Linking, Alert, Button, TextInput, Text, View, StyleSheet, TouchableHighlight, TouchableOpacity, TouchableNativeFeedback, TouchableWithoutFeedback  } from 'react-native';
import {connect} from 'react-redux';
import {userUpdate, verifyCode, createUser} from '../../Actions';
import {Spinner} from '../Common';
import {Actions} from 'react-native-router-flux';
import {Icon} from 'react-native-elements';


class VerifyEmail extends Component {


  onEnter() {
    const {veri_code, first, last, email, phone, userPin} = this.props;
    this.props.createUser({veri_code, first, last, email, phone, userPin});
  }
  componentWillReceiveProps(newProps) {
  	// if (newProps.verified === true) {
  	// 	const {first, last, email, username, phone, userPin} = newProps;
  	// 	Actions.TokensScreen();
   //      // this.props.createUser({first, last, email, username, phone, userPin});
  	// }
  }
  renderError() {
  	console.log("rendering error");
    if (this.props.error) {
      return (
        <View> 
          <Text style={styles.errorTextStyle}>
            {this.props.error}
          </Text>
        </View>
      );
    }
    else if (this.props.email_veri_error) {
    	return (
        <View> 
          <Text style={styles.errorTextStyle}>
            {this.props.email_veri_error}
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
      <TouchableOpacity onPress= {this.onEnter.bind(this)}>
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
        <Text style = {styles.informationTextBold}> For the final step, verify your email and we will make you an account </Text>

	  		<View style={{margin: 12, marginTop: 20, marginBottom: 0}}>
	          <TextInput
	            style={{height: 100, paddingLeft: 30, fontSize: 25, backgroundColor: '#F8F8F8'}}
	            placeholder="your code here"
	            onChangeText={(text) => this.props.userUpdate({prop:'veri_code', value: text})}
	            value={this.props.veri_code}
	          />
	        </View>

	        {this.renderError()}
	        {this.renderEnterButton()}
	        <Text style = {styles.informationText}> Check your email for the verifcation code </Text>
	        <View style = {{marginTop: 10}}>
	        	<Button onPress={() => {}} 
          		title="Resend code"
          		color={'#4c3e99'}
          		style={{paddingLeft: 100}}
          		></Button>
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
              
            </View>
          </TouchableWithoutFeedback>
	      	<Text style={styles.navBarHeader}>Verify Your Email</Text>
	        <View style={{justifyContent: 'center', paddingLeft: 10}}>
	          
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

const mapStateToProps = (state) => {
  const {first, last, email, username, phone, pin, confirm, error, loading, veri_code, email_veri_error, userPin, verified} = state.signup;
  return {first, last, email, username, phone, pin, confirm, error, loading, veri_code, email_veri_error, userPin, verified};
}

module.exports = connect(mapStateToProps, {userUpdate, verifyCode, createUser})(VerifyEmail);
