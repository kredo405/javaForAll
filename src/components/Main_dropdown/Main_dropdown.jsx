import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Space } from 'antd';
import React from 'react';
import tren from '../../img/tren.png';
import main from '../../img/main.png';


const menu = (
  <Menu
    items={[
      {
        label: (
          <a target="_blank" className='text-gray-700 hover:text-gray-900 hover:bg-gray-50' rel="noopener noreferrer" href="#">
            <div className="flex items-center">
            <img src={tren} alt="" className="w-10" />
            <span >Тренажер</span>
            </div>
          </a>
        ),
        key: '0',
      },
      {
        type: 'divider',
      },
      {
        label: (
          <a target="_blank"  rel="noopener noreferrer" href="#">
            <div className="flex items-center">
                <img src={main} alt="" className="w-10" />
                <span>Справочная литература</span>
            </div>
          </a>
        ),
        key: '1',
      },
      
    ]}
  />
);

const Main_dropdown = () => {
    return (
        <Dropdown overlay={menu}>
        <a className='text-gray-500 hover:text-gray-900 hover:bg-gray-50 px-3' onClick={(e) => e.preventDefault()}>
          <Space>
            Ещё
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
    )
}

export default Main_dropdown;