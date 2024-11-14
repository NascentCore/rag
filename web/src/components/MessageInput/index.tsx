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
  const { chatStore, activeChat, knowledgeListSelect, deleteChatStore, questionAction } =
    useModel('chat');
  const chatState = chatStore[activeChat]?.state;
  const [userMsgValue, setUserMsgValue] = useState('');

  const sendMsg = async () => {
    if (knowledgeListSelect.length === 0) {
      message.warning('请至少选择一个知识库');
      return;
    }
    if (chatState === 'loading' || userMsgValue.trim() === '') {
      return;
    }
    questionAction({ chatid: activeChat, userMsgValue });
    setUserMsgValue('');
  };

  const showConfirm = () => {
    confirm({
      title: '清空会话?',
      icon: <ExclamationCircleFilled />,
      onOk() {
        deleteChatStore(activeChat);
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
          onPressEnter={(event) => {
            if (window.innerWidth > 800) {
              if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault();
                sendMsg();
              }
            } else {
              if (event.key === 'Enter' && event.ctrlKey) {
                event.preventDefault();
                sendMsg();
              }
            }
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
