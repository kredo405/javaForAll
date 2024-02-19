import { Rate, Button, message, Space } from 'antd';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from "react-redux";
import { CloseOutlined } from '@ant-design/icons';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Modal from 'react-bootstrap/Modal';
import * as ant from 'antd';
import { useState } from 'react';
import RefreshToken from '../../utils/refreshToken/refreshToken';
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

const Review_modal = (props) => {
    const [show, setShow] = useState(false);
    const [rating, setRating] = useState(2.5);
    const expiresIn = sessionStorage.getItem('expires_in');
    const isAuth = sessionStorage.getItem('isAuth');
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    const token = sessionStorage.getItem('token');
    const state = useSelector(state => state);

    const handleClose = () => setShow(false);

    const handleShow = () => setShow(true);

    const addReview = async (data, token) => {
        const body = {
            tittle: data.title,
            text: data.text,
            rating: rating
        }

        try {
            const addResponse = await MainServices.reviewAdd(token, state.lang, body);
            console.log(addResponse.data);
            success('Ваш отзыв успешно добавлен!');
            props.getReview();
            setShow(false);
        }
        catch (error) {
            console.error(error);
            if (error.response.status === 500 && error.response.data.httpStatus === 'INTERNAL_SERVER_ERROR') {
                errorModal(error.response.data.message);
            } else {
                errorModal(error.message);
            }
            setShow(false);
        }
    }

    return (
        <>
            <Button type="primary" onClick={handleShow}>
                {t('description.part7')}
            </Button>
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
                                .then((res) => addReview(values, res))
                                .catch((error) => {
                                    console.error(error);
                                });
                        } else if (isAuth === null) {
                            setShow(false);
                            errorModal('Сначала авторизуйтесь');
                        }
                        else {
                            addReview(values, token)
                        }
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <Modal.Header>
                                <Modal.Title>{t('description.part7')}</Modal.Title>
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
                                    <Rate className='mr-10' value={rating} onChange={setRating} defaultValue={2.5} />
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
        </>
    )
}

export default Review_modal;