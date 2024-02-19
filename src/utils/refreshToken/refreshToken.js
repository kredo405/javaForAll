import axios from 'axios';
import qs from 'qs';

const RefreshToken = () => {

    const refreshToken = sessionStorage.getItem('refresh_token');
    const data = {
        'grant_type': 'refresh_token',
        'client_id': process.env.REACT_APP_CLIENTID,
        // 'client_secret': process.env.REACT_APP_CLIENT_SECRET,
        'client_secret': 'D8JBSwQu6kCNzV9VFIGac4GpL0EcS8hC',
        'refresh_token': refreshToken,
    }

    const options = {
        method: 'post',
        url: `${process.env.REACT_APP_BASE_URL_AUTH}/auth/realms/general/protocol/openid-connect/token`,
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: qs.stringify(data),
    }
   return axios.request(options);
}

export default RefreshToken;