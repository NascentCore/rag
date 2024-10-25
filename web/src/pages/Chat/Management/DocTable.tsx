import { api_list_files } from '@/services';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { history, useIntl, useModel } from '@umijs/max';
import { Button, Flex, Result, Segmented, Space, Table } from 'antd';
import { Col, Row } from 'antd/es';
import React, { useEffect, useState } from 'react';

const Index = ({ knowledgeActiveId, selectTab, setSelectTab }) => {
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
      <Row style={{ marginBottom: 10 }}>
        <Segmented<string>
          value={selectTab}
          onChange={setSelectTab}
          options={[
            { value: '1', label: '文档集' },
            { value: '2', label: '问答集' },
          ]}
        />
        <Button type="default" danger style={{ marginLeft: 'auto' }}>
          取消所有文件上传
        </Button>
        <Button type="primary" style={{ marginLeft: 10 }}>
          上传文档
        </Button>
        <Button type="default" style={{ marginLeft: 10 }}>
          添加网址
        </Button>
      </Row>
      <Table
        scroll={{ x: 'auto', y: 'calc(100vh - 350px)' }}
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
    </>
  );
};

export default Index;
