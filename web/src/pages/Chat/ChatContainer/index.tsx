import MessageItem from '@/components/MessageItem';
import React from 'react';
import styles from './index.less';
import { useModel } from '@umijs/max';
import { IChatItemMsg } from '@/models/chat';

const Index: React.FC = () => {
  const { chatStore } = useModel('chat');
  const { messages } = chatStore['demo'];
  return (
    <>
      <div className={styles.messageContainer}>
        {messages?.map((x: IChatItemMsg) => (
          <>
            <MessageItem messageItem={x} />
          </>
        ))}
      </div>
    </>
  );
};

export default Index;
