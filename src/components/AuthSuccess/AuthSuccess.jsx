import { Button, Result } from 'antd';
import { Link, Navigate, } from "react-router-dom";
import { useTranslation } from 'react-i18next';


const AuthSuccess = () => {
    const { t, i18n } = useTranslation();

    return (
        <div className='h-screen flex flex-col justify-center'>
            <div className="flex justify-center items-center">
                <Result
                    status="success"
                />
            </div>
            <div className="flex justify-center">
                <h1 className='text-xl md:text-3xl dark:text-slate-200'>{t('description.part33')}</h1>
            </div>
            <div className="flex justify-center px-3">
                <p className='text-lg md:text-xl text-center dark:text-slate-200'>{t('description.part34')}</p>
            </div>
            <div className="flex justify-center mt-5">
                <Button type="primary" className='mr-3'>
                    <Link to='/main'>{t('description.part35')}</Link>
                </Button>,
                <Button  className='ml-3'>
                    <Link to='/study'>{t('description.part36')}</Link>
                </Button>
            </div>
        </div>
    )
}

export default AuthSuccess;