import { cahtActionH5, generateUUID, scrollH5ChatBodyToBottom } from '@/utils';
import { useEffect, useState } from 'react';

const activeKnowledgeList = ['KBed4e7f730e6048aca545a4b83dcbf8f9_240625'];
export const chat_store_key = 'Chat_Store_H5';

export interface IChatItemMsg {
  content: string;
  role: 'user' | 'assistant';
  id: string;
  date: string;
  source_documents?: any[];
  raw?: any;
}

export interface IChatItem {
  id: string;
  state: 'success' | 'loading';
  messages: IChatItemMsg[];
}

export interface IChatStore {
  [key: string]: IChatItem;
}

export interface IKnowledgeListItem {
  kb_id: string;
  kb_name: string;
}

const testChatStore: IChatStore = {
  demo: {
    id: 'demo',
    state: 'success',
    messages: [],
  },
};

export default () => {
  // 管理 chat 数据
  const [chatStore, setChatStore] = useState<IChatStore>(testChatStore);
  const [activeChat, setActiveChat] = useState('demo');
  console.log('chatStore', chatStore);
  useEffect(() => {
    const _chatStore = localStorage.getItem(chat_store_key);
    if (_chatStore) {
      const _chatStoreJson = JSON.parse(_chatStore);
      setChatStore(_chatStoreJson);
      setActiveChat(Object.keys(_chatStoreJson)[0]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(chat_store_key, JSON.stringify(chatStore));
  }, [chatStore]);

  // 新增聊天数据
  const addChatMsg = (id: string, msg: IChatItemMsg) => {
    setChatStore((chatStore: any) => {
      const _chatStore = JSON.parse(JSON.stringify(chatStore));
      _chatStore[id].messages.push(msg);
      setTimeout(() => {
        scrollH5ChatBodyToBottom(id, true);
      }, 100);
      return _chatStore;
    });
  };

  /**
   * 更新聊天数据
   * @param id chatid
   * @param chatMsgItem
   */
  const updateChatMsg = (id: string, chatMsgItem: IChatItemMsg) => {
    setChatStore((chatStore: any) => {
      const _chatStore = JSON.parse(JSON.stringify(chatStore));
      const chatItem = _chatStore[id];
      const index = chatItem.messages.findIndex((x: any) => x.id === chatMsgItem.id);
      chatItem.messages[index] = chatMsgItem;
      return _chatStore;
    });
    setTimeout(() => {
      scrollH5ChatBodyToBottom(id, true);
    }, 100);
  };

  /**
   * 设置聊天状态
   * @param id
   * @param state
   */
  const setChatItemState = (id: string, state: string) => {
    setChatStore((chatStore: any) => {
      const _chatStore = JSON.parse(JSON.stringify(chatStore));
      _chatStore[id].state = state;
      return _chatStore;
    });
  };

  /**
   * 清空聊天
   */
  const deleteChatStore = (id: string) => {
    setChatStore((chatStore: any) => {
      const _chatStore = JSON.parse(JSON.stringify(chatStore));
      _chatStore[id].messages = [];
      return _chatStore;
    });
  };

  const questionAction = ({ chatid, userMsgValue }: { chatid: string; userMsgValue: string }) => {
    const chatMsgItemUser: IChatItemMsg = {
      content: userMsgValue,
      role: 'user',
      date: '',
      id: generateUUID(),
    };
    addChatMsg(chatid, chatMsgItemUser);
    setChatItemState(chatid, 'loading');
    const msgId = generateUUID();
    const chatMsgItem: IChatItemMsg = {
      content: '正在搜索...',
      role: 'assistant',
      id: msgId,
      date: '',
    };
    addChatMsg(chatid, chatMsgItem);
    cahtActionH5({
      id: msgId,
      knowledgeListSelect: activeKnowledgeList,
      question: userMsgValue,
      onMessage: (chatMsgItem: IChatItemMsg) => {
        updateChatMsg(chatid, chatMsgItem);
      },
      onSuccess: (chatMsgItem: IChatItemMsg) => {
        updateChatMsg(chatid, chatMsgItem);
        setChatItemState(chatid, 'success');
      },
    });
  };

  const reQuestionAction = (chatMsgItem: IChatItemMsg) => {
    console.log('reQuestionAction', chatMsgItem);
    for (const key in chatStore) {
      for (let index = 0; index < chatStore[key].messages.length; index++) {
        const _chatMsgItem = chatStore[key].messages[index];
        if (_chatMsgItem.id === chatMsgItem.id) {
          questionAction({ chatid: key, userMsgValue: chatStore[key].messages[index - 1].content });
          return;
        }
      }
    }
  };

  return {
    chatStore,
    addChatMsg,
    updateChatMsg,
    deleteChatStore,
    setChatItemState,
    questionAction,
    reQuestionAction,
    activeChat,
  };
};
