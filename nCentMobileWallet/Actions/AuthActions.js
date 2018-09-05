import {PASSWORD_CHANGED, LOGIN_USER_SUCCESS, LOGIN_USER_FAIL, LOGIN_USER} from './types';
import {Actions} from 'react-native-router-flux';
import SInfo from 'react-native-sensitive-info';
  
// Should be called login actions
export const pinChanged = (text) => {
	return {
		type: PASSWORD_CHANGED,
		payload: text
	};
};
 
export const loginUser = ({password}) => {
	return (dispatch) => {
		dispatch({type: LOGIN_USER});

		SInfo.getItem("pin", {})
			.then(value => {
				console.log(value);
				console.log(password);
				if (password === value) {
					console.log("right on dude");
					dispatch({type: LOGIN_USER_SUCCESS});
					Actions.TokensScreen();
				}
				else {
					console.log("sucks to suck bro");
					dispatch({type: LOGIN_USER_FAIL});					
				}
			})
			.catch(error => {
				console.log("error");
				console.log(error);
				dispatch({type: LOGIN_USER_FAIL});
			});
	};
};