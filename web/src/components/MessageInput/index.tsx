import { DeleteOutlined, ExclamationCircleFilled, SendOutlined } from '@ant-design/icons';
import { Button, Input, message, Modal } from 'antd';
import React, { useState } from 'react';
import styles from './index.less';
import { useModel } from '@umijs/max';
import { IChatItemMsg } from '@/models/chat';
import { cahtAction, generateUUID } from '@/utils';
import SettingButton from './../SettingButton';
const { confirm } = Modal;
const Index: React.FC = () => {
  const {
    chatStore,
    addChatMsg,
    updateChatMsg,
    setChatItemState,
    knowledgeListSelect,
    deleteChatStore,
  } = useModel('chat');

  const [userMsgValue, setUserMsgValue] = useState('');

  const sendMsg = async () => {
    if (knowledgeListSelect.length === 0) {
      message.warning('请至少选择一个知识库');
      return;
    }
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
      knowledgeListSelect,
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

  const showConfirm = () => {
    confirm({
      title: '清空会话?',
      icon: <ExclamationCircleFilled />,
      onOk() {
        deleteChatStore('demo');
      },
      onCancel() {},
    });
  };
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
          <Button
            type={'text'}
            onClick={showConfirm}
            shape="round"
            style={{ padding: '0 12px' }}
            icon={<DeleteOutlined />}
          ></Button>
          <SettingButton />
          <Button
            type={'primary'}
            className={styles.sendButton}
            onClick={sendMsg}
            shape="round"
            style={{ padding: '0 12px' }}
            icon={<SendOutlined />}
          ></Button>
        </div>
      </div>
    </>
  );
};

export default Index;
