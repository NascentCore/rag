import { ConfigProvider } from 'antd';
import React, { useEffect } from 'react';
import styles from './index.less';
import MessageInput from './MessageInput';
import ChatContainer from './ChatContainer';
import { scrollH5ChatBodyToBottom } from '@/utils';

const Admin: React.FC = () => {
  useEffect(() => {
    window.document.title = '产品咨询';
    scrollH5ChatBodyToBottom(false);
  }, []);

  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#5a47e5',
            colorLink: '#5a47e5',
          },
        }}
      >
        <div className={styles.container}>
          <ChatContainer />
          <MessageInput />
        </div>
      </ConfigProvider>
    </>
  );
};

export default Admin;
