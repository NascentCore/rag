import { api_list_files } from '@/services';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { history, useIntl, useModel } from '@umijs/max';
import { Button, Flex, Result, Segmented, Space, Table } from 'antd';
import { Col, Row } from 'antd/es';
import React, { useEffect, useState } from 'react';

const Index = ({ knowledgeActiveId, selectTab, setSelectTab }: any) => {
  const [dataSource, setDataSource] = useState([]);
  useEffect(() => {
    api_list_files({
      user_id: 'zzp',
      kb_id: knowledgeActiveId + '_FAQ',
      page_id: 1,
      page_limit: 10,
    }).then((res) => {
      console.log('api_list_files', res.data);
      setDataSource(res?.data?.details || []);
    });
  }, [knowledgeActiveId]);
  return (
    <>
      <Row style={{ marginBottom: 10 }}>
        <Segmented<string>
          value={selectTab}
          onChange={setSelectTab}
          options={[
            { value: '1', label: '文档集' },
            { value: '2', label: '问答集' },
          ]}
        />
        <Button type="primary" style={{ marginLeft: 'auto' }}>
          录入问答
        </Button>
      </Row>
      <Table
        scroll={{ x: 'auto', y: 'calc(100vh - 350px)' }}
        columns={[
          // {
          //   title: 'ID',
          //   dataIndex: 'file_id',
          //   key: 'file_id',
          //   align: 'center',
          //   width: 120,
          // },
          {
            title: '问题',
            dataIndex: 'answer',
            key: 'answer',
            align: 'center',
            width: 200,
          },
          {
            title: '学习状态',
            dataIndex: 'status',
            key: 'status',
            align: 'center',
            width: 200,
          },
          {
            title: '字符数',
            dataIndex: 'chunks_number',
            key: 'chunks_number',
            align: 'center',
            width: 120,
          },
          {
            title: '创建时间',
            dataIndex: 'timestamp',
            key: 'timestamp',
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
                  <Button type={'link'}>编辑</Button>
                  <Button danger type={'link'}>
                    删除
                  </Button>
                </Space>
              </>
            ),
          },
        ]}
        dataSource={dataSource}
      ></Table>
    </>
  );
};

export default Index;
