import {GET_ALL_TOKENS, GET_TOKENS_SUCCESS, GET_TOKENS_FAIL, USER_LOGOUT} from './types';
import {Actions} from 'react-native-router-flux';
import SInfo from 'react-native-sensitive-info';
import '../shim.js';
const StellarSdk = require('stellar-sdk');
StellarSdk.Network.useTestNetwork();
var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');




export const getTokens = () => {
	return (dispatch) => {

		SInfo.getItem('pubkey', {})
		.then(pubkey=>{
			console.log(pubkey);
			return server.loadAccount(pubkey);
		})	
		.then( response => {
			console.log(response.balances);
			dispatch({type: GET_TOKENS_SUCCESS, payload: response.balances});
		})

	};
}
