import { api_list_files } from '@/services';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { history, useIntl, useModel } from '@umijs/max';
import { Button, Result, Segmented, Space, Table } from 'antd';
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
      <Row align={'middle'} gutter={20}>
        <Col style={{ marginBottom: 10 }}>
          <Button
            type={'primary'}
            icon={<ArrowLeftOutlined />}
            onClick={() => {
              setKnowledgeActiveId(void 0);
            }}
          >
            返回对话
          </Button>
        </Col>
        <Col style={{ marginBottom: 10 }}>
          <div style={{ fontSize: 20 }}>知识库名称: {currentKnowledge?.kb_name}</div>
        </Col>
        <Col style={{ marginBottom: 10 }}>知识库id: {currentKnowledge?.kb_id}</Col>
      </Row>
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
