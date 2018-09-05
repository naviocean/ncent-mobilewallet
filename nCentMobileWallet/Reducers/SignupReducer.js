import {PINS_DO_MATCH, EMAIL_VERIFICATION_SUCCESS, EMAIL_VERIFICATION_FAIL, EMAIL_ALREADY_EXISTS, EMAIL_CREATION_SUCCESS, USER_UPDATE, CREATE_USER, CREATE_USER_SUCCESS, CREATE_USER_FAIL, TEMP_PIN_ENTERED, PINS_DONT_MATCH} from '../Actions/types';

const INITIAL_STATE = {
	first: '',
	last: '',
	email: '',
	username: '',
	pin: '',
	confirm: '',
	phone: '',
	error: '',
	tempPin: '',
	userPin: '',
	loading: false,
	email_error: '',
	veri_code: '',
	email_veri_error: '',
	verified: false
};

export default (state = INITIAL_STATE, action) => {
	switch(action.type) {
		// handle user text input on any singup scfeens
		case USER_UPDATE:
			return {...state, [action.payload.prop]: action.payload.value};
		case CREATE_USER:
			return {...state, pin: '', tempPin: '', loading: true, error: ''};
		case CREATE_USER_SUCCESS:
			return {... state, ...INITIAL_STATE};
		case CREATE_USER_FAIL:
			return {... state, ...INITIAL_STATE, loading: false, error: 'Sign Up Failed.'};
		case TEMP_PIN_ENTERED:
			return {... state, pin: '', tempPin: action.payload, error: ''};
		case PINS_DONT_MATCH:
			return {... state, pin: '', tempPin: '', error: 'Pins Don\'t Match'};
		case PINS_DO_MATCH:
			return {...state, userPin: action.payload};
		case EMAIL_ALREADY_EXISTS:
			return {...state, email_error: action.payload};
		case EMAIL_CREATION_SUCCESS:
			return {...state, email_error: ''}
		case EMAIL_VERIFICATION_SUCCESS:
			return {...state, email_veri_error: '', verified: true};
		case EMAIL_VERIFICATION_FAIL:
			return {...state, email_veri_error: 'Email verification fail'};
		default:
			return state;
	}

};  