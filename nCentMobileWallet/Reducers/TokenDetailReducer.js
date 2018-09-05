import {GET_BALANCE, GET_BALANCE_SUCCESS, GET_BALANCE_FAIL, CLEAR_BALANCE_DETAILS} from '../Actions/types';

const INITIAL_STATE = {
	balance: '',
	error: '',
	loading: false
};

export default (state = INITIAL_STATE, action) => {
	switch(action.type) {
		case CLEAR_BALANCE_DETAILS:
			return {...state, ...INITIAL_STATE};
		case GET_BALANCE:
			return {...state, balance: '', loading: true};
		case GET_BALANCE_SUCCESS:
			return {...state, loading: false, error: '', balance: action.payload};
		case GET_BALANCE_FAIL:
			return {...state, loading: false, error: 'Error retrieving balance', balance: 'error'};
		default:
			return state;
	}

};   