import React from 'react';
import { Rate, Avatar, Image, Space } from 'antd';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from "react-redux";
import { CloseOutlined } from '@ant-design/icons';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import RefreshToken from '../../utils/refreshToken/refreshToken';
import * as Yup from 'yup';
import Modal from 'react-bootstrap/Modal';
import * as ant from 'antd';
import { useState, useEffect } from 'react';
import { MainServices } from '../../services/mainServices';

const success = (message) => {
    ant.Modal.success({
        content: message,
    });
};

const errorModal = (message) => {
    ant.Modal.error({
        title: message
    });
};

const Review = (props) => {
    const { getRewiewList, date, username, avatar, owner, id, reviewRating } = props;
    const [show, setShow] = useState(false);
    const [isLoading, setIsloading] = useState(false);
    const [rating, setRating] = useState(3);
    const { t, i18n } = useTranslation();
    const expiresIn = sessionStorage.getItem('expires_in');
    const isAuth = sessionStorage.getItem('isAuth');
    const state = useSelector(state => state);
    const token = sessionStorage.getItem('token')
    const dispatch = useDispatch();

    const handleClose = () => setShow(false);

    const handleShow = () => setShow(true);

    const deleteReview = async () => {
        if (+Date.now() >= +expiresIn && isAuth !== null) {
            const refreshToken = await RefreshToken();
            console.log(refreshToken);
            sessionStorage.setItem('token', refreshToken.data.access_token);
            sessionStorage.setItem('refresh_token', refreshToken.data.refresh_token);
            sessionStorage.setItem('expires_in', Date.now() + (refreshToken.data.expires_in * 1000));
            sessionStorage.setItem('isAuth', true);
            dispatch({
                type: 'TOKEN',
                payload: refreshToken.data.access_token,
            })

            try {
                const deleteRes = await MainServices.reviewDelete(id, refreshToken.data.access_token, state.lang);
                console.log(deleteRes.data);
                success('Ваш отзыв удалён!');
                getRewiewList();
            }
            catch (error) {
                console.error(error);
                errorModal(error.message);
            }

        } else {
            try {
                const deleteRes = await MainServices.reviewDelete(id, token, state.lang);
                console.log(deleteRes.data);
                success('Ваш отзыв удалён!');
                getRewiewList();
            }
            catch (error) {
                console.error(error);
                errorModal(error.message);
            }
        }
    }

    const updateReview = async (data, token) => {
        if (Boolean(isAuth)) {
            const body = {
                tittle: data.title,
                text: data.text,
                rating: rating
            }

            try {
                const putResponse = await MainServices.reviewUpdate(id, token, state.lang, body);
                console.log(putResponse.data);
                success('Ваш отзыв изменен');
                handleClose();
                getRewiewList();
            }
            catch (error) {
                console.error(error);
                errorModal('Не удалось, попробуйте еще раз');
                handleClose();
            }
        }
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
    }, [state.value, isLoading]);

    return (
        <div className="flex mt-10 w-full">
            <Modal show={show} onHide={handleClose}>

                <Formik
                    initialValues={{ title: '', text: '' }}
                    validationSchema={
                        Yup.object({
                            title: Yup.string()
                                .min(5, 'Не менее 5 символов ')
                                .required('Поле обязательно для заполнения!'),
                            text: Yup.string()
                                .min(10, 'Не менее 10 символов ')
                                .required('Поле обязательно для заполнения!'),
                        })
                    }
                    onSubmit={(values) => {

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
                                .then((res) => {
                                    updateReview(values, res);
                                })
                                .catch((error) => {
                                    console.error(error);
                                });
                        } else {
                            updateReview(values, token)
                        }
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <Modal.Header>
                                <Modal.Title>Изменить отзыв</Modal.Title>
                                <CloseOutlined onClick={handleClose} />
                            </Modal.Header>
                            <Modal.Body>
                                <div className="flex flex-col items-center justify-center">
                                    <Field
                                        type="text"
                                        name="title"
                                        className='border-2 rounded-md p-2 border-slate-400 border-solid w-full mb-3'
                                        placeholder='Заголовок'
                                    />
                                    <ErrorMessage className='text-red-500 mb-2' name="title" component="div" />
                                    <Field
                                        type="text"
                                        name="text"
                                        className='border-2 rounded-md p-2 border-slate-400 border-solid w-full'
                                        placeholder='Текст отзыва'
                                        as='textarea'
                                    />
                                    <ErrorMessage className='text-red-500 mb-2' name="text" component="div" />
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <div className="mr-20">
                                    <Rate className='mr-10' value={rating} onChange={setRating} defaultValue={3} />
                                </div>
                                <Space>
                                    <button
                                        className='bg-sky-500 p-2 text-slate-50'
                                        disabled={isSubmitting}
                                        type="submit"
                                    >{t('description.part9')}</button>
                                </Space>
                            </Modal.Footer>
                        </Form>
                    )}
                </Formik>
            </Modal>
            <div className='border-solid border-b-2 border-slate-200 w-full flex pb-2'>
                <div className='pr-5 flex mt-3'>
                    <Avatar
                        src={
                            <Image
                                src={avatar}
                                style={{
                                    width: 32,
                                }}
                            />
                        }
                    />
                </div>
                <div className='w-full'>
                    <div className="block md:flex items-center justify-between w-full">
                        <div className='block md:flex items-center'>
                            <h3 className='text-3xl text-slate-600 dark:text-slate-200 mt-2 pr-3'>{username}</h3>
                            <Rate disabled defaultValue={reviewRating} />
                        </div>
                        <div>
                            <span className='text-slate-500 dark:text-slate-300'>{date.slice(0, 10) + ' ' + date.slice(11, 16)}</span>
                        </div>
                    </div>
                    <h3 className='text-xl dark:text-slate-200 font-semibold'>{props.title}</h3>
                    <p className='dark:text-slate-200'>{props.text}</p>
                    {owner ?
                        <div className="flex justify-start">
                            <button onClick={deleteReview} className='pr-3 text-red-600'>Удалить</button>
                            <button onClick={handleShow} className='pl-3 text-teal-600'>Изменить</button>
                        </div>
                        :
                        null
                    }
                </div>
            </div>
        </div>
    )
}

export default Review;