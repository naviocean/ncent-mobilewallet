## Getting Started
#### ios
To run in iOS (I would do this before android): 
- Download xCode (takes a long time)
- Clone the repository
```
cd MobileWalletDir/nCentMobileWallet
npm install
sudo npm install -g react-native-cli
```
- In xcode open MobileWalletDir/nCentMobileWallet/ios/nCentMobileWallet.xcodeproj
- Run command R in xCode to build

The simulator should pop up. You should get a big red screen with haste module map errors. Don’t listen to any of their 4 steps, they don’t help. Except sometimes removing node_modules but I promise it won’t in this case. Here’s how to get rid of them

- Go to node_modules/ed25519-hd-key/dist/index.js
- Comment out the following lines:
``` JavaScript
// const naclFactory = require("js-nacl");
// let naclInstance;
// . . . 
// naclFactory.instantiate((nacl) => (naclInstance = nacl));
// . . . 
// exports.getPublicKey = (privateKey) => {
//     const { signPk } = naclInstance.crypto_sign_seed_keypair(privateKey);
//     const zero = Buffer.alloc(1, 0);
//     return Buffer.concat([zero, Buffer.from(signPk)]);
// };
``` 
- (so the reason to comment these things out is that HD wallet which generates the mneumonic phrase uses a library edw5519 which uses nacl which uses fs which we can't get) but we really only need nacl for one function, so it might be worth going through, finding the things we need, and making our own file so we don't have to comment this out every time we restart)

