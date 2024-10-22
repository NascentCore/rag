import { HeartTwoTone, SmileTwoTone } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import { Alert, Card, ConfigProvider, Flex, Typography } from 'antd';
import React from 'react';
import ChatContainer from './ChatContainer';
import MessageInput from '@/components/MessageInput';
import { useModel } from '@umijs/max';
import styles from './index.less';
import classNames from 'classnames';
import KnowledgeList from './KnowledgeList';
import AppHeader from '@/components/AppHeader';

const Admin: React.FC = () => {
  const intl = useIntl();

  return (
    <>
      <ConfigProvider>
        <AppHeader />
        <Flex>
          <div className={styles.KnowledgeListWrap}>
            <KnowledgeList />
          </div>
          <div className={styles.chatPageWrap} style={{ flex: 1 }}>
            <div className={classNames(styles.chatContainerWrap, 'chat-container')}>
              <ChatContainer />
            </div>
            <div className={styles.MessageInputWrap}>
              <MessageInput />
            </div>
          </div>
        </Flex>
      </ConfigProvider>
    </>
  );
};

export default Admin;
