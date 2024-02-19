import axios from "axios";
import qs from 'qs';

export const MainServices = {
  async mainContent(url, lang) {
    const options = {
      method: 'GET',
      url: `${process.env.REACT_APP_BASE_URL}${url}`,
      headers: {
        'Accept-Language': lang
      }
    };

    return axios.request(options)
  },
  async aboutProjectPageContent(lang) {
    const options = {
      method: 'GET',
      url: `${process.env.REACT_APP_BASE_URL}/api/general/main/aboutProjectPageContent`,
      headers: {
        'Accept-Language': lang
      }
    };

    return axios.request(options)
  },
  async contactsPageContent(lang) {
    const options = {
      method: 'GET',
      url: `${process.env.REACT_APP_BASE_URL}/api/general/main/contactsPageContent`,
      headers: {
        'Accept-Language': `${lang}`
      }
    };

    return axios.request(options)
  },
  async reviewPageContent(lang) {
    const options = {
      method: 'GET',
      url: `${process.env.REACT_APP_BASE_URL}/api/general/main/reviewPageContent`,
      headers: {
        'Accept-Language': `${lang}`
      }
    };

    return axios.request(options)
  },
  async reviewDelete(id, res, lang) {
    const options = {
      method: 'DELETE',
      url: `${process.env.REACT_APP_BASE_URL}/api/general/review/delete/${id}`,
      headers: {
        'Authorization': `Bearer ${res}`,
        'Accept-Language': `${lang}`
      },
    };

    return axios.request(options)
  },
  async reviewUpdate(id, token, lang, body) {
    const options = {
      method: 'PUT',
      url: `${process.env.REACT_APP_BASE_URL}/api/general/review/update/${id}`,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json;charset=utf-8',
        'Accept-Language': `${lang}`
      },
      data: JSON.stringify(body),
    };

    return axios.request(options)
  },
  async reviewAdd(token, lang, body) {
    const options = {
      method: 'POST',
      url: `${process.env.REACT_APP_BASE_URL}/api/general/review/add`,
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `Bearer ${token}`,
        'Accept-Language': `${lang}`
      },
      data: JSON.stringify(body),
    };

    return axios.request(options)
  },
  async reviewList(isAuth, lang, token) {
    let options;
    if (isAuth) {
      options = {
        method: 'GET',
        url: `${process.env.REACT_APP_BASE_URL}/api/general/review/list`,
        headers: {
          'Accept-Language': `${lang}`,
          'Authorization': `Bearer ${token}`
        }
      };
    } else {
      options = {
        method: 'GET',
        url: `${process.env.REACT_APP_BASE_URL}/api/general/review/list`,
        headers: {
          'Accept-Language': `${lang}`
        }
      };
    }

    return axios.request(options)
  },
  async feedback(token, body, lang) {
    const options = {
      method: 'POST',
      url: `${process.env.REACT_APP_BASE_URL}/api/general/feedback/send`,
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `Bearer ${token}`,
        'Accept-Language': `${lang}`
      },
      data: JSON.stringify(body),
    };

    return axios.request(options)
  },
  async getListLinks() {
    const options = {
      method: 'GET',
      url: `http://localhost:8282/api/image/getListLinks`,
      params: {
        bucketName: process.env.REACT_APP_BUCKET,
      },
    };

    return axios.request(options)
  },
}