import { useState, useEffect } from 'react';
import { Col, Modal, Row, Typography } from 'antd';
import { api_get_file_base64 } from '@/services';
import { DownCircleOutlined, UpCircleOutlined } from '@ant-design/icons';
import { MarkdownContent } from './../../../MarkdownContent';
import FilePreview from '@/components/FilePreview';
const isMobile = window.screen.width <= 768;

interface IDocumentItem {
  file_id: string;
  file_name: string;
}

interface IProps {
  messageItem: {
    source_documents?: IDocumentItem[];
  };
}

const SourceDocumentsItem: React.FC = ({ item, docLinkClick }: any) => {
  const [isFold, setIsFold] = useState(false);
  return (
    <div>
      <Row gutter={4} style={{ marginBottom: 4 }}>
        <Col>数据来源：</Col>
        <Col>
          <Typography.Link onClick={docLinkClick}>{item.file_name}</Typography.Link>
        </Col>
        <Col style={{ paddingLeft: 8, color: '#5a47e5' }}>
          {isFold ? (
            <DownCircleOutlined onClick={() => setIsFold(!isFold)} />
          ) : (
            <UpCircleOutlined onClick={() => setIsFold(!isFold)} />
          )}
        </Col>
      </Row>
      {isFold && (
        <div>
          <MarkdownContent content={item.content} />
        </div>
      )}
    </div>
  );
};

const SourceDocumentsList: React.FC<IProps> = ({ messageItem }) => {
  const [modalDataItem, setModalDataItem] = useState<IDocumentItem>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {messageItem?.source_documents?.map((item: IDocumentItem) => (
        <SourceDocumentsItem
          item={item}
          docLinkClick={() => {
            console.log('docLinkClick', item);
            setModalDataItem(item);
            setIsModalOpen(true);
          }}
          key={item.file_id}
        />
      ))}
      <Modal
        title={modalDataItem?.file_name}
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
        }}
        footer={null}
        width={isMobile ? '100vw' : '70vw'}
        styles={{
          content: {
            top: -80,
          },
        }}
      >
        <div style={{ height: '78vh', overflow: 'scroll' }}>
          {isModalOpen && (
            <FilePreview file_id={modalDataItem.file_id} file_name={modalDataItem.file_name} />
          )}
        </div>
      </Modal>
    </>
  );
};

export default SourceDocumentsList;
