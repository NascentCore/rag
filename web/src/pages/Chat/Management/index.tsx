import { ArrowLeftOutlined } from '@ant-design/icons';
import { useModel } from '@umijs/max';
import { Button, Flex } from 'antd';
import React, { useState } from 'react';
import DocTable from './DocTable';
import FaqTable from './FaqTable';

const TAB_DOCS = '1';
const TAB_FAQ = '2';

const Index: React.FC = () => {
  const { knowledgeList, knowledgeActiveId, setKnowledgeActiveId } = useModel('chat');
  const currentKnowledge = knowledgeList?.find((x) => x.kb_id === knowledgeActiveId);

  const [selectTab, setSelectTab] = useState(TAB_DOCS);

  const renderTabContent = () => {
    switch (selectTab) {
      case TAB_DOCS:
        return (
          <DocTable
            knowledgeActiveId={knowledgeActiveId}
            selectTab={selectTab}
            setSelectTab={setSelectTab}
          />
        );
      case TAB_FAQ:
        return (
          <FaqTable
            knowledgeActiveId={knowledgeActiveId}
            selectTab={selectTab}
            setSelectTab={setSelectTab}
          />
        );
      default:
        return null;
    }
  };

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
          onClick={() => setKnowledgeActiveId(undefined)}
        >
          返回对话
        </Button>
        <div style={{ fontSize: 20 }}>知识库名称: {currentKnowledge?.kb_name}</div>
        <div style={{ whiteSpace: 'normal' }}>知识库id: {currentKnowledge?.kb_id}</div>
      </Flex>
      {renderTabContent()}
    </>
  );
};

export default Index;
