const accountsController = require('../controllers').accounts;

module.exports = (app) => {
	app.get('/MobileWallet', (req, res) => res.status(200).send({
        message: 'Welcome to the MobileWallet API!',
    }));
    app.post('/MobileWallet/accounts', accountsController.create);
    app.get('/MobileWallet/accounts/:email', accountsController.retrieve);
    app.put('/MobileWallet/accounts/:email', accountsController.update);
};