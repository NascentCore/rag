import { Button, message, Modal, Upload, UploadProps } from 'antd';
import React, { useState } from 'react';
import { InboxOutlined } from '@ant-design/icons';
const { Dragger } = Upload;
const Index: React.FC<{ kb_id: string; mutateTableDataSourse: any }> = ({
  kb_id,
  mutateTableDataSourse,
}) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const props: UploadProps = {
    name: 'files',
    multiple: true,
    action: 'http://knowledge.llm.sxwl.ai:30002/api/local_doc_qa/upload_files',
    data: {
      kb_id,
      user_id: 'zzp',
      chunk_size: 800,
      mode: 'soft',
    },
    onChange(info) {
      setConfirmLoading(true);
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
        setConfirmLoading(false);
        mutateTableDataSourse();
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
        setConfirmLoading(false);
        mutateTableDataSourse();
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
    showUploadList: false,
  };
  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };
  return (
    <>
      <Button type="primary" style={{ marginLeft: 10 }} onClick={showModal}>
        上传文档
      </Button>
      <Modal
        title="上传文档"
        open={open}
        onOk={handleCancel}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        cancelButtonProps={{ style: { display: 'none' } }}
      >
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">将文件拖到此处，或点击上传</p>
          <p className="ant-upload-hint">
            支持文件格式md、txt、pdf、jpg、png、jpeg、docx、xlsx、pptx、eml、csv, 单个文档小于30M,
            单张图片小于5M, 文件总大小不得超过125M
          </p>
        </Dragger>
      </Modal>
    </>
  );
};

export default Index;
