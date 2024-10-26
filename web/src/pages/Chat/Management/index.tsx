import { api_list_files } from '@/services';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { history, useIntl, useModel } from '@umijs/max';
import { Button, Flex, Result, Segmented, Space, Table } from 'antd';
import { Col, Row } from 'antd/es';
import React, { useEffect, useState } from 'react';
import DocTable from './DocTable';
import FaqTable from './FaqTable';

const Index: React.FC = () => {
  const { knowledgeList, knowledgeActiveId, setKnowledgeActiveId } = useModel('chat');
  const currentKnowledge = knowledgeList?.find((x: any) => x.kb_id === knowledgeActiveId);

  const [selectTab, setSelectTab] = useState('1');

  return (
    <>
      <Flex
        align={'flex-end'}
        gap={20}
        style={{ marginBottom: 10, overflow: 'hidden' }}
        wrap={'wrap'}
      >
        <Button
          type={'primary'}
          icon={<ArrowLeftOutlined />}
          onClick={() => {
            setKnowledgeActiveId(void 0);
          }}
        >
          返回对话
        </Button>
        <div style={{ fontSize: 20 }}>知识库名称: {currentKnowledge?.kb_name}</div>
        <div style={{ whiteSpace: 'normal' }}>知识库id: {currentKnowledge?.kb_id}</div>
      </Flex>
      {selectTab === '1' && (
        <DocTable
          knowledgeActiveId={knowledgeActiveId}
          selectTab={selectTab}
          setSelectTab={setSelectTab}
        />
      )}
      {selectTab === '2' && (
        <FaqTable
          knowledgeActiveId={knowledgeActiveId}
          selectTab={selectTab}
          setSelectTab={setSelectTab}
        />
      )}
    </>
  );
};

export default Index;
