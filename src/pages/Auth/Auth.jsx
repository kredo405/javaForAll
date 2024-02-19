import { LockClosedIcon } from '@heroicons/react/solid';
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import { Modal } from 'antd';
import Nav from "../../components/Nav/Nav";
import AuthSuccess from '../../components/AuthSuccess/AuthSuccess';
import { authServices } from '../../services/authServices';

const errorModal = (message) => {
  Modal.error({
    title: message
  });
};

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(false);
  const dispatch = useDispatch();

  const state = useSelector(state => state);
  const { t, i18n } = useTranslation();

  const onChange = (e) => {
    if (e.target.name === 'email') {
      setEmail(e.target.value)
    } else if (e.target.name === 'password') {
      setPassword(e.target.value);
    }
  }

  const onSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const data = {
      'grant_type': 'password',
      'client_id': process.env.REACT_APP_CLIENTID,
      'client_secret': process.env.REACT_APP_CLIENT_SECRET,
      'username': email,
      'password': password
    }

    const getAuthData = async () => {
      try {
        const authData = await authServices.getToken(data);
        console.log(authData);
        const userInfo = await authServices.getUserInfo(authData.data.access_token);
        console.log(userInfo);

        setResult(true);
        setIsLoading(false);
        sessionStorage.setItem('token', authData.data.access_token);
        sessionStorage.setItem('refresh_token', authData.data.refresh_token);
        sessionStorage.setItem('expires_in', Date.now() + (authData.data.expires_in * 1000));
        sessionStorage.setItem('isAuth', true);
        dispatch({
          type: 'TOKEN',
          payload: authData.data.access_token,
        });
        dispatch({
          type: 'NAME',
          payload: `${userInfo.data.family_name} ${userInfo.data.given_name}`,
        });
        dispatch({
          type: 'AVATARLINK',
          payload: userInfo.data.avatar,
        });
      }
      catch (error) {
        console.error(error);
        setResult(false);
        setIsLoading(false);
        // if (error.data.error_description === 'Invalid user credentials') {
        //   errorModal('Неправильный логин или пароль');
        // } else {
          errorModal(error.message);
        
      }
    }

    getAuthData();
  }

  useEffect(() => {
    if (state.value) {
      const body = document.querySelector('body');
      body.style.backgroundColor = 'rgb(30 41 59)';
      body.style.overflowY = 'scroll';
    } else {
      const body = document.querySelector('body');
      body.style.backgroundColor = 'rgb(255 255 255)';
      body.style.overflowY = 'scroll';
    }
  }, [state.value]);

  return (
    <>
      {result ?
        <AuthSuccess />
        :
        <div className='container'>
          <div>
            <Nav />
          </div>
          <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
              <div>
                <h2 className="mt-6 text-center dark:text-slate-200 text-3xl font-extrabold text-gray-900">{t('description.part13')}</h2>
              </div>
              <form className="mt-8 space-y-6" onSubmit={onSubmit}>
                <input type="hidden" name="remember" defaultValue="true" />
                <div className="rounded-md shadow-sm -space-y-px">
                  <div>
                    <label htmlFor="email-address" className="sr-only dark:text-slate-200">
                      {t('description.part14')}
                    </label>
                    <input
                      id="email-address"
                      name="email"
                      type="text"
                      value={email}
                      onChange={onChange}
                      autoComplete="email"
                      required
                      className="appearance-none mb-4 rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder={t('description.part14')}
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="sr-only dark:text-slate-200">
                      {t('description.part15')}
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      onChange={onChange}
                      value={password}
                      autoComplete="current-password"
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder={t('description.part15')}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 dark:text-slate-200 block text-sm text-gray-900">
                      {t('description.part16')}
                    </label>
                  </div>

                  <div className="text-sm">
                    <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                      {t('description.part17')}
                    </a>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                      <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                    </span>
                    {t('description.part18')}
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="flex justify-center">
            <p className='font-sans text-lg dark:text-slate-200 font-medium'>{t('description.part19')} <Link to="/registration">{t('description.part20')}</Link></p>
          </div>
        </div>
      }
    </>
  )
}

export default Auth;