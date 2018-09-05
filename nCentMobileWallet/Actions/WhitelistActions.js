import {INVITATION_CODE_CHANGED, INVESTOR_INFO_UPDATE} from './types';
import {Actions} from 'react-native-router-flux';
import SInfo from 'react-native-sensitive-info';
import {Alert} from 'react-native';
const MobileWalletSDK = require('../MobileWalletSDK');
const walletSDK = new MobileWalletSDK();

export const invitationCodeChanged = (text) => {
	return {
		type: INVITATION_CODE_CHANGED,
		payload: text
	};
};


export const investorInfoUpdate = ({prop, value}) => {
	return {
		type: INVESTOR_INFO_UPDATE,
		payload: { prop, value }
	};
};


export const submitWhitelistInfo = ({resp1, resp2, usd, btc, eth}) => {
	let veri_code;
	let email;
	SInfo.getItem('veri_code', {})
	.then(value => {
		veri_code = value;
		return SInfo.getItem('email', {});
	})
	.then(value => {
		email = value;
		usd = usd || 0.0;
		btc = btc || 0.0;
		eth = eth || 0.0;
		return new Promise(function(resolve, reject) {
			return walletSDK.updateDetails(veri_code.toString(), email.toLowerCase(), resp1, resp2, usd, btc, eth, resolve, reject);
		})
	})
	.then(response =>{
		Actions.InvestorDoneScreen();
	})
	.catch(error => {
		console.log(error);
		Alert.alert("Error submitting, try again later");
	})
}