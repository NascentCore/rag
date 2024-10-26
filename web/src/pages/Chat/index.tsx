import { HeartTwoTone, SmileTwoTone } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import { Alert, Card, ConfigProvider, Flex, Typography } from 'antd';
import React, { useEffect } from 'react';
import ChatContainer from './ChatContainer';
import MessageInput from '@/components/MessageInput';
import { useModel } from '@umijs/max';
import styles from './index.less';
import classNames from 'classnames';
import KnowledgeList from './KnowledgeList';
import AppHeader from '@/components/AppHeader';
import Management from './Management';
import { api_list_knowledge_base } from '@/services';
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
          {/* chat页面 */}
          {!knowledgeActiveId && (
            <div className={styles.chatPageWrap} style={{ flex: 1 }}>
              <div className={classNames(styles.chatContainerWrap, 'chat-container')}>
                <ChatContainer />
              </div>
              <div className={styles.MessageInputWrap}>
                <MessageInput />
              </div>
            </div>
          )}

          {/* 管理页面 */}
          {knowledgeActiveId && (
            <div className={styles.ManagementWrap}>
              <Management />
            </div>
          )}
        </Flex>
      </ConfigProvider>
    </>
  );
};

export default Admin;
