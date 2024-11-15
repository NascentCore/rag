import AppHeader from '@/components/AppHeader';
import MessageInput from '@/components/MessageInput';
import { detectDeviceType } from '@/utils';
import { useIntl, useModel } from '@umijs/max';
import { ConfigProvider, Flex } from 'antd';
import React from 'react';
import ChatContainer from './ChatContainer';
import styles from './index.less';
import KnowledgeList from './KnowledgeList';
import Management from './Management';
const deviceType = detectDeviceType();

const Admin: React.FC = () => {
  const intl = useIntl();

  const { knowledgeActiveId } = useModel('chat');

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
        <AppHeader />
        <Flex>
          {deviceType === 'pc' && (
            <div className={styles.KnowledgeListWrap} id="knowledge-list-wrap">
              <KnowledgeList />
            </div>
          )}

          {knowledgeActiveId ? (
            /* 管理页面 */
            <div className={styles.ManagementWrap}>
              <Management />
            </div>
          ) : (
            /* chat页面 */
            <div className={styles.chatPageWrap} style={{ flex: 1 }}>
              <div className={styles.chatContainerWrap} id="chat-container">
                <ChatContainer />
              </div>
              <div className={styles.MessageInputWrap}>
                <MessageInput />
              </div>
            </div>
          )}
        </Flex>
      </ConfigProvider>
    </>
  );
};

export default Admin;
