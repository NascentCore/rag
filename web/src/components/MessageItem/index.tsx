import { GithubOutlined, UserOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import { Avatar, Flex, Space } from 'antd';
import React from 'react';
import styles from './index.less';
import RobotMessagement from './RobotMessagement';
import UserMessageItem from './UserMessageItem';
import { IChatItem, IChatItemMsg } from '@/models/chat';

interface IProps {
  messageItem: IChatItemMsg;
}
const Index: React.FC<IProps> = ({ messageItem }) => {
  const isAssistant = true;
  return (
    <>
      {messageItem.role === 'user' && <UserMessageItem messageItem={messageItem} />}
      {messageItem.role === 'assistant' && <RobotMessagement messageItem={messageItem} />}
    </>
  );
};

export default Index;
