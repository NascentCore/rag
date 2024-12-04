import { IChatItemMsg } from '@/models/chat';
import { RedoOutlined } from '@ant-design/icons';
import { useModel } from '@umijs/max';
import { Avatar, Button, Collapse } from 'antd';
import React from 'react';
import { MarkdownContent } from './../../MarkdownContent';
import assistantAvatar from './../assets/assistant-avatar.png';
import styles from './../index.less';
import SourceDocumentsList from './SourceDocumentsList';

interface IProps {
  messageItem: IChatItemMsg;
}

const Index: React.FC<IProps> = ({ messageItem }) => {
  const { reQuestionAction } = useModel('chat');
  console.log('RobotMessageItem messageItem', messageItem);
  const sourceDocsCount = messageItem.source_documents?.length;

  return (
    <>
      <div className={styles.messageItemWrap}>
        <div>
          <Avatar
            size="large"
            icon={<img src={assistantAvatar} alt="Assistant Avatar" />}
            style={{ background: '#fff' }}
          />
        </div>
        <div className={styles.messageItemContent} style={{ background: '#fff' }}>
          <MarkdownContent content={messageItem.content} />
          {!!(sourceDocsCount && sourceDocsCount > 0) && (
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
      </div>

      <Button
        style={{ marginLeft: 40 }}
        type="link"
        icon={<RedoOutlined />}
        onClick={() => {
          console.log('重新生成');
          reQuestionAction(messageItem);
        }}
      >
        重新生成
      </Button>
    </>
  );
};

export default Index;
