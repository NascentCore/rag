import { api_get_file_base64 } from '@/services';
import { base64ToBlobUrl, FileMimeTypeMap, getFileExtension } from '@/utils';
import { Button } from 'antd';
import React, { useState } from 'react';

const DownloadButton = ({ fileId, fileName }: any) => {
  const [loading, setLoading] = useState(false);
  const handleDownload = async () => {
    setLoading(true);
    try {
      const res = await api_get_file_base64({ file_id: fileId, user_id: 'zzp' });
      console.log('api_get_file_base64', res);
      if (res.code !== 200) {
        console.log('api_get_file_base64 error');
        return;
      }
      const base64Data = res.file_base64;
      const fileExtension = getFileExtension(fileName);
      const mimeType = FileMimeTypeMap[fileExtension];
      const blobUrl = base64ToBlobUrl(base64Data, mimeType);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = fileName;
      link.click();
    } catch (error) {
      console.error('下载文件时发生错误:', error);
    }
    setLoading(false);
  };

  return (
    <Button
      loading={loading}
      onClick={handleDownload}
      style={{ marginLeft: 'auto', marginRight: 30 }}
    >
      下载
    </Button>
  );
};

export default DownloadButton;
