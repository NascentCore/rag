import { api_list_files } from '@/services';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { history, useIntl, useModel } from '@umijs/max';
import { Button, Result, Segmented, Space, Table } from 'antd';
import { Col, Row } from 'antd/es';
import React, { useEffect, useState } from 'react';

const Index: React.FC = () => {
  const { knowledgeList, knowledgeActiveId, setKnowledgeActiveId } = useModel('chat');
  const currentKnowledge = knowledgeList?.find((x: any) => x.kb_id === knowledgeActiveId);

  const [dataSource, setDataSource] = useState([]);
  useEffect(() => {
    api_list_files({
      user_id: 'zzp',
      kb_id: knowledgeActiveId,
      page_id: 1,
      page_limit: 10,
    }).then((res) => {
      console.log('api_list_files', res.data);
      setDataSource(res?.data?.details || []);
    });
  }, [knowledgeActiveId]);
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
      <Row>
        <Col>
          <Segmented<string> options={['文档集', '问答集']} />
        </Col>
      </Row>
      <div style={{ marginTop: 20 }}>
        <Table
          columns={[
            {
              title: '文档ID',
              dataIndex: 'file_id',
              key: 'file_id',
              align: 'center',
              width: 120,
            },
            {
              title: '文档名称',
              dataIndex: 'file_name',
              key: 'file_name',
              align: 'center',
              width: 200,
            },
            {
              title: '文档状态',
              dataIndex: 'status',
              key: 'status',
              align: 'center',
              width: 200,
            },
            {
              title: '文件大小',
              dataIndex: 'bytes',
              key: 'bytes',
              align: 'center',
              width: 120,
            },
            {
              title: '解析后字符数',
              dataIndex: 'content_length',
              key: 'content_length',
              align: 'center',
              width: 120,
            },
            {
              title: '创建日期',
              dataIndex: 'timestamp',
              key: 'timestamp',
              align: 'center',
              width: 120,
              render: (text) => new Date(text).toLocaleString(), // 格式化日期
            },
            {
              title: '备注',
              dataIndex: 'msg',
              key: 'msg',
              align: 'center',
              width: 120,
            },
            {
              title: '操作',
              key: 'action',
              align: 'center',
              width: 120,
              render: (text, record) => (
                <>
                  <Space>
                    <Button danger type={'link'}>
                      删除
                    </Button>
                    <Button type={'link'}>预览</Button>
                  </Space>
                </>
              ),
            },
          ]}
          dataSource={dataSource}
        ></Table>
      </div>
    </>
  );
};

export default Index;
