import { isPlatform } from '@ionic/react';
import axios from 'axios';

const BASE_URL = isPlatform('capacitor') ? 'http://testpagos.tk' : 'http://localhost:8000';

const axiosInstance = axios.create({
	baseURL: BASE_URL
});

export default axiosInstance;
