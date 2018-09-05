import {INVITATION_CODE_CHANGED, INVESTOR_INFO_UPDATE} from '../Actions/types';

const INITIAL_STATE = {
	code: '',
	error: '',
	success: '',
	loading: false,
	usd: '',
	btc: '',
	eth: '',
	resp1: false,
	resp2: false
};

export default (state = INITIAL_STATE, action) => {
	switch(action.type) {
		case 'placeholder':
			return {...state, ...INITIAL_STATE, success: 'Successfully signed up!'};
		case 'placeholder':
			return {...state, ...INITIAL_STATE, error: 'Make sure you entered a valid email.'};
		case 'placeholder':
			return {...state, code: action.payload, loading: true};
		case INVESTOR_INFO_UPDATE:
			return {...state, [action.payload.prop]: action.payload.value};
		case INVITATION_CODE_CHANGED:
			return {...state, code: action.payload};
		default:
			return state;
	}

};