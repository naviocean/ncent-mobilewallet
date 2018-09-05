import {CELAR_CREATION_INPUTS, PINS_DO_MATCH, EMAIL_VERIFICATION_SUCCESS, EMAIL_VERIFICATION_FAIL, USER_UPDATE, CREATE_USER, CREATE_USER_SUCCESS, CREATE_USER_FAIL, TEMP_PIN_ENTERED, PINS_DONT_MATCH, EMAIL_ALREADY_EXISTS, EMAIL_CREATION_SUCCESS} from './types';
import {Actions} from 'react-native-router-flux';
import {Alert} from 'react-native';
import SInfo from 'react-native-sensitive-info';
import '../shim.js';
import StellarHDWallet from 'stellar-hd-wallet';
const crypto = require('crypto');
const bip39 = require('bip39');
const MobileWalletSDK = require('../MobileWalletSDK');
const walletSDK = new MobileWalletSDK();

const StellarSdk = require('stellar-sdk');
StellarSdk.Network.useTestNetwork();

var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
const axios = require('axios');

 
export const userUpdate = ({prop, value}) => {
	return {
		type: USER_UPDATE,
		payload: { prop, value }
	};
};

export const tempPinEntered = (tempPin) => {
	return (dispatch) => {
		dispatch({type: TEMP_PIN_ENTERED, payload: tempPin});
	}
};

export const pinsDontMatch = () => {
	return (dispatch) => {
		dispatch({type: PINS_DONT_MATCH});
	}
};


export const pinsDoMatch = (tempPin) => {
	return (dispatch) => {
		dispatch({type: PINS_DO_MATCH, payload: tempPin});
		Actions.VerifyEmail();
	}
};

// check if you can use the email
export const checkEmail = (email) => {
	return (dispatch) => {
		new Promise(function(resolve, reject) {
			return walletSDK.createAccount(email.toLowerCase(), resolve, reject);
		})
		.then(response => {
			dispatch({type: EMAIL_CREATION_SUCCESS});
			Actions.PhoneSignup();
			return walletSDK.sendCode(email.toLowerCase(), function(){}, function(){});
		})
		.catch(error => {
			if (error.response && error.response.status === 401) {
				Alert.alert('Account with email already made')
				// dispatch({type: EMAIL_ALREADY_EXISTS, payload: 'There is already an account with that email'});
			}
			else {
				Alert.alert('Server Error');
				// dispatch({type: EMAIL_ALREADY_EXISTS, payload: 'Server Error'});
			}
		})
	}
};

// export const verifyCode = (code) => {
// 	return (dispatch) => {
// 		new Promise(function(resolve, reject) {
// 			return walletSDK.updateAccount(code, email, publicKey,  resolve, reject);
// 		})
// 		let verified = true;
// 		if (verified) {
// 			dispatch({type: EMAIL_VERIFICATION_SUCCESS});
// 			// Actions.TokensScreen();
// 		}
// 		else {
// 			dispatch({type: EMAIL_VERIFICATION_FAIL});
// 		}
// 	}
// }

