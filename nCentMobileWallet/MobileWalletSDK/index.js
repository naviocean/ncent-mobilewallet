const axios = require('axios');

const testNet = 'http://localhost:8030/MobileWallet';

class MobileWalletSDK {
    constructor () {
        this._net = testNet;
    }
    //generates a code in the backend
    //returns a response object without code with email_verified
    // kind of a temporary, unverified account that can be overwritten
    createAccount(email, resolve, reject) {
        axios.post(this._net + '/accounts', {
            email: email
        })
        .then(function(response) {
            return resolve(response);
        })
        .catch(function(error) {
            return reject(error);
        });
    }; 

    // this is the actual account creation, once verified
    updateAccount(code, email, public_key, phone_no, first_name, last_name, resolve, reject) {
        axios.put(this._net + '/accounts/' + email, {
            code: code,
            public_key: public_key,
            phone_no: phone_no,
            first_name: first_name, 
            last_name: last_name
        })
        .then(function(response) {
            return resolve(response);
        })
        .catch(function(error) {
            return reject(error);
        });
    }
    // this is for updating whitelist details
    updateDetails(code, email, experienced_investor, sufficient_income_level, desired_cash_allocation, desired_bitcoin_allocation, desired_eth_allocation, resolve, reject) {
        axios.put(this._net + '/accounts/' + email, {
            code: code,
            experienced_investor: experienced_investor,
            sufficient_income_level: sufficient_income_level,
            desired_cash_allocation: desired_cash_allocation,
            desired_bitcoin_allocation: desired_bitcoin_allocation, 
            desired_eth_allocation: desired_eth_allocation
        })
        .then(function(response) {
            return resolve(response);
        })
        .catch(function(error) {
            return reject(error);
        });
    }
    // sends the code
    sendCode(email, resolve, reject) {
        axios.get(this._net + '/accounts/' + email, {
            //delivery: true,
        })
        .then(function(response) {
            return resolve(response);
        })
        .catch(function(error) {
            return reject(error);
        });
    };

}
module.exports = MobileWalletSDK;

