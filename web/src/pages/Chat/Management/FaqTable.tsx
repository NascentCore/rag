import { api_delete_files, api_list_files, use_api_list_files } from '@/services';
import {
  ArrowLeftOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  HourglassOutlined,
} from '@ant-design/icons';
import { history, useIntl, useModel } from '@umijs/max';
import { Button, Flex, Popconfirm, Result, Segmented, Space, Table } from 'antd';
import { Col, Row } from 'antd/es';
import React, { useEffect, useState } from 'react';
import UploadFaqs from './UploadFaqs';
import { formatTimestamp } from '@/utils';
import { detectDeviceType } from '@/utils';

const deviceType = detectDeviceType();

const Index = ({ knowledgeActiveId, selectTab, setSelectTab }: any) => {
  const kb_id = knowledgeActiveId + '_FAQ';
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const handleTableChange = (pagination: any) => {
    setCurrent(pagination.current);
    setPageSize(pagination.pageSize);
  };
  const {
    data: tableDataSourse,
    isLoading,
    mutate: mutateTableDataSourse,
  } = use_api_list_files({
    user_id: 'zzp',
    kb_id,
    page_id: current,
    page_limit: pageSize,
  });
  return (
    <>
      <Flex gap={10} style={{ marginBottom: 10 }}>
        <Segmented<string>
          value={selectTab}
          onChange={setSelectTab}
          options={[
            { value: '1', label: '文档集' },
            { value: '2', label: '问答集' },
          ]}
        />
        <UploadFaqs kb_id={kb_id} mutateTableDataSourse={mutateTableDataSourse} />
      </Flex>
      <Table
        scroll={{ x: '760px', y: deviceType === 'pc' ? 'calc(100vh - 320px)' : 'auto' }}
        columns={[
          {
            title: 'ID',
            dataIndex: 'file_id',
            key: 'file_id',
            align: 'center',
            width: 120,
            render: (_) => {
              return <div style={{ whiteSpace: 'normal' }}> {_}</div>;
            },
          },
          {
            title: '问题',
            dataIndex: 'answer',
            key: 'answer',
            align: 'center',
            width: 200,
            render: (_) => {
              return <div style={{ whiteSpace: 'normal' }}> {_}</div>;
            },
          },
          {
            title: '学习状态',
            dataIndex: 'status',
            key: 'status',
            align: 'center',
            width: 200,
            render: (_) => {
              if (_ === 'gray') {
                return (
                  <span>
                    <HourglassOutlined style={{ color: 'blue' }} /> 排队中
                  </span>
                );
              } else if (_ === 'yellow') {
                return (
                  <span>
                    <HourglassOutlined style={{ color: 'blue' }} /> 学习中
                  </span>
                );
              } else if (_ === 'green') {
                return (
                  <span>
                    <CheckCircleOutlined style={{ color: 'green' }} /> 学习成功
                  </span>
                );
              } else if (_ === 'red') {
                return (
                  <span>
                    <CloseCircleOutlined style={{ color: 'red' }} /> 学习失败
                  </span>
                );
              } else {
                return _;
              }
            },
          },
          {
            title: '字符数',
            dataIndex: 'content_length',
            key: 'content_length',
            align: 'center',
            width: 120,
            render: (_) => {
              return `${_} 字符`;
            },
          },
          {
            title: '创建时间',
            dataIndex: 'timestamp',
            key: 'timestamp',
            align: 'center',
            width: 120,
            render: (_) => formatTimestamp(_),
          },
          {
            title: '操作',
            key: 'action',
            align: 'center',
            width: 150,
            fixed: deviceType === 'pc' && 'right',
            render: (text, record) => (
              <>
                <Space>
                  <UploadFaqs
                    kb_id={kb_id}
                    editParams={record}
                    mutateTableDataSourse={mutateTableDataSourse}
                  />
                  <Popconfirm
                    title="确认操作"
                    onConfirm={async () => {
                      const params = {
                        user_id: 'zzp',
                        kb_id: kb_id,
                        file_ids: [record.file_id],
                      };
                      await api_delete_files(params);
                      setCurrent(1);
                      mutateTableDataSourse();
                    }}
                    okText="确认"
                    cancelText="取消"
                  >
                    <Button danger type={'link'}>
                      删除
                    </Button>
                  </Popconfirm>
                </Space>
              </>
            ),
          },
        ]}
        dataSource={tableDataSourse?.details || []}
        pagination={{
          current,
          pageSize,
          total: tableDataSourse?.total,
          showTotal: (total) => `共 ${total} 条`,
        }}
        loading={isLoading}
        onChange={handleTableChange}
      ></Table>
    </>
  );
};

export default Index;
