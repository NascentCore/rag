import { useState, useEffect, useRef } from 'react';
import { Button, Col, Flex, Modal, Row, Typography } from 'antd';
import { api_get_file_base64 } from '@/services';
import { CloseOutlined, DownCircleOutlined, UpCircleOutlined } from '@ant-design/icons';
import FilePreview from '@/components/FilePreview';
import { base64ToBlobUrl, FileMimeTypeMap, filterSourceDocuments, getFileExtension } from '@/utils';
import DownloadFileButton from './DownloadFileButton';
import { MarkdownContent } from '@/components/MarkdownContent';
import styles from './index.less';
import { question } from 'mermaid/dist/rendering-util/rendering-elements/shapes/question';
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

const SourceDocumentsList: React.FC<IProps> = ({ messageItem }) => {
  const [modalDataItem, setModalDataItem] = useState<IDocumentItem>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const previewRef = useRef(null);

  const source_documents: any = filterSourceDocuments(messageItem?.source_documents || []);
  return (
    <>
      <div className={styles.sourceList}>
        {source_documents?.map((item: IDocumentItem, index) => (
          <>
            <div
              key={item.file_id + item?.score}
              className={styles.sourceLink}
              onClick={() => {
                console.log('docLinkClick', item);
                setModalDataItem(item);
                setIsModalOpen(true);
              }}
            >
              {index + 1}
            </div>
          </>
        ))}
      </div>
      <Modal
        title={
          <>
            <Flex>
              <div style={{ color: '#fff' }}>{modalDataItem?.file_name}</div>
              <DownloadFileButton
                fileId={modalDataItem?.file_id}
                fileName={modalDataItem?.file_name}
              />
            </Flex>
          </>
        }
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
        }}
        footer={null}
        width={isMobile ? '100vw' : '100vw'}
        styles={{
          content: {
            top: -80,
            backgroundColor: 'rgb(51, 51, 51)',
            color: '#fff',
          },
          header: {
            color: '#fff',
            backgroundColor: 'rgb(51, 51, 51)',
          },
        }}
        closeIcon={<CloseOutlined style={{ color: '#fff' }} />}
      >
        <div style={{ height: '78vh', overflow: 'scroll' }}>
          {isModalOpen && (
            <FilePreview
              ref={previewRef}
              file_id={modalDataItem.file_id}
              // file_id="8622c4d658e642adac5346adfb465509"
              file_name={modalDataItem.file_name}
            />
          )}
        </div>
      </Modal>
    </>
  );
};

export default SourceDocumentsList;