// make the user function
let ncentuuid;
export const createUser = ({veri_code, first, last, email, phone, userPin}) => {
	console.log(veri_code);
	console.log(userPin);
	return (dispatch) => {
		dispatch({type: CREATE_USER});

				console.log("making wallet");
				// randomness
				const randomBytes = crypto.randomBytes(16);
				// turn randomness into phrase
				const mnemonic = bip39.entropyToMnemonic(randomBytes.toString('hex'));
				// turn phrase into keys
				const HDwallet = StellarHDWallet.fromMnemonic(mnemonic);
				console.log(HDwallet);;
				//const pubkey = wallet.getPublicKey(0);
				const HDseckey = HDwallet.getSecret(0);
				// turn HDwallet into normal stellar wallet
				const wallet = StellarSdk.Keypair.fromSecret(HDseckey);
				const pubkey = wallet.publicKey();
				const seckey = wallet.secret();

				console.log(pubkey);
				console.log(seckey);

				//
				new Promise(function(resolve, reject) {
					// actually make the account with verification
					return walletSDK.updateAccount(veri_code.toString(), email.toLowerCase(), pubkey, phone, first, last, resolve, reject);
				})
				.then(function(response) {
					console.log(response);
					return fetch('https://friendbot.stellar.org?addr=' + pubkey);
				})
				.then(response => {
					// give account money from friendbot
					if (response.status === 200) {
						console.log("gave account money from friendbot");
						return server.loadAccount(pubkey);
					}
					else {
						console.log("uh oh");
						console.log(response);
						// handle error
					}
				})
				.then(function(account) {
				// trust the distributor
				  console.log("trusting the ncnt wallet");
				  var NCNT = new StellarSdk.Asset('NCNT', 'GBWOFUTXKI7IANMVHGBZX7KKK4LDDH7OVJ4C3WLX4V7M3WH2OKPBQEN5');
				  var transaction = new StellarSdk.TransactionBuilder(account)
				  .addOperation(StellarSdk.Operation.changeTrust({
				  	destination: 'GB4IIY4IWZHCNPLCOY7IPYSZF6VUWGAVZ75JAPZSSUMYXPQQL44AB5L5',
				  	asset: NCNT	
				  }))
				  .build();
				  console.log('************************************************************');
				  console.log(wallet.canSign());
				  transaction.sign(wallet);
				  console.log("submitting trust transaction");
				  return server.submitTransaction(transaction);
				})
				.then(response => {
					console.log("success trusting");
					return server.loadAccount(pubkey);
				})
				.then(function(account) {
					// buy ncent from the distributor
				  console.log("buying ncnt");
				  var NCNT = new StellarSdk.Asset('NCNT', 'GBWOFUTXKI7IANMVHGBZX7KKK4LDDH7OVJ4C3WLX4V7M3WH2OKPBQEN5');
				  var transaction = new StellarSdk.TransactionBuilder(account)
				  .addOperation(StellarSdk.Operation.manageOffer({
				  	destination: 'GB4IIY4IWZHCNPLCOY7IPYSZF6VUWGAVZ75JAPZSSUMYXPQQL44AB5L5',
				  	selling: StellarSdk.Asset.native(),
				  	buying: NCNT,
				  	amount: '5000',
				  	price: '.2'
				  }))
				  .build();
				  transaction.sign(wallet);
				  console.log("submitting purchase");
				  return server.submitTransaction(transaction);
				})
				
				.then(response =>{
					console.log(response);
					console.log("success purchasing ncnt");
					return SInfo.setItem('mnemonic', mnemonic, {})
				})
				.then(()=>{
					// lots of local storage
					return SInfo.setItem('wallet', JSON.stringify(wallet), {})
				})
				.then(()=>{

					return SInfo.setItem('pubkey', pubkey, {})
				})
				.then(()=>{
					return SInfo.setItem('seckey', seckey, {})
				})
				.then(()=>{
					return SInfo.setItem('email', email.toLowerCase(), {})
				})
				.then(()=>{
					return SInfo.setItem('phone', phone, {})
				})
				.then(()=>{
					return SInfo.setItem('pin', userPin, {})
				})
				.then(()=>{
					return SInfo.setItem('first', first, {})
				})
				.then(()=>{
					return SInfo.setItem('last', last, {})
				})
				.then(()=>{
					return SInfo.setItem('veri_code', veri_code, {})
				})
				.then(response => {
					dispatch({type: CREATE_USER_SUCCESS});
					Actions.TokensScreen();
				})
				.catch(error=>{
					if(error.response && error.response.status === 402) {
						Alert.alert("Incorrect code");
					}
					else {
						console.log("error here");
						console.log(error);
						Alert.alert("Error connecting to server");
						dispatch({type: CREATE_USER_FAIL, payload: "Server Error. Please try again later or, if you have an old version, update the app."});
					}
				});
		}
};


