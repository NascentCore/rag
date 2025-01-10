/**
 * 算想云推理试用页面的 chat-ui
 * iframe 打开页面 需要传递参数 model 和 token
 * 例如: http://localhost:8001/chat-h5-model?model=google/gemma-2b-it&token=Bearer%20eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0YjgxMDczMmIxNWY0NzYxOTYyMGM4YmEyMDFiNTMwNSIsInN1YiI6InBsYXlncm91bmRAc3h3bC5haSIsInVzZXJfaWQiOiJ1c2VyLTc4ZGM1NTU3LTZiYjktNGMwZi05ZGQzLTIxZmE5YTc3MTM0OSIsInVzZXJpZCI6ODgsInVzZXJuYW1lIjoicGxheWdyb3VuZEBzeHdsLmFpIn0.RSyYZNQMH9LGrzo2qrDCwSNW97-8pEPi9fuAsU2SLzXRhD5Y5bNki8yCdHYG_WrfT1TR5bm3QO_gKBaX332xgQ
 * chat 功能请求的url地址是 {host}/api/v1/chat/completions
 */
import { ConfigProvider, message } from 'antd';
import React, { useEffect } from 'react';
import styles from './index.less';
import MessageInput from './MessageInput';
import ChatContainer from './ChatContainer';
import { getParameterByName, scrollH5ChatBodyToBottom } from '@/utils';

const Admin: React.FC = () => {
  useEffect(() => {
    window.document.title = '产品咨询';
    scrollH5ChatBodyToBottom(false);
  }, []);

  useEffect(() => {
    const model = getParameterByName('model');
    const token = getParameterByName('token');
    if (!model || !token) {
      message.error('缺少参数');
      return;
    }
    sessionStorage.setItem('chat-h5-model-model', decodeURI(model));
    sessionStorage.setItem('chat-h5-model-token', decodeURI(token));
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
