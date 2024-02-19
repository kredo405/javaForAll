import { Button, Dropdown, Menu, Space } from 'antd';
import LanguageTwoToneIcon from '@mui/icons-material/LanguageTwoTone';
import { useDispatch } from "react-redux";
import { useTranslation } from 'react-i18next';
import flag1 from './ru.png';
import flag2 from './uk.png';
import flag3 from './be.png';

const Language_btn = () => {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();

    const menu = (
        <Menu
            items={[
                {
                    key: '1',
                    label: (
                        <div className='flex items-center' name='ru'  
                        onClick={() => {
                            i18n.changeLanguage('ru');
                            dispatch({
                                type: 'LANG',
                                payload: 'ru'
                              });
                            sessionStorage.setItem('lang', 'ru');
                        }}>
                            <img className='w-2/12' src={flag1} alt="ru" />
                            <span className='pl-2'>Русский</span>
                        </div>
                    ),
                },
                {
                    key: '2',
                    label: (
                        <div className='flex items-center'
                          onClick={() => {
                              i18n.changeLanguage('en');
                              dispatch({
                                type: 'LANG',
                                payload: 'en'
                              });
                              sessionStorage.setItem('lang', 'en');
                              }}>
                            <img className='w-2/12' src={flag2} alt="en" />
                            <span className='pl-2'>English</span>
                        </div>
                    ),
                },
                {
                    key: '3',
                    label: (
                        <div className='flex items-center'
                          onClick={() => {
                              i18n.changeLanguage('be');
                              dispatch({
                                type: 'LANG',
                                payload: 'be'
                              });
                              sessionStorage.setItem('lang', 'be');
                              }}>
                            <img className='w-2/12' src={flag3} alt="be" />
                            <span className='pl-2'>Беларуский</span>
                        </div>
                    ),
                },
            ]}
        />
    );
    
    return (
        <div className='lg:ml-10 ml-1'>
            <Space direction="vertical">
            <Space wrap>
                <Dropdown overlay={menu} placement="bottom">
                    <Button type='link' ghost><LanguageTwoToneIcon fontSize='medium' color='info' /></Button>
                </Dropdown>
            </Space>
        </Space>
        </div>

    )
}

export default Language_btn;