import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import { Button, Flex, Input } from 'antd';
import React, { useState } from 'react';
import styles from './index.less';
import { useModel } from '@umijs/max';
import { IChatItemMsg } from '@/models/chat';
import { cahtAction, generateUUID, getChatResponseJsonFromResponseText } from '@/utils';
import sendIcon from './assets/send.svg';

const Index: React.FC = () => {
  const { chatStore, addChatMsg, updateChatMsg, setChatItemState } = useModel('chat');

  const [userMsgValue, setUserMsgValue] = useState('');

  const sendMsg = async () => {
    if (chatState === 'loading' || userMsgValue.trim() === '') {
      return;
    }
    const chatMsgItemUser: IChatItemMsg = {
      content: userMsgValue,
      role: 'user',
      date: '',
      id: generateUUID(),
    };
    addChatMsg('demo', chatMsgItemUser);
    setChatItemState('demo', 'loading');
    setUserMsgValue('');
    const msgId = generateUUID();
    const chatMsgItem: IChatItemMsg = {
      content: '正在搜索...',
      role: 'assistant',
      id: msgId,
      date: '',
    };
    addChatMsg('demo', chatMsgItem);
    cahtAction({
      id: msgId,
      question: userMsgValue,
      onMessage: (chatMsgItem: IChatItemMsg) => {
        updateChatMsg('demo', chatMsgItem);
      },
      onSuccess: (chatMsgItem: IChatItemMsg) => {
        updateChatMsg('demo', chatMsgItem);
        setChatItemState('demo', 'success');
      },
    });
  };

  const chatState = chatStore.demo.state;
  return (
    <>
      <div className={styles.MessageInputInner}>
        <Input.TextArea
          autoSize={{ minRows: 4, maxRows: 4 }}
          placeholder={'请输入问题'}
          value={userMsgValue}
          onChange={(e) => {
            setUserMsgValue(e.target.value);
          }}
        ></Input.TextArea>
        <div className={styles.buttonGroup}>
          <Button type={'primary'} onClick={sendMsg} shape="round" style={{ padding: '0 12px' }}>
            <img style={{ width: 18, height: 18 }} src={sendIcon} />
          </Button>
        </div>
      </div>
    </>
  );
};

export default Index;
