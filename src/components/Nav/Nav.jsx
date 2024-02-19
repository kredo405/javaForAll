import Language_btn from '../Language_btn/Language_btn';
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from 'react';
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';
import UserMenu from '../UserMenu/UserMenu';
import logo from '../../img/logo1.png';

const { confirm } = Modal;

const Nav = () => {
  const [theme, setTheme] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const state = useSelector(state => state);

  const onChange = (e) => {
    console.log(e.target.checked)
    setTheme(e.target.checked);
    if (e.target.checked) {
      dispatch({
        type: 'BLACK'
      })
    } else {
      dispatch({
        type: 'WHITE'
      })
    }
  };

  const showDeleteConfirm = () => {
    confirm({
      title: 'Вы действительно хотите выйти????',
      icon: <ExclamationCircleOutlined />,
      okText: 'Да',
      okType: 'danger',
      cancelText: 'Нет',

      onOk() {
        sessionStorage.clear();
        setIsAuth(false);
        dispatch({
          type: 'TOKEN',
          payload: '',
        })
      },
    });
  };

  useEffect(() => {
    if (theme) {
      const body = document.querySelector('body');
      body.style.backgroundColor = 'rgb(30 41 59)';
    } else {
      const body = document.querySelector('body');
      body.style.backgroundColor = 'rgb(255 255 255)';
    }
  }, [theme])

  useEffect(() => {
    const isAuth = sessionStorage.getItem('isAuth');
    setIsAuth(isAuth)
  }, [sessionStorage.getItem('isAuth')]);

  return (
    <Popover className='dark:bg-slate-800'>
      <div className="relative pt-6 mb-10 px-4 sm:px-6 lg:px-8">
        <nav className="relative flex items-center justify-between sm:h-10 lg:justify-start" aria-label="Global">
          <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
            <div className="flex items-center justify-between w-full md:w-auto">
              <Link to="/">
                <span className="sr-only">JavaForAll</span>
                <img
                  alt="logo"
                  className="h-8 w-auto sm:h-10"
                  src={logo}
                />
              </Link>
              <div className="md:hidden ml-3 flex items-center">
                <Language_btn />
              </div>
              <div className="md:hidden px-2 flex items-center">
                <ThemeSwitcher sx={{ m: 1 }} checked={state.value} onChange={(e) => onChange(e)} />
              </div>
              <div className="-mr-2 flex items-center md:hidden">
                <Popover.Button className="dark:bg-slate-800 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span className="sr-only">Open main menu</span>
                  <MenuIcon className="h-6 w-6" aria-hidden="true" />
                </Popover.Button>
              </div>
            </div>
          </div>

          <div className="md:flex justify-between md:w-full">
            <div className='md:w-5/12 md:flex items-center'>
              <div className="hidden md:block md:ml-3 md:pr-2 md:space-x-8">
                <Link to='/about' className="font-medium dark:text-slate-200 dark:hover:text-slate-400 text-gray-500 hover:text-gray-900">
                  {t('description.part1')}
                </Link>

                <Link to='/contacts' className="font-medium dark:text-slate-200 dark:hover:text-slate-400 text-gray-500 hover:text-gray-900">
                  {t('description.part2')}
                </Link>

                <Link to='/reviews' className="font-medium dark:text-slate-200 dark:hover:text-slate-400 text-gray-500 hover:text-gray-900">
                  {t('description.part3')}
                </Link>
              </div>
            </div>
            <div className='lg:w-7/12 md:flex justify-end items-center'>
              <div className="hidden md:flex items-center justify-center mb-2">
                <Language_btn />
              </div>
              <div className="hidden px-2 md:flex justify-center">
                <ThemeSwitcher sx={{ m: 1 }} checked={state.value} onChange={(e) => onChange(e)} />
              </div>
              <div className="hidden md:flex">
                <UserMenu />
              </div>
            </div>
          </div>
        </nav>
      </div>

      <Transition
        as={Fragment}
        enter="duration-150 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel
          focus
          className="absolute z-10 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
        >
          <div className="rounded-lg bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
            <div className="px-4 pt-4 dark:bg-slate-700 flex  items-center justify-between">
              <div>
                <Link to="/">
                  <img
                    className="h-8 w-auto"
                    src={logo}
                    alt="logo"
                  />
                </Link>
              </div>
              <div className="-mr-2">
                <Popover.Button className="dark:bg-slate-700 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span className="sr-only">Close main menu</span>
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </Popover.Button>
              </div>
            </div>
            <div className="px-2 pt-2 pb-3 space-y-1 lg:hiden dark:bg-slate-700">
              <div className="flex items-center">
                <UserMenu />
              </div>
              <Link
                to='/about'
                className="block px-3 py-2 dark:text-slate-200 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              >
                {t('description.part1')}
              </Link>
              <Link
                to='/contacts'
                className="block px-3 py-2 dark:text-slate-200 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              >
                {t('description.part2')}
              </Link>
              <Link
                to='/reviews'
                className="block px-3 py-2 dark:text-slate-200 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              >
                {t('description.part3')}
              </Link>
            </div>

          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}

export default Nav;