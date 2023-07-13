import { BASE_PATH } from '@config';
import axios from 'axios';

const axiosClient = axios.create();

axiosClient.defaults.baseURL = BASE_PATH;
axiosClient.defaults.headers.post['Content-Type'] = 'application/json';
axiosClient.defaults.responseType = 'json';
axiosClient.defaults.timeout = 5000;
//axiosClient.defaults.withCredentials = true;

export default axiosClient;
