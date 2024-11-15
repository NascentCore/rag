import { getCommonSettingConfigured } from '@/utils/commonSettingConfigured';
import { SubmitKey } from '@/utils/interface';
import { DeleteOutlined, ExclamationCircleFilled, SendOutlined } from '@ant-design/icons';
import { useModel } from '@umijs/max';
import { Button, Input, message, Modal } from 'antd';
import React, { useState } from 'react';
import SettingButton from './../SettingButton';
import styles from './index.less';
const { confirm } = Modal;

const shouldSubmit = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
  const submitKey = getCommonSettingConfigured()?.submitKey;
  // Fix Chinese input method "Enter" on Safari
  if (e.keyCode == 229) return false;
  if (e.key !== 'Enter') return false;
  if (e.key === 'Enter' && e.nativeEvent.isComposing) return false;
  return (
    (submitKey === SubmitKey.AltEnter && e.altKey) ||
    (submitKey === SubmitKey.CtrlEnter && e.ctrlKey) ||
    (submitKey === SubmitKey.ShiftEnter && e.shiftKey) ||
    (submitKey === SubmitKey.MetaEnter && e.metaKey) ||
    (submitKey === SubmitKey.Enter && !e.altKey && !e.ctrlKey && !e.shiftKey && !e.metaKey)
  );
};
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
          onKeyDown={(event) => {
            if (shouldSubmit(event)) {
              sendMsg();
              event.preventDefault();
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
