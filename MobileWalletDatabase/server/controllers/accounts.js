const Account = require('../models').Account;
const fs = require("fs");
const express = require('express');
const opn = require('opn');
const {google} = require('googleapis');
const gmailPort = 3001;
const app = express();
const scopes = [
  'https://mail.google.com/',
  'https://www.googleapis.com/auth/gmail.modify',
  'https://www.googleapis.com/auth/gmail.readonly',
  'https://www.googleapis.com/auth/gmail.send'
];
const gmailClass = google.gmail('v1');
const oauth2Client = new google.auth.OAuth2(
  '942539156197-188nn4rk3ui1pnp7m73o1um9tbifhm5h.apps.googleusercontent.com',
  'PZq8jgZ92Gdt0Yp1wuImRLGl',
  `http://localhost:3001/`
);
const oauthUrl = oauth2Client.generateAuthUrl({access_type: 'offline', scope: scopes});
let tkn = {access_token: 'ya29.GlsJBtxT3-NI0c0Gx0AwYJsUqR2DgxCoAni3a4O6lyxoQtcgshmq1QNH4wPeqyglzi91YWJoJjCPhV6MF_xQde9b11Nb4POog4-rvr9TE2Ap29y4eSzAg2Tiy4wt',
refresh_token: '1/ZbNhWDmNEpCZXlIfMbGYVbyzM3m5FKf87pQnhaL2dIc',
scope: 'https://www.googleapis.com/auth/gmail.modify https://www.googleapis.com/auth/gmail.readonly https://mail.google.com/ https://www.googleapis.com/auth/gmail.send',
token_type: 'Bearer',
expiry_date: 1535671027586};

const sendEmail = async (receiver, file, subject) => {
	fs.readFile(file, (err,data) => {
	  let email_lines = [];

	  email_lines.push('From: "nCnt Development" <dev@ncnt.io>');
	  email_lines.push('To: ' + receiver);
	  email_lines.push('Content-type: text/html;charset=utf-8');
	  email_lines.push('MIME-Version: 1.0');
	  email_lines.push('Subject: ' + subject);
	  email_lines.push('');

	  email_lines.push(data);

	  let email = email_lines.join('\r\n').trim();

	  let base64EncodedEmail = new Buffer(email).toString('base64');
	  base64EncodedEmail = base64EncodedEmail.replace(/\+/g, '-').replace(/\//g, '_');

	  gmailClass.users.messages.send({
	    	auth: oauth2Client,
	    	userId: 'me',
	    	resource: {
	      		raw: base64EncodedEmail
	    	}
	  });

	});
}

async function setOauthCredentials () {
	//console.log("set auth credentials");
	oauth2Client.credentials = tkn;
	tokens = await oauth2Client.refreshAccessToken();
	//console.log(oauth2Client);
}

function getHomePageCallback() {
	const fullSyncOptions = {query: 'from: ncnt.io'};
  setOauthCredentials().catch(console.error);
  gmail = google.gmail({version: 'v1', oauth2Client});
}

async function send(email, code, res) {
	//console.log(oauthUrl);
  getHomePageCallback();
  sendEmail(email, './EmailCode.html', "Your code is " + code);
  return res.status(200).send("success");
}

module.exports = {
  create(req, res) {
    let max = 100000000;
    let number = (Math.floor(Math.random() * max)).toString();
    return Account
      .findAll({
        where: {
          email: (req.body.email).toLowerCase(),
        }
      })
      .then(Act => {
        if (Act.length !== 0) {
          if(Act[0].dataValues.email_verified) {
            return res.status(401).send({
              message: 'Email is verified',
            });
          } else {
            return res.status(202).send({
              message: 'Account exists but email is not verified',
            });
          }
        }
        return Account
          .create({
            email: (req.body.email).toLowerCase(),
            code: number,
          })
          .then(function(){
            res.status(201).send("Account created");
          })
          .catch(error => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
  retrieve(req, res) {
    return Account
      .findAll({
        where: {
          email: (req.params.email).toLowerCase(),
        }
      })
      .then(Act => {
        let code = Act[0].dataValues.code;
        return send(req.params.email, code, res).catch(console.error);
      })
      .catch((error) => res.status(400).send(error));
  },
  update(req, res) {
    return Account
      .findAll({
        where: {
          email: (req.params.email).toLowerCase(),
        }
      })
      .then(Act => {
        if (!Act) {
          return res.status(404).send({
            message: 'Account Not Found',
          });
        }
        if (req.body.code === Act[0].dataValues.code) {
          return Act[0].update({
            email_verified: true,
            public_key: req.body.public_key || Act[0].dataValues.public_key,
            phone_no: req.body.phone_no || Act[0].dataValues.phone_no,
            first_name: req.body.first_name || Act[0].dataValues.first_name,
            last_name: req.body.last_name || Act[0].dataValues.last_name,
            experienced_investor: req.body.experienced_investor || Act[0].dataValues.experienced_investor,
            sufficient_income_level: req.body.sufficient_income_level || Act[0].dataValues.sufficient_income_level,
            desired_cash_allocation: req.body.desired_cash_allocation || Act[0].dataValues.desired_cash_allocation,
            desired_bitcoin_allocation: req.body.desired_bitcoin_allocation || Act[0].dataValues.desired_bitcoin_allocation,
            desired_eth_allocation: req.body.desired_eth_allocation || Act[0].dataValues.desired_eth_allocation,
          })
          .then(() => res.status(200).send("updated"))  // Send back the updated tokentype.
          .catch((error) => res.status(400).send(error));
        } else {
          return res.status(402).send({
            message: 'Code incorrect',
          });
        }
      })
      .catch((error) => res.status(400).send(error));
    }
};