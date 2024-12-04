import { IChatItemMsg } from '@/models/chat';
import { useModel } from '@umijs/max';
import React from 'react';
import styles from './index.less';
import MessageItem from '../MessageItem';
import coverImg from './assets/21book.png';

const Index: React.FC = () => {
  const { chatStore, activeChat } = useModel('chat-h5');
  const chatListItem = chatStore[activeChat];
  return (
    <>
      <div>
        <div className={styles.messageContainer} id="chat-container-h5">
          <div style={{ textAlign: 'center', marginBottom: 20 }}>
            <img style={{ width: 200 }} src={coverImg}></img>
          </div>
          <MessageItem
            messageItem={{
              content: '您好，这里是太空舱产品咨询，您有相关的问题都可以在这里向我提问。',
              role: 'assistant',
              id: 'demo-welcome',
            }}
          />
          {chatListItem.messages?.map((x: IChatItemMsg) => (
            <>
              <MessageItem messageItem={x} />
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default Index;
