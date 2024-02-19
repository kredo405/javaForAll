import axios from "axios";
import qs from 'qs';

export const authServices = {
    async getToken(data) {
        const options = {
            method: 'post',
            url: `${process.env.REACT_APP_BASE_URL_AUTH}/auth/realms/general/protocol/openid-connect/token`,
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify(data),
        };

        return axios.request(options)
    },
    async getTokenAdmin() {
        const options = {
            method: 'post',
            url: `${process.env.REACT_APP_BASE_URL_AUTH}/auth/realms/master/protocol/openid-connect/token`,
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: `grant_type=client_credentials&client_id=admin-cli&client_secret=${process.env.REACT_APP_CLIENT_SECRET_ADMIN}`
        };

        return axios.request(options)
    },
    async getUserInfo(token) {
        const options = {
            method: 'post',
            url: `${process.env.REACT_APP_BASE_URL_AUTH}/auth/realms/general/protocol/openid-connect/userinfo`,
            headers: { 
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${token}` 
            },
        };

        return axios.request(options)
    },

    async addNewUser(data, token) {
        const newData = {
            username: data.userName,
            credentials: [{
                type: 'password',
                value: data.password
            }],
            attributes: {
                avatar: sessionStorage.getItem('avatarLink'),
              },
            enabled: true,
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,

        }
        const options = {
            method: 'post',
            url: `${process.env.REACT_APP_BASE_URL_AUTH}/auth/admin/realms/general/users`,
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            data: JSON.stringify(newData),
        };

        return axios.request(options)
    },
}