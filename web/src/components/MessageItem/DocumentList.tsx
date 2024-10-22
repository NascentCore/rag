import { useState } from 'react';
import { Avatar, Button, Col, Collapse, Flex, Image, Modal, Row, Space, Typography } from 'antd';
import { api_get_file_base64 } from '@/services';
import PdfView from './PdfView';

interface IProps {
  messageItem: any;
}
const DocumentView: React.FC<IProps> = ({ messageItem }) => {
  const [modalDataItem, setModalDataItem] = useState<any>(void 0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [fileBase64, setFileBase64] = useState<any>();

  const docLinkClick = async (item: any) => {
    api_get_file_base64({
      file_id: item.file_id,
      user_id: 'zzp',
    }).then((res: any) => {
      console.log('api_get_file_base64', res);
      if (res.code === 200) {
        setFileBase64(res.file_base64);
      }
    });
  };

  return (
    <>
      {messageItem?.source_documents.map((item: any) => (
        <>
          <Row gutter={4} style={{ marginBottom: 4 }}>
            <Col>数据来源：</Col>
            <Col>
              <Typography.Link
                onClick={() => {
                  setModalDataItem(item);
                  console.log(item);
                  setIsModalOpen(true);
                  docLinkClick(item);
                }}
              >
                {item.file_name}
              </Typography.Link>
            </Col>
          </Row>
        </>
      ))}
      <Modal
        title={modalDataItem?.file_name}
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          setFileBase64('');
        }}
        footer={null}
        width={800}
      >
        {isModalOpen && (
          <div style={{ maxHeight: '65vh', overflow: 'scroll' }}>
            <PdfView fileBase64={fileBase64}></PdfView>
          </div>
        )}
      </Modal>
    </>
  );
};

export default DocumentView;
