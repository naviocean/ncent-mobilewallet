import {EMAIL_CHANGED, PASSWORD_CHANGED, LOGIN_USER_SUCCESS, LOGIN_USER_FAIL, LOGIN_USER} from '../Actions/types';
const INITIAL_STATE = { password: '', user: null, error: '', loading: false};
// Linked to LoginScreen
export default (state=INITIAL_STATE, action) => {
	switch (action.type) {
		case PASSWORD_CHANGED:
			return {...state, password: action.payload};
		case LOGIN_USER:
			return {...state, password: '', loading: true, error: ''}
		case LOGIN_USER_SUCCESS:
			return {... state, user: action.payload, error: '', loading: false, password: ''};
		case LOGIN_USER_FAIL:
			return {... state, ...INITIAL_STATE, error: 'Authentication Failed.', password: '', loading: false};
		default:
			return state;
	}
};  