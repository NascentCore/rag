import { IChatItemMsg } from '@/models/chat';
import { getActiveChatSettingConfigured } from './chatSettingConfigured';

export function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function scrollChatBodyToBottom() {
  document.querySelector('.chat-container')?.scrollTo({
    top: 9999999999,
    behavior: 'smooth',
  });
}

export const getChatResponseJsonFromResponseText = (responseText: string) => {
  let json: any = {};
  const lines = responseText.split('\n');
  for (const line of lines) {
    if (line.startsWith('data: ')) {
      try {
        const data = JSON.parse(line.slice(6));
        if (data.msg === 'success stream chat') {
          json = data;
          break;
        }
      } catch (e) {
        console.error('解析JSON时出错:', e);
      }
    }
  }
  const { response, source_documents } = json;
  const msgId = generateUUID();
  const chatMsgItem: IChatItemMsg = {
    content: response,
    source_documents,
    role: 'assistant',
    id: msgId,
    date: '',
    raw: json,
  };
  return chatMsgItem;
};

export const cahtAction = async ({
  id,
  knowledgeListSelect,
  question,
  onMessage,
  onSuccess,
}: {
  id: string; // msgid
  question: string;
  knowledgeListSelect: string[];
  onMessage: (chatMsgItem: IChatItemMsg) => void;
  onSuccess: (chatMsgItem: IChatItemMsg) => void;
}) => {
  const condigParams = getActiveChatSettingConfigured();
  const response = await fetch(
    'http://knowledge.llm.sxwl.ai:30002/api/local_doc_qa/local_doc_chat',
    {
      method: 'POST',
      headers: {
        Accept: 'text/event-stream,application/json, text/event-stream',
        'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8,zh-TW;q=0.7,mt;q=0.6,pl;q=0.5',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: 'zzp',
        kb_ids: knowledgeListSelect,
        history: [],
        question: question,
        product_source: 'saas',
        streaming: true,
        ...condigParams,
      }),
    },
  );

  const reader = (response as any).body.getReader();
  const decoder = new TextDecoder();
  let fullChunk = '';
  let fullResponse = '';
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    const chunk = decoder.decode(value);
    fullChunk += chunk;
    const lines = chunk.split('\n');
    for (const line of lines) {
      if (line.startsWith('data: ')) {
        try {
          const data = JSON.parse(line.slice(6));
          if (data.response) {
            fullResponse += data.response;
            console.log('fullResponse', fullResponse);
            const chatMsgItem: IChatItemMsg = {
              content: fullResponse,
              role: 'assistant',
              id: id,
              date: '',
            };
            onMessage(chatMsgItem);
          }
        } catch (e) {
          console.error('解析JSON时出错:', e);
        }
      }
    }
  }
  const chatMsgItem2: IChatItemMsg = getChatResponseJsonFromResponseText(fullChunk);
  onSuccess({ ...chatMsgItem2, id: id });
};

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) {
    // 对于小于1KB的文件大小，直接返回字节
    return `${bytes} B`;
  } else if (bytes < 1024 * 1024) {
    // 对于小于1MB的文件大小，转换为KB
    const kilobytes = bytes / 1024;
    return `${kilobytes.toFixed(2)} KB`;
  } else if (bytes < 1024 * 1024 * 1024) {
    // 对于小于1GB的文件大小，转换为MB
    const megabytes = bytes / (1024 * 1024);
    return `${megabytes.toFixed(2)} MB`;
  } else {
    // 对于大于等于1GB的文件大小，转换为GB
    const gigabytes = bytes / (1024 * 1024 * 1024);
    return `${gigabytes.toFixed(2)} GB`;
  }
}

export function formatTimestamp(timestamp: string): string {
  if (timestamp.length !== 12) {
    throw new Error('Invalid timestamp length. Expected length is 12.');
  }
  // 提取年、月、日、小时和分钟
  const year = timestamp.substring(0, 4);
  const month = timestamp.substring(4, 6);
  const day = timestamp.substring(6, 8);
  const hour = timestamp.substring(8, 10);
  const minute = timestamp.substring(10, 12);

  // 返回格式化的时间字符串
  return `${year}-${month}-${day} ${hour}:${minute}`;
}

export function detectDeviceType() {
  const isMobile = window.innerWidth <= 768; // 768px通常被认为是移动设备和PC的分界线
  if (isMobile) {
    return 'mobile';
  } else {
    return 'pc';
  }
}
