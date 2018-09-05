// import {createStackNavigator} from 'react-navigation';
import React from 'react';
import {Scene, Router, Stack, Drawer, Modal} from 'react-native-router-flux';
const SendTokens = require('./Tokens/SendTokens.js');
const TokenDetailsScreen = require('./Tokens/TokenDetailsScreen.js');
const TokensScreen = require('./Tokens/TokensScreen.js');
const LoginScreen = require('./LoginScreen.js');
const SignupScreen = require('./AccountCreation/SignupScreen.js');
const LoginOrSignup = require('./LoginOrSignup.js');
const MaitreSignup = require('./MaitreSignup.js');
const ShowPhrase = require('./ShowPhrase.js');
const SideMenuContent = require('./SideMenuContent.js');
const NameSignup = require('./AccountCreation/NameSignup.js');
const EmailSignup = require('./AccountCreation/EmailSignup.js');
const PhoneSignup = require('./AccountCreation/PhoneSignup.js');
const PinSignup = require('./AccountCreation/PinSignup.js');
const VerifyEmail = require('./AccountCreation/VerifyEmail.js');
const ModalPin = require('./ModalPin.js');
const InvitationCode = require('./Whitelist/InvitationCode.js');
const InvestorScreen1 = require('./Whitelist/InvestorScreen1.js');
const InvestorScreen2 = require('./Whitelist/InvestorScreen2.js');
const InvestorScreen3 = require('./Whitelist/InvestorScreen3.js');
const InvestorFailureScreen = require('./Whitelist/InvestorFailureScreen.js');
const InvestorDoneScreen = require('./Whitelist/InvestorDoneScreen.js');

const RouterComponent = () => {

    return (
      <Router>
          <Scene key="root">
            <Scene key="LoginScreen" component={LoginScreen} hideNavBar="true" />
            <Scene key="LoginOrSignup" component={LoginOrSignup} hideNavBar="true" initial/>
            <Scene key="SignupScreen" component={SignupScreen} hideNavBar="true" />
            <Scene key="NameSignup" component={NameSignup} hideNavBar="true" />
            <Scene key="EmailSignup" component={EmailSignup} hideNavBar="true" />
            <Scene key="PhoneSignup" component={PhoneSignup} hideNavBar="true" />
            <Scene key="PinSignup" component={PinSignup} hideNavBar="true" />
            <Scene key="VerifyEmail" component={VerifyEmail} hideNavBar="true" />
            
            
            
            <Scene key = "Main" duration={0} hideNavBar="true" >
              <Scene key="drawer" drawer duration={0} contentComponent={SideMenuContent} hideNavBar="true" > 
                <Scene key="MainStack">             
                  <Scene key="TokenDetails" component={TokenDetailsScreen} hideNavBar="true" />
                  <Scene key="SendTokens" component={SendTokens} hideNavBar="true"/>
                  <Scene key="TokensScreen" component={TokensScreen} hideNavBar="true" initial/>
                  <Scene key="ShowPhrase" component={ShowPhrase} hideNavBar="true"  />
                  <Scene key="MaitreSignup" component={MaitreSignup} hideNavBar="true" /> 
                  <Scene key = "WhitelistStack" hideNavBar="true">
                    <Scene key="InvitationCode" component={InvitationCode} hideNavBar="true" />
                    <Scene key="InvestorScreen1" component={InvestorScreen1} hideNavBar="true" initial/>
                    <Scene key="InvestorScreen2" component={InvestorScreen2} hideNavBar="true" />
                    <Scene key="InvestorScreen3" component={InvestorScreen3} hideNavBar="true" />
                    <Scene key="InvestorFailureScreen" component={InvestorFailureScreen} hideNavBar="true" />
                    <Scene key="InvestorDoneScreen" component={InvestorDoneScreen} hideNavBar="true" />
                  </Scene>
                </Scene>
              </Scene>
              <Scene key="PinModal" duration={0} component={ModalPin} hideNavBar="true"/>
            </Scene>
          </Scene>
      </Router>
    );
}; 


module.exports = RouterComponent;
