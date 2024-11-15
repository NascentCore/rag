import { IChatItemMsg } from '@/models/chat';
import { Avatar } from 'antd';
import React from 'react';
import userAvatar from './../assets/user-avatar.png';
import styles from './../index.less';

interface IProps {
  messageItem: IChatItemMsg;
}

const Index: React.FC<IProps> = ({ messageItem }) => {
  return (
    <div className={styles.messageItemWrap} style={{ justifyContent: 'flex-end' }}>
      <div className={styles.messageItemContent}>{messageItem.content}</div>
      <div>
        <Avatar size="large" src={userAvatar} alt="User Avatar" style={{ background: '#fff' }} />
      </div>
    </div>
  );
};

export default Index;
