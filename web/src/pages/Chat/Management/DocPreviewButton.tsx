import FilePreview from '@/components/FilePreview';
import { use_api_get_doc_completed } from '@/services';
import { Button, Col, Modal, Row, Table } from 'antd';
import { useEffect, useState } from 'react';

const Index = ({ record }: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
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
  } = use_api_get_doc_completed({
    show: isModalOpen,
    user_id: 'zzp',
    kb_id: record.kb_id,
    file_id: record.file_id,
    page_id: current,
    page_limit: pageSize,
  });
  console.log('tableDataSourse', tableDataSourse);
  return (
    <>
      <Button type={'link'} onClick={() => setIsModalOpen(true)}>
        预览
      </Button>
      <Modal
        title="切片分析结果"
        open={isModalOpen}
        onOk={() => setIsModalOpen(true)}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={'100vw'}
        styles={{
          content: {
            top: -80,
          },
        }}
      >
        <div style={{ height: '78vh', overflow: 'scroll' }}>
          <Row>
            <Col span={9}>
              <div style={{ height: 'calc(78vh - 20px)', overflow: 'scroll' }}>
                <FilePreview file_id={record.file_id} file_name={record.file_name} />
              </div>
            </Col>
            <Col span={15}>
              <Table
                scroll={{ y: 'calc(100vh - 320px)' }}
                columns={[
                  {
                    title: '编号',
                    dataIndex: 'chunk_id',
                    key: 'chunk_id',
                    align: 'center',
                    width: 120,
                  },
                  {
                    title: 'markdown预览',
                    dataIndex: 'page_content',
                    key: 'page_content',
                    align: 'center',
                    width: 200,
                  },
                  {
                    title: '分析结果',
                    dataIndex: 'page_content',
                    key: 'page_content',
                    align: 'center',
                    width: 200,
                  },

                  {
                    title: '操作',
                    key: 'action',
                    align: 'center',
                    width: 150,
                    render: (text, record) => (
                      <>
                        <Button type={'link'}>编辑</Button>
                      </>
                    ),
                  },
                ]}
                dataSource={tableDataSourse?.chunks || []}
                pagination={{
                  current,
                  pageSize,
                  total: tableDataSourse?.total_count,
                  showTotal: (total) => `共 ${total} 条`,
                }}
                loading={isLoading}
                onChange={handleTableChange}
              ></Table>
            </Col>
          </Row>
        </div>
      </Modal>
    </>
  );
};

export default Index;
