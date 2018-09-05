import React, {Component} from 'react';
import {Alert, Button, FlatList, TextInput, StyleSheet, Text, View,
 TouchableHighlight, TouchableOpacity, TouchableNativeFeedback, TouchableWithoutFeedback  } from 'react-native';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {userUpdate, checkEmail} from '../../Actions';
import {Spinner} from '../Common';
const validator = require("email-validator");

class EmailSignup extends Component {


  renderContinueButton() {
  	if (validator.validate(this.props.email)) {
  		return (
  			<TouchableOpacity onPress={()=>this.props.checkEmail(this.props.email)}>
              <View style = {{backgroundColor: '#5c4da0', alignItems: 'center', 
                              justifyContent: 'center', borderRadius: 30, paddingRight: 50, paddingLeft: 50, height: 50, margin: 0, marginTop: 0}}
                     >
                     <Text style={{color:'white', fontSize: 25}}> Continue </Text>
              </View>
          	</TouchableOpacity>
  		)
  	}
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
    else if (this.props.email_error) {
      console.log("email error exists!");
      return (
        <View> 
          <Text style={styles.errorTextStyle}>
            {this.props.email_error}
          </Text>
        </View>
      );
    }
    console.log("no error exists!");
    return (
        <View> 
          <Text style={styles.errorTextStyle}>
             {' '}
          </Text>
        </View>
      );
  }



  renderInputForm() {
    if (this.props.loading) {
      return <Spinner size="large"/>;
    }
    return (
      <View style = {{margin: 10, marginTop: 30}}>
            <TextInput
              autoCorrect= {false}
              style={{height: 60, paddingLeft: 30, fontSize: 22, backgroundColor: '#F8F8F8'}}
              keyboardType='email-address'
              placeholder="Email"
              value={this.props.email}
              onChangeText={(text) => this.props.userUpdate({prop:'email', value: text})}
            />
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.navBar}>
          <TouchableWithoutFeedback onPress={()=> Actions.popTo("NameSignup")}>
            <View>
              <Text style={styles.navBarButton}>Back</Text>
            </View>
          </TouchableWithoutFeedback>
          <Text style={styles.navBarHeader}>Now Enter Your Email</Text>
          <TouchableWithoutFeedback >
            <View>
              <Text style={styles.navBarButton}></Text>
            </View>
          </TouchableWithoutFeedback>
        </View>

        {this.renderInputForm()}

        <View style={styles.content}>
          {this.renderError()}
          {this.renderContinueButton()}
          
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
    marginTop: 0,
    fontSize: 18,
    alignSelf: 'center',
    color: 'red'
  },
  navBar: {
    flexDirection: 'row',
    paddingTop: 10,
    height: 75,
    backgroundColor: '#F8F8F8',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: .2
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
  content: {
    flex: 2,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 0
  }
});

const mapStateToProps = (state) => {
  const {first, last, email, username, phone, pin, confirm, error, loading, email_error} = state.signup;
  return {first, last, email, username, phone, pin, confirm, error, loading, email_error};
}

module.exports = connect(mapStateToProps, {userUpdate, checkEmail})(EmailSignup);

