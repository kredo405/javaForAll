import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TwitterOutlined, InstagramOutlined, FacebookOutlined, WhatsAppOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import TelegramIcon from '@mui/icons-material/Telegram';
import RefreshToken from '../../utils/refreshToken/refreshToken';
import { Spin, Modal } from 'antd';
import Nav from '../../components/Nav/Nav';
import { MainServices } from "../../services/mainServices";

const success = () => {
    Modal.success({
        content: 'Ваше сообщение отправлено, мы свяжемся с вами в ближайшее время!',
    });
};

const errorModal = (message) => {
    Modal.error({
        title: message
    });
};

const Contacts = () => {
    const [contactsContent, setContactsContent] = useState({
        mainContent: {
            image: "",
            tittle: "",
            text: ""
        },
        feedBackContent: {
            image: "",
            tittle: "",
            text: ""
        },
        socialMedias: [
            {
                componentName: "",
                link: ""
            },
            {
                componentName: "",
                link: ""
            }
        ]

    });
    const [social, setSocial] = useState([]);
    const [isLoading, setIsloading] = useState(false);
    const expiresIn = sessionStorage.getItem('expires_in');
    const token = sessionStorage.getItem('token');
    const dispatch = useDispatch();
    const state = useSelector(state => state);
    const { t, i18n } = useTranslation();
    const isAuth = sessionStorage.getItem('isAuth');

    const addMessage = (data, token) => {
        const body = {
            feedback: data.text,
        }
        if (Boolean(isAuth)) {
            const sendFeedback = async () => {
                try {
                    const feedback = await MainServices.feedback(token, body, state.lang);
                    console.log(feedback);
                    success();
                }
                catch (error) {
                    console.error(error);
                    if (error.response.status !== 401) {
                        errorModal('Не удалось, попробуйте еще раз');
                    }
                }
            }

            sendFeedback();
        }
    }

    useEffect(() => {
        setIsloading(false);
        const getPageContent = async () => {
            try {
                const pageContent = await MainServices.contactsPageContent(state.lang);
                console.log(pageContent.data);
                setContactsContent(pageContent.data);
                const socialMedias = pageContent.data.socialMedias.map(el => {
                    if (el.componentName === '<InstagramOutlined/>') {
                        return (
                            <a className="px-2 md:px-4" href={el.link}><InstagramOutlined style={{ fontSize: '40px' }} /></a>
                        )
                    }
                    if (el.componentName === '<TwitterOutlined/>') {
                        return (
                            <a className="px-2 md:px-4" href={el.link}><TwitterOutlined style={{ fontSize: '40px' }} /></a>
                        )
                    }
                    if (el.componentName === '<FacebookOutlined/>') {
                        return (
                            <a className="px-2 md:px-4" href={el.link}><FacebookOutlined style={{ fontSize: '40px' }} /></a>
                        )
                    }
                    if (el.componentName === '<WhatsAppOutlined/>') {
                        return (
                            <a className="px-2 md:px-4" href={el.link}><WhatsAppOutlined style={{ fontSize: '40px' }} /></a>
                        )
                    }
                    if (el.componentName === '<TelegramIcon/>') {
                        return (
                            <a className="px-2 md:px-4" href={el.link}><TelegramIcon sx={{ fontSize: 40 }} /></a>
                        )
                    }
                });
                setSocial(socialMedias);
                setIsloading(true);
            }
            catch (error) {
                console.error(error);
                errorModal(error.message);
            }
        }

        getPageContent();

    }, [state.lang]);

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
    }, [state.value, isLoading]);

    return (
        <div className="container dark:bg-slate-800 mb-10">
            {isLoading ?
                <>
                    <Nav />
                    <div className="flex flex-col lg:flex-row justify-center lg:justify-between mt-5 dark:bg-slate-700 bg-slate-50 shadow shadow-gray-200">
                        <div className="p-5 flex flex-col justify-center items-center lg:items-start">
                            <h1 className="text-slate-700 dark:text-slate-200 font-semibold text-2xl lg:text-4xl">{contactsContent.mainContent.tittle}</h1>
                            <p className="text-xl font-serif dark:text-slate-300 text-slate-500">
                                {contactsContent.mainContent.text}
                            </p>
                        </div>
                        <div className="flex items-center justify-center">
                            <img src={contactsContent.mainContent.image} alt="Контакты" />
                        </div>
                    </div>
                    <div className="flex justify-center mt-5 mb-3">
                        <h2 className="text-slate-700 dark:text-slate-200 font-semibold text-xl lg:text-2xl">{contactsContent.feedBackContent.tittle}</h2>
                    </div>
                    <div className="flex flex-col pb-5 lg:flex-row justify-around px-3  shadow shadow-gray-200 dark:bg-slate-700 bg-slate-50">
                        <div className="flex justify-center items-center">
                            <img className="w-10/12" src={contactsContent.feedBackContent.image} alt="contacts" />
                        </div>
                        <div>
                            <Formik
                                initialValues={{ text: '' }}
                                validationSchema={
                                    Yup.object({
                                        text: Yup.string()
                                            .min(10, 'Не менее 10 символов ')
                                            .required('Поле обязательно для заполнения!'),
                                    })
                                }
                                onSubmit={(values, { resetForm }) => {
                                    if (+Date.now() >= +expiresIn && isAuth !== null) {
                                        RefreshToken()
                                            .then((response) => {
                                                console.log(response);
                                                sessionStorage.setItem('token', response.data.access_token);
                                                sessionStorage.setItem('refresh_token', response.data.refresh_token);
                                                sessionStorage.setItem('expires_in', Date.now() + (response.data.expires_in * 1000));
                                                sessionStorage.setItem('isAuth', true);
                                                dispatch({
                                                    type: 'TOKEN',
                                                    payload: response.data.access_token,
                                                })
                                                return response.data.access_token;
                                            })
                                            .then((res) => addMessage(values, res))
                                            .catch((error) => {
                                                console.error(error);
                                            });
                                    } else if (isAuth === null) {
                                        errorModal('Сначала авторизуйтесь');
                                    } else {
                                        addMessage(values, token);
                                    }
                                    resetForm({
                                        text: ''
                                    })
                                }}
                            >
                                {({ isSubmitting }) => (
                                    <Form>
                                        <span className='text-slate-700 dark:text-slate-200 text-lg font-mono italic block my-3'>{contactsContent.feedBackContent.text}</span>
                                        <Field
                                            type="text"
                                            name="text"
                                            className="p-2 border-2 rounded-xl border-slate-300 border-solid w-full h-60"
                                            placeholder={t('description.part11')}
                                            as='textarea'
                                        />
                                        <ErrorMessage className='text-red-500 mb-2' name="text" component="div" />
                                        <div className="flex my-2">
                                            <button
                                                className="bg-cyan-500 text-slate-50 p-2"
                                                disabled={isSubmitting}
                                                type="submit"
                                            >
                                                {t('description.part9')}
                                            </button>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                            <div className="flex justify-center mt-5 mb-2">
                                <h5 className="text-slate-700 dark:text-slate-200 font-semibold ">{t('description.part10')}</h5>
                            </div>
                            <div className="flex justify-center mt-3">
                                {social}
                            </div>
                        </div>
                    </div>
                </>
                :
                <div className="flex justify-center items-center h-screen">
                    <Spin size="large" />
                </div>
            }
        </div>
    );
}

export default Contacts;