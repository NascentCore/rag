import { api_delete_files, use_api_list_files } from '@/services';
import { detectDeviceType, formatFileSize, formatTimestamp } from '@/utils';
import { CheckCircleOutlined, CloseCircleOutlined, HourglassOutlined } from '@ant-design/icons';
import { Button, Flex, Popconfirm, Segmented, Space, Table } from 'antd';
import { useState } from 'react';
import AddUrlButton from './AddUrlButton';
import DocPreviewButton from './DocPreviewButton';
import UploadFileButton from './UploadFileButton';

const deviceType = detectDeviceType();

const Index = ({ knowledgeActiveId, selectTab, setSelectTab }: any) => {
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
    kb_id: knowledgeActiveId,
    page_id: current,
    page_limit: pageSize,
  });

  return (
    <>
      <Flex gap={10} wrap={'wrap'} style={{ marginBottom: 10 }}>
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
        <UploadFileButton kb_id={knowledgeActiveId} mutateTableDataSourse={mutateTableDataSourse} />
        <AddUrlButton kb_id={knowledgeActiveId} mutateTableDataSourse={mutateTableDataSourse} />
      </Flex>
      <Table
        scroll={{ x: '1200px', y: deviceType === 'pc' ? 'calc(100vh - 320px)' : 'auto' }}
        columns={[
          {
            title: '文档ID',
            dataIndex: 'file_id',
            key: 'file_id',
            align: 'center',
            width: 120,
            render: (_) => {
              return <div style={{ whiteSpace: 'normal' }}> {_}</div>;
            },
          },
          {
            title: '文档名称',
            dataIndex: 'file_name',
            key: 'file_name',
            align: 'center',
            width: 200,
            render: (_) => {
              return <div style={{ whiteSpace: 'normal' }}> {_}</div>;
            },
          },
          {
            title: '文档状态',
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
                    <HourglassOutlined style={{ color: 'blue' }} /> 解析中
                  </span>
                );
              } else if (_ === 'green') {
                return (
                  <span>
                    <CheckCircleOutlined style={{ color: 'green' }} /> 解析成功
                  </span>
                );
              } else if (_ === 'red') {
                return (
                  <span>
                    <CloseCircleOutlined style={{ color: 'red' }} /> 解析失败
                  </span>
                );
              } else {
                return _;
              }
            },
          },
          {
            title: '文件大小',
            dataIndex: 'bytes',
            key: 'bytes',
            align: 'center',
            width: 120,
            render: (_) => <>{formatFileSize(_)}</>,
          },
          {
            title: '解析后字符数',
            dataIndex: 'content_length',
            key: 'content_length',
            align: 'center',
            width: 220,
          },
          {
            title: '创建日期',
            dataIndex: 'timestamp',
            key: 'timestamp',
            align: 'center',
            width: 120,
            render: (_) => formatTimestamp(_),
          },
          {
            title: '备注',
            dataIndex: 'msg',
            key: 'msg',
            align: 'center',
            width: 220,
            render: (_) => {
              return <div style={{ whiteSpace: 'normal' }}> {_}</div>;
            },
          },
          {
            title: '操作',
            key: 'action',
            align: 'center',
            width: 150,
            fixed: deviceType === 'pc' && 'right',
            render: (text, record: any) => (
              <>
                <Space>
                  <Popconfirm
                    title="确认操作"
                    onConfirm={async () => {
                      const params = {
                        user_id: 'zzp',
                        kb_id: knowledgeActiveId,
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
                  <DocPreviewButton record={{ ...record, kb_id: knowledgeActiveId }} />
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