This will make it so you should never get fs haste module map errors
If you get an error like Module stream or Module crypto does not exist in haste module map: keep doing the following:
Run these steps from [here](https://github.com/tradle/react-native-crypto): 

```
npm i --save react-native-crypto
npm i --save react-native-randombytes
react-native link react-native-randombytes
npm i --save-dev tradle/rn-nodeify
./node_modules/.bin/rn-nodeify --hack --install
```

Also Run:
 ```
react-native-link
npm i --save-dev tradle/rn-nodeify
./node_modules/.bin/rn-nodeify --hack --install
```

- Close metro bundler, close the simulator, and command r in Xcode to rebuild.
Repeat these steps with all the linking until you go insane, and maybe once or twice delete the node_modules folder, comment out those lines, and start over. I don’t know why but it never works my first time, but I can always eventually get the issues to go away. This is the worst part, just trust me it’ll work eventually.

Once the wallet finally pops up in the simulator with no errors, you should be able to start it from the command-line with 
```
react-native run-ios
```
for a faster restart but rebuilding from scratch in xCode is safer in some situations.

Finally, run the Mobile Wallet Database like we run all our local databases if you want to be able to do things like create a wallet, etc.

#### Android
I found it way easier to get it running in IOS and the iPhone simulator, so I would get it going in IOS before trying android. For android, go [here](https://facebook.github.io/react-native/docs/getting-started.html), click on Building Projects With Native Code, and choose Android, and follow the steps for setting up android studio very closely.
- Replace the “Creating a New Application” step with simply opening the android directory from the nCentMobileWallet folder in the Android Studio
 
## Publishing to App Stores
#### android
Publishing to android is way easier. Follow the steps [here](https://facebook.github.io/react-native/docs/signed-apk-android) to generate the APK you need for the play console. Don’t forget to bump the version number each time. I should have already made the key file as they describe in the docs, check and look. Here’s the keystore information I used:
- Store Password: DevCent2018
- Name: Kapil Jain
- Organizational unit: nCent Labs Inc.
- Organization: nCent Labs Inc.
- City: Redwood City
- State: California
- Key password: DevCent2018

#### iOS
Somehow iOS react-native hid the only iOS release docs in this poorly named section. [here](https://facebook.github.io/react-native/docs/running-on-device). You can also watch this video [here](https://www.youtube.com/watch?v=ifXXjXifD8g) if you think that will help.
Follow these steps exactly, and everything should be okay, it will just be sort of hard and its a long process. I recommend doing the Running on Device section before the publishing section because it makes the publishing part a lot easier. Again, don’t forget to bump the build number.
Our Apple build name and url for everything is com.nCent.nCentMobileWallet


## High Level Organization:
#### App.js
Everything begins in the App.js file.
Our class App extends React.Componenet, every app needs an App class
There’re are two important elements in this file. The RouterComponenent is the entire navigation stack which contains all our components the Provider tag is what gives our app the Redux state which we initialize above

- If we go to Components we find all our screens. Go to Navigation.js and you’ll see every screen we use. The navigation is organized like a stack, so navigating to one screen pushes it onto the stack, and then going back is a pop. The account creation is a separate stack then the “Main” stack. The entire “Main” stack is wrapped in a “Drawer” component which is the side menu. The “PinModal” component is the pop-up window that opens up every time the user closes and then reopens the app and it prompts for the Pin.

- In Actions you’ll find all the actions our  components call. In Reducers you’ll find the different states that our components are connected to and can edit

- In MobileWalletSDK you’ll find all our functions for communicating with the Mobile Wallet database for creating accounts, etc
Img houses images I use. 

- ios and android you should never have to touch or worry about except when you are choosing which file to run in which simulator or publishing to the App Store.

## Components Overview
#### LoginOrSignup
This screen was originally for choosing if you want to login or make a wallet. I now have it check if you have an account (by checking if you’ve made a pin) and if you do, immediate sending you to the login screen. Eventually, if we want to be like Abra, we shouldn’t let you go back and make a new account as this overwrites everything like your private keys on device.

#### LoginScreen
Enter a pin and it logs you in. I store the Pin locally since, well I figure if we are assuming local storage is secure enough to hold the private key it better be secure enough for the Pin. Keyboard should pop up automatically, if it doesn’t we might in the future want to give them a button to press so that it does. Confusingly, this component is connected to AuthActions and AuthReducer
* Left to do: limit number of login attempts in a given time period

#### AccountCreation/
All these files are connected to the SignupReducer. The flow is meant to go like this. You give your name, I store it in the state. You give you email, and then this is where it gets complicated.
###### Case 1: No account exists with that email
- We send you a code to that email which you’ll need for verification later. We also make an account with this email so we can associate the code to the email.
###### Case 2: An account exists with that email but hasn’t been verified:
- This is the case where somebody else already signed up with this email (fraudulently or accidentally or just didn’t finish) but never verified their account. We had to make them an account to get them a code, but they never verified it. In this case, we resend the code but they already have an account. 
- From a front end perspective, case 1 and case 2 are identical, you are sent a code and move on, from the backend, the difference is that you don’t make an account in case 2
###### Case 3: The account exists and the verification process was already completed.
-  We say, “account with that email exists” and don’t let them make a new one
Moving on, you then enter your phone number, we store that in state, and then make a pin, and then in the last screen we ask for your verification code. If its correct, we make you an account, seed you with a stellar wallet and some fake scent, store a bunch of your info locally and in our database, and then you’re in.
* Left to do: Give a user the ability to recover account from seed phrase. That’d be cool and we totally can.

#### Tokens/
Token screen components. Pretty basic, you get to see all your tokens, if you click on one, you see its balance, if you click on send, you get to send it to someone by entering their address.
* To-do: eventually make it wayyy easier to send to someone with contacts or something, but this V1 is good for a while

#### Whitelist/
This is just a pre-screen for investment. For now, we just pull the verification code to make sure its the right user. You answer a bunch of the questions, and then we record your response in our database. This is pretty much done. InvitationCode.js is deprecated if we’re pulling the code from the phone, and we decided not to use the InvestorFailureScreen, and use just a generic done screen regardless of their responses to prevent people who filled it out wrong from going back in and filling it out again.
* To-do: decide if you want to lock users out from re-answering the question once they’ve filled it out.

#### MaitreSignup
Just has a link to the website with the Maitre for now. I actually did make it so you can use the Maitre API, and you can actually do it from in the app which is super clean. The only thing is, it means you need to put our Maitre API token in the App, which hypothetically could be recovered of somebody unbundles the app which is like poossssible but unlikely, and then finds the token, and then uses it to delete our Maitre list which is like, I suppose possible.

#### ModalPin
Screen that pops up with a pin if you leave the app and want to return to it.

#### ShowPhrase
Shows your recovery phrase for the app. 
- To-do: Give the ability to show the public key so people can actually send to each other
- To-do: the recovery phrase is pretty useless as of now

#### SideMenuContent
Other than the ability to navigate in here, the other important thing is that this top-level navigator is where we look for app state changes to decide if we need to show the user a Pin when he comes back


### Here’s the big issue with deployment
So me Joel and I just added the email code thing, and the issue with that is that the database changed, so if you change the database on AWS all old wallets change. So, in the future, you guys will have to be wayyyyy more careful about making changes to the wallet databases since you can make all old accounts invalid (like we just did). For now, it has like one download and you can just re-make your account. So, when you reply V2 of the data-base with the code, you also need to deploy V2 of the wallets cause the old ones will break. I don’t quite know what the way around this in the future is.

