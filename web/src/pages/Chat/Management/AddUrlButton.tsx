import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { useIntl } from '@ant-design/pro-components';
import { Button, Flex, Input, Modal, message } from 'antd';
import React, { useState } from 'react';
import { api_upload_weblink } from '@/services';

const ADD_URL_LABEL = '添加网址';
const USER_ID = 'zzp';

const Index: React.FC<{ kb_id: string; mutateTableDataSourse: () => void }> = ({
  kb_id,
  mutateTableDataSourse,
}) => {
  const intl = useIntl();
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [urlList, setUrlList] = useState<string[]>([]);
  const [addUrlValue, setAddUrlValue] = useState('');

  const showModal = () => {
    setOpen(true);
  };

  const handleUrlChange = (index: number, value: string) => {
    setUrlList((prev) => {
      const updatedList = [...prev];
      updatedList[index] = value;
      return updatedList;
    });
  };

  const handleDeleteUrl = (index: number) => {
    setUrlList((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddUrl = () => {
    if (addUrlValue && !urlList.includes(addUrlValue)) {
      setUrlList((prev) => [...prev, addUrlValue]);
      setAddUrlValue('');
    }
  };

  const onHandle = async () => {
    setConfirmLoading(true);
    try {
      for (const url of urlList) {
        await api_upload_weblink({ chunk_size: 800, kb_id, mode: 'strong', url, user_id: USER_ID });
      }
      message.success('网址添加成功');
      mutateTableDataSourse();
    } catch (error) {
      message.error('添加网址失败');
    } finally {
      setConfirmLoading(false);
      handleCancel();
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Button type="default" style={{ marginLeft: 10 }} onClick={showModal}>
        {ADD_URL_LABEL}
      </Button>
      <Modal
        title={ADD_URL_LABEL}
        open={open}
        onOk={onHandle}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        cancelButtonProps={{ style: { display: 'none' } }}
      >
        <Flex vertical gap={10} style={{ padding: '20px 0' }}>
          <Input
            size="small"
            value={addUrlValue}
            onChange={(e) => setAddUrlValue(e.target.value)}
            suffix={<Button onClick={handleAddUrl} type="text" icon={<PlusOutlined />} />}
          />
          {urlList.map((url, index) => (
            <Input
              key={url}
              size="small"
              value={url}
              onChange={(e) => handleUrlChange(index, e.target.value)}
              suffix={
                <Button
                  type="text"
                  icon={<DeleteOutlined />}
                  onClick={() => handleDeleteUrl(index)}
                />
              }
            />
          ))}
        </Flex>
      </Modal>
    </>
  );
};

export default Index;
