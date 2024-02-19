import { UnlockFilled } from '@ant-design/icons';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from "react-router-dom";
import { Alert, message, Tooltip, Modal, Avatar, Spin } from 'antd';
import * as Yup from 'yup';
import Nav from "../../components/Nav/Nav";
import { authServices } from '../../services/authServices';
import { MainServices } from '../../services/mainServices';

const showError = (errorMessage) => {
    message.error(errorMessage);
};

const Registration = () => {
    const state = useSelector(state => state);
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [urls, setUrls] = useState(['']);
    const [avatar, setAvatar] = useState('');
    const [modalLoading, setModalLoading] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);

        const getAvatarsUrls = async () => {
            setModalLoading(true);
            const res = await MainServices.getListLinks();
            console.log(res);
            setUrls(res.data);
            setModalLoading(false);
        }

        getAvatarsUrls();
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const avatars = urls.map(el => {
        return (
            <Avatar onClick={() => { setAvatar(el); handleCancel() }} size="large" src={<img src={el} alt="avatar" />} />
        )
    })

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
        <div className='container'>
            <div>
                <Nav />
            </div>
            <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <h2 className="mt-6 text-center dark:text-slate-200 text-3xl font-extrabold text-gray-900">{t('description.part21')}</h2>
                    </div>
                    <Formik
                        initialValues={{
                            userName: '',
                            lastName: '',
                            firstName: '',
                            email: '',
                            password: '',
                        }}
                        validationSchema={
                            Yup.object({
                                userName: Yup.string()
                                    .min(2, 'Не менее 2 символов ')
                                    .required('Поле обязательно для заполнения!'),
                                lastName: Yup.string()
                                    .min(2, 'Не менее 2 символов ')
                                    .required('Поле обязательно для заполнения!'),
                                firstName: Yup.string()
                                    .min(2, 'Не менее 2 символов ')
                                    .required('Поле обязательно для заполнения!'),
                                email: Yup.string()
                                    .email('Неверный email')
                                    .required('Поле обязательно для заполнения!'),
                                password: Yup.string()
                                    .required('Поле обязательно для заполнения!')
                                    .matches(
                                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
                                        "Должен содержать 8 символов, один символ верхнего регистра, один символ нижнего регистра и одну цифру."
                                    ),
                            })
                        }
                        onSubmit={async (values) => {
                            console.log(values)
                            try {
                                sessionStorage.setItem('avatarLink', avatar);
                                const adminCli = await authServices.getTokenAdmin();
                                const addUser = await authServices.addNewUser(values, adminCli.data.access_token);
                                console.log(addUser);
                                if (addUser.status === 201) {
                                    navigate('/registrationSuccess');
                                }
                            }
                            catch (error) {
                                console.log(error);
                                showError(error.message);
                            }
                        }}
                    >
                        {({ isSubmitting }) => (
                            <Form>
                                <Field
                                    type="text"
                                    name="userName"
                                    className="appearance-none mb-2 rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder={t('description.part22')}
                                />
                                <ErrorMessage name="userName" >{msg => <Alert message={msg} type="error" />}</ ErrorMessage>
                                <Field
                                    type="email"
                                    name="email"
                                    className="appearance-none mb-2 mt-3 rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder={t('description.part14')}
                                />
                                <ErrorMessage name="email" >{msg => <Tooltip title={msg} color='volcano'>

                                </Tooltip>}</ ErrorMessage>
                                <Field
                                    type="text"
                                    name="lastName"
                                    className="appearance-none mb-2 mt-3 rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder={t('description.part24')}
                                />
                                <ErrorMessage name="lastName" >{msg => <Alert message={msg} type="error" />}</ ErrorMessage>
                                <Field
                                    type="text"
                                    name="firstName"
                                    className="appearance-none mb-2 mt-3 rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder={t('description.part23')}
                                />
                                <ErrorMessage name="firstName" >{msg => <Alert message={msg} type="error" />}</ ErrorMessage>
                                <Field
                                    type="password"
                                    name="password"
                                    className="appearance-none mb-2 mt-3 rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder={t('description.part15')}
                                />
                                <ErrorMessage name="password" >{msg => <Alert message={msg} type="error" />}</ ErrorMessage>
                                {
                                    avatar === '' ?
                                        <div className='flex justify-center py-3'>
                                            <button
                                                type="button"
                                                onClick={showModal}
                                                className="rounded-md bg-emerald-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
                                            >
                                                Добавить аватар
                                            </button>
                                        </div>
                                        :
                                        <div className='flex justify-center py-3'>
                                            <Avatar size={64} src={<img src={avatar} alt="avatar" />} />
                                        </div>
                                }

                                <>
                                    <Modal
                                        title="Аватар"
                                        open={isModalOpen}
                                        onCancel={handleCancel}
                                        footer={[
                                            <div className='border-t'>
                                                <button
                                                    type="button"
                                                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                                    onClick={handleCancel}
                                                >
                                                    Закрыть
                                                </button>

                                            </div>
                                        ]}
                                    >
                                        {modalLoading ?
                                            <div className='w-full flex justify-center'><Spin /></div>
                                            :
                                            avatars
                                        }
                                    </Modal>
                                </>

                                <button
                                    disabled={isSubmitting}
                                    type="submit"
                                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                        <UnlockFilled className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                                    </span>
                                    {t('description.part29')}
                                </button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
            <div className="flex justify-center">
                <p className='font-sans text-lg dark:text-slate-200 font-medium'>{t('description.part30')} <Link to="/auth">{t('description.part31')}</Link></p>
            </div>
        </div>
    )
}

export default Registration;



