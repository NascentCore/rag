import MessageItem from '@/components/MessageItem';
import React from 'react';
import styles from './index.less';
import { useModel } from '@umijs/max';
import { IChatItemMsg } from '@/models/chat';
import { Button, Tabs } from 'antd';
import classNames from 'classnames';

const Index: React.FC = () => {
  const { chatStore, addChatWindow, deleteChatWindow, changeChatWindow, activeChat } =
    useModel('chat');
  const tabList: any = [];
  const filterTitle = (title: string) => {
    return title.length > 8 ? title.slice(0, 8) + '...' : title;
  };
  for (const key in chatStore) {
    const chatListItem = chatStore[key];
    tabList.push({
      ...chatListItem,
      key: chatListItem.id,
      label: filterTitle(chatListItem.messages[0]?.content || '新窗口'),
      children: (
        <>
          <div className={classNames(styles.messageContainer, `messageContainer_${key}`)}>
            {chatListItem.messages?.map((x: IChatItemMsg) => (
              <>
                <MessageItem messageItem={x} />
              </>
            ))}
          </div>
        </>
      ),
    });
  }

  return (
    <>
      <Tabs
        tabBarExtraContent={{
          left: (
            <Button type="link" onClick={addChatWindow}>
              新建对话窗口
            </Button>
          ),
        }}
        activeKey={activeChat}
        items={tabList}
        onChange={changeChatWindow}
        type="editable-card"
        onEdit={(targetKey: any, action: 'add' | 'remove') => {
          console.log('targetKey', targetKey);
          if (action === 'remove') {
            deleteChatWindow(targetKey);
          }
        }}
        hideAdd
      />
    </>
  );
};

export default Index;
