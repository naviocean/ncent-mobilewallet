import {USER_LOGOUT_FROM_SIDEMENU} from './types';
import {Actions} from 'react-native-router-flux';



export const signOutFromSideMenu = () => {
	return (dispatch) => {
		//firebase.auth().signOut()
			//.then( () => {
				dispatch({type: USER_LOGOUT_FROM_SIDEMENU});
				Actions.popTo("LoginOrSignup");
			//})
	}
}