import { Avatar, Flex } from 'antd';
import React from 'react';
import styles from './index.less';
import { IChatItemMsg } from '@/models/chat';
import userAvatar from './assets/user-avatar.png';

interface IProps {
  messageItem: IChatItemMsg;
}

const Index: React.FC<IProps> = ({ messageItem }) => {
  return (
    <div className={styles.messageItemWrap}>
      <Flex gap={8} justify="flex-end">
        <div className={styles.messageItemContent}>{messageItem.content}</div>
        <div>
          <Avatar size="large" src={userAvatar} alt="User Avatar" style={{ background: '#fff' }} />
        </div>
      </Flex>
    </div>
  );
};

export default Index;
