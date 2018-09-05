import {PASSWORD_CHANGED_IN_MODAL, LOGIN_USER_SUCCESS_IN_MODAL, LOGIN_USER_FAIL_IN_MODAL, LOGIN_USER_IN_MODAL} from './types';
import {Actions} from 'react-native-router-flux';
import SInfo from 'react-native-sensitive-info';
 
export const pinChangedInModal = (text) => {
	return {
		type: PASSWORD_CHANGED_IN_MODAL,
		payload: text
	};
};
 

export const loginUserModal = ({password}) => {
	return (dispatch) => {
		SInfo.getItem("pin",{})
			.then(value => {
				console.log(value);
				console.log(password);
				if (password === value) {
					console.log("right on dude");
					dispatch({type: LOGIN_USER_SUCCESS_IN_MODAL});
					Actions.pop();
				}
				else {
					console.log("sucks to suck bro");
					dispatch({type: LOGIN_USER_FAIL_IN_MODAL});					
				}
			})
			.catch(error => {
				console.log("error");
				console.log(error);
				dispatch({type: LOGIN_USER_FAIL_IN_MODAL});
			});
	};
};