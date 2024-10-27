import React from 'react';
import RobotMessagement from './RobotMessagement';
import UserMessageItem from './UserMessageItem';
import { IChatItemMsg } from '@/models/chat';

interface IProps {
  messageItem: IChatItemMsg;
}

const Index: React.FC<IProps> = ({ messageItem }) => {
  const MessageComponent = messageItem.role === 'user' ? UserMessageItem : RobotMessagement;

  return <MessageComponent messageItem={messageItem} />;
};

export default Index;
