import { useIntl } from '@umijs/max';
import { ConfigProvider, Flex } from 'antd';
import React from 'react';
import ChatContainer from './ChatContainer';
import MessageInput from '@/components/MessageInput';
import { useModel } from '@umijs/max';
import styles from './index.less';
import classNames from 'classnames';
import KnowledgeList from './KnowledgeList';
import AppHeader from '@/components/AppHeader';
import Management from './Management';
import { detectDeviceType } from '@/utils';
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
            <div className={styles.KnowledgeListWrap}>
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
              <div className={classNames(styles.chatContainerWrap, 'chat-container')}>
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
