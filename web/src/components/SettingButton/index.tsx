import { SettingOutlined } from '@ant-design/icons';
import { Button, Modal, Tabs } from 'antd';
import React, { useState } from 'react';
import ModelTab from './ModelTab';
import SettingTab from './SettingTab';

const Index: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const tabItem = [
    {
      key: '1',
      label: '模型设置',
      children: <ModelTab handleCancel={handleCancel} />,
    },
    {
      key: '2',
      label: '系统设置',
      children: <SettingTab />,
    },
  ];
  const [activeTab, setActiveTab] = useState('1');
  return (
    <>
      <Button
        type={'text'}
        shape="round"
        style={{ padding: '0 12px' }}
        icon={<SettingOutlined />}
        onClick={showModal}
      ></Button>
      <Modal open={isModalOpen} width={1000} footer={null} title={null} onCancel={handleCancel}>
        <Tabs
          activeKey={activeTab}
          items={tabItem}
          onChange={setActiveTab}
          destroyInactiveTabPane
        />
      </Modal>
    </>
  );
};

export default Index;
