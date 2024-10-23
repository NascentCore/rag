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

const Admin: React.FC = () => {
  const intl = useIntl();

  const { setKnowledgeList } = useModel('chat');

  useEffect(() => {
    api_list_knowledge_base().then((res: any) => {
      console.log('api_list_knowledge_base', res);
      setKnowledgeList(res?.data || []);
    });
  }, []);

  return (
    <>
      <ConfigProvider>
        <AppHeader />
        <Flex>
          <div className={styles.KnowledgeListWrap}>
            <KnowledgeList />
          </div>
          {/* chat页面 */}
          <div className={styles.chatPageWrap} style={{ flex: 1 }}>
            <div className={classNames(styles.chatContainerWrap, 'chat-container')}>
              <ChatContainer />
            </div>
            <div className={styles.MessageInputWrap}>
              <MessageInput />
            </div>
          </div>
          {/* 管理页面 */}
          {/* <div className={styles.ManagementWrap}>
            <Management />
          </div> */}
        </Flex>
      </ConfigProvider>
    </>
  );
};

export default Admin;
