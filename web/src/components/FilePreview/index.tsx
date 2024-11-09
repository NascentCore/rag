import { api_get_file_base64 } from '@/services';
import { base64ToBlobUrl, FileMimeTypeMap, getFileExtension } from '@/utils';
import { useState, useEffect } from 'react';
import DocxPreviewer from './DocxPreviewer';
import ExcelPreviewer from './ExcelPreviewer';
import PdfPreviewer from './PdfPreviewer';
import PptxPrviewer from './PptxPrviewer';
import TxtPrviewer from './TxtPrviewer';
import ImagePreview from './ImagePreview';
import { Spin } from 'antd';

interface IProps {
  file_id: string;
  file_name: string;
}
const Index: React.FC<IProps> = ({ file_id, file_name }) => {
  console.log('FilePreview render', file_id);
  const [fileObject, setFileObject] = useState<any>();
  useEffect(() => {
    if (file_id) {
      api_get_file_base64({ file_id, user_id: 'zzp' }).then((res) => {
        console.log('api_get_file_base64', res);
        if (res.code !== 200) {
          console.log('api_get_file_base64 error');
          return;
        }
        const base64Data = res.file_base64;
        const fileExtension = getFileExtension(file_name);
        const mimeType = FileMimeTypeMap[fileExtension];
        const blobUrl = base64ToBlobUrl(base64Data, mimeType);
        setFileObject({
          base64Data,
          fileExtension,
          mimeType,
          blobUrl,
        });
      });
    }
    return () => {
      if (fileObject?.blobUrl) {
        URL.revokeObjectURL(fileObject.blobUrl);
        setFileObject(void 0);
      }
    };
  }, [file_id, file_name]);

  const renderPreviewer = () => {
    switch (fileObject.fileExtension) {
      case 'docx':
        return <DocxPreviewer blobUrl={fileObject.blobUrl} />;
      case 'pdf':
        return <PdfPreviewer blobUrl={fileObject.blobUrl} />;
      case 'xlsx':
        return <ExcelPreviewer blobUrl={fileObject.blobUrl} />;
      case 'pptx':
        return <PptxPrviewer blobUrl={fileObject.blobUrl} />;
      case 'txt':
        return <TxtPrviewer blobUrl={fileObject.blobUrl} />;
      case 'jpg':
        return <ImagePreview blobUrl={fileObject.blobUrl} />;
      case 'jpeg':
        return <ImagePreview blobUrl={fileObject.blobUrl} />;
      case 'png':
        return <ImagePreview blobUrl={fileObject.blobUrl} />;
      default:
        return <div>Unsupported file type</div>;
    }
  };
  return (
    <>
      {fileObject?.blobUrl ? (
        renderPreviewer()
      ) : (
        <div
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
            height: '100%',
          }}
        >
          <Spin size="large" />
        </div>
      )}
    </>
  );
};
export default Index;
