import {SHOW_PHRASE, HIDE_PHRASE} from './types';
import {Actions} from 'react-native-router-flux';
import SInfo from 'react-native-sensitive-info';

export const hidePhrase = () => {
	return (dispatch) => {
		dispatch({type: HIDE_PHRASE});
	};
};

export const showPhrase = () => {

	return (dispatch) => {
		SInfo.getItem('mnemonic', {})
		.then(response => {
			dispatch({type: SHOW_PHRASE, payload: response})
		})
	};
};

