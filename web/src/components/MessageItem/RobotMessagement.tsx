import { GithubOutlined, RedoOutlined, UserOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import { Avatar, Button, Col, Collapse, Flex, Row, Space } from 'antd';
import React from 'react';
import styles from './index.less';
import { IChatItemMsg } from '@/models/chat';
import DocumentView from './DocumentList';
import assistantAvatar from './assets/assistant-avatar.png';
import { MarkdownContent } from '../MarkdownContent';

interface IProps {
  messageItem: IChatItemMsg;
}
const Index: React.FC<IProps> = ({ messageItem }) => {
  const isAssistant = true;
  return (
    <>
      <div className={styles.messageItemWrap}>
        <Flex gap={8}>
          <div>
            <Avatar
              size="large"
              icon={<img src={assistantAvatar} />}
              style={{ background: '#fff' }}
            />
          </div>
          <div className={styles.messageItemContent} style={{ background: '#fff' }}>
            <div>
              <MarkdownContent content={messageItem.content} />
            </div>
            {messageItem.source_documents && (
              <div>
                <Collapse
                  ghost
                  bordered={false}
                  size="small"
                  items={[
                    {
                      key: '1',
                      label: `找到了 ${messageItem.source_documents.length} 个信息来源`,
                      children: <DocumentView messageItem={messageItem} />,
                    },
                  ]}
                />
              </div>
            )}
          </div>
        </Flex>
        <Button
          style={{ marginLeft: 40 }}
          type="link"
          icon={<RedoOutlined />}
          onClick={() => {
            console.log('重新生成');
          }}
        >
          重新生成
        </Button>
      </div>
    </>
  );
};

export default Index;
