import { Button, Input, message, Space } from 'antd';
import React, { useState } from 'react';
import { useModel } from '@umijs/max';
import styles from './index.less';
import { api_new_knowledge_base } from '@/services';
const Index: React.FC = () => {
  const { reloadKnowledgeList } = useModel('chat');
  const [newValue, seNewtValue] = useState('');
  const addKnowledgeHandleClick = () => {
    if (newValue) {
      api_new_knowledge_base({
        kb_name: newValue,
        user_id: 'zzp',
      }).then((res) => {
        console.log('api_new_knowledge_base', res);
        if (res?.code !== 200) {
          return;
        }
        const kb_id = res?.data?.kb_id;
        const kb_name = res?.data?.kb_name;
        api_new_knowledge_base({
          kb_id: kb_id + '_FAQ',
          kb_name: kb_name + '_FAQ',
          user_id: 'zzp',
        }).then((res) => {
          if (res?.code !== 200) {
            return;
          }
          reloadKnowledgeList();
          message.success('操作成功');
        });
      });
    }
  };
  return (
    <>
      <Space.Compact style={{ width: '100%', marginBottom: 30 }}>
        <Input
          value={newValue}
          onChange={(v) => {
            seNewtValue(v.target.value);
          }}
          className={styles.addInput}
          placeholder="请输入知识库名称"
          style={{ height: 42, backgroundColor: 'transparent', color: '#fff' }}
        />
        <Button type="primary" style={{ height: 42 }} onClick={addKnowledgeHandleClick}>
          新建
        </Button>
      </Space.Compact>
    </>
  );
};

export default Index;
