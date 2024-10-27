import { useState, useEffect } from 'react';
import { Col, Modal, Row, Typography } from 'antd';
import { api_get_file_base64 } from '@/services';
import PdfView from './PdfView';

interface IDocumentItem {
  file_id: string;
  file_name: string;
}

interface IProps {
  messageItem: {
    source_documents?: IDocumentItem[];
  };
}

const DocumentView: React.FC<IProps> = ({ messageItem }) => {
  const [modalDataItem, setModalDataItem] = useState<IDocumentItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileBase64, setFileBase64] = useState<string | undefined>(undefined);

  const docLinkClick = (item: IDocumentItem) => {
    setModalDataItem(item);
    setIsModalOpen(true);
  };

  useEffect(() => {
    const fetchFileBase64 = async () => {
      if (modalDataItem) {
        const res = await api_get_file_base64({
          file_id: modalDataItem.file_id,
          user_id: 'zzp',
        });
        console.log('api_get_file_base64', res);
        if (res.code === 200) {
          setFileBase64(res.file_base64);
        }
      }
    };

    if (isModalOpen) {
      fetchFileBase64();
    }
  }, [isModalOpen, modalDataItem]);

  return (
    <>
      {messageItem?.source_documents.map((item) => (
        <Row gutter={4} style={{ marginBottom: 4 }} key={item.file_id}>
          <Col>数据来源：</Col>
          <Col>
            <Typography.Link onClick={() => docLinkClick(item)}>{item.file_name}</Typography.Link>
          </Col>
        </Row>
      ))}
      <Modal
        title={modalDataItem?.file_name}
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          setFileBase64(undefined);
        }}
        footer={null}
        width={800}
      >
        <div style={{ height: '65vh', overflow: 'scroll' }}>
          {fileBase64 && <PdfView fileBase64={fileBase64} />}
        </div>
      </Modal>
    </>
  );
};

export default DocumentView;
