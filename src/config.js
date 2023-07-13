import axios from 'axios';
import { get_value_for } from '@api/store';

// URLS
export const GH_URL = 'https://github.com/mrJayn';

//  MAKE SECRET FOR PROD
export const BASE_PATH = 'http://192.168.50.240:8000';

// PATHS
//      user/
export const OBTAIN_TOKEN_PATH = `${BASE_PATH}/user/tokens`;
export const CURRENT_USER_PATH = `${BASE_PATH}/user/current_user`;
export const HOME_PATH = `${BASE_PATH}/user/home`;
export const LOGOUT_PATH = `${BASE_PATH}/user/logout`;
//      api/
export const EXERCISES_PATH = `${BASE_PATH}/api/exercises`; // DUMMY_

// ==========
const axiosConfig = {
	init: async () => {
		axios.defaults.baseURL = BASE_PATH;
		axios.defaults.headers.post['Content-Type'] = 'application/json';
		axios.defaults.responseType = 'json';
		axios.defaults.timeout = 5000;
	},
	addAuth: async () => {
		const pk = await get_value_for('USER_TOKEN');
		axios.defaults.headers.common['Authorization'] = pk;
	},
};
