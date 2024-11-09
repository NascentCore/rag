import { RedoOutlined } from '@ant-design/icons';
import { Avatar, Button, Collapse, Flex } from 'antd';
import React from 'react';
import styles from './../index.less';
import { IChatItemMsg } from '@/models/chat';
import SourceDocumentsList from './SourceDocumentsList';
import assistantAvatar from './../assets/assistant-avatar.png';
import { MarkdownContent } from './../../MarkdownContent';

interface IProps {
  messageItem: IChatItemMsg;
}

const Index: React.FC<IProps> = ({ messageItem }) => {
  console.log('RobotMessageItem messageItem', messageItem);
  const sourceDocsCount = messageItem.source_documents?.length;

  return (
    <div className={styles.messageItemWrap}>
      <Flex gap={8}>
        <div>
          <Avatar
            size="large"
            icon={<img src={assistantAvatar} alt="Assistant Avatar" />}
            style={{ background: '#fff' }}
          />
        </div>

        <div className={styles.messageItemContent} style={{ background: '#fff' }}>
          <MarkdownContent content={messageItem.content} />
          {sourceDocsCount && sourceDocsCount > 0 && (
            <Collapse
              ghost
              bordered={false}
              size="small"
              items={[
                {
                  key: '1',
                  label: `找到了 ${sourceDocsCount} 个信息来源`,
                  children: <SourceDocumentsList messageItem={messageItem} />,
                },
              ]}
            />
          )}
        </div>
      </Flex>
      <Button
        style={{ marginLeft: 40 }}
        type="link"
        icon={<RedoOutlined />}
        onClick={() => console.log('重新生成')}
      >
        重新生成
      </Button>
    </div>
  );
};

export default Index;
