import { Button, Dropdown, Menu, Space } from 'antd';
import { useTranslation } from 'react-i18next';

const menu = (
    <Menu
        items={[
            {
                key: '1',
                label: (
                    <span>По имени(по возвростанию)</span>
                ),
            },
            {
                key: '2',
                label: (
                    <span>По имени(по убыванию)</span>
                ),
            },
            {
                key: '3',
                label: (
                    <span>По дате(по возвростанию)</span>
                ),
            },
            {
                key: '4',
                label: (
                    <span>По дате(по убыванию)</span>
                ),
            },
            {
                key: '5',
                label: (
                    <span>По рейтингу(по возвростанию)</span>
                ),
            },
            {
                key: '6',
                label: (
                    <span>По рейтингу(по убыванию)</span>
                ),
            },
        ]}
    />
);

const DropdownMain = () => {
    const { t, i18n } = useTranslation();
    
    return (
        <Space direction="vertical">
            <Space wrap>
                <Dropdown overlay={menu} placement="bottom">
                    <Button>{t('description.part8')}</Button>
                </Dropdown>
            </Space>
        </Space>
    )
}

export default DropdownMain;