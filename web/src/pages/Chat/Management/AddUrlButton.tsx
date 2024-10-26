import { DeleteOutlined, HeartTwoTone, PlusOutlined, SmileTwoTone } from '@ant-design/icons';
import { PageContainer, useIntl } from '@ant-design/pro-components';
import { Button, Flex, Input, message, Modal, Space, Upload, UploadProps } from 'antd';
import React, { useState } from 'react';
import { InboxOutlined, FileAddOutlined } from '@ant-design/icons';
import { api_upload_weblink } from '@/services';
const { Dragger } = Upload;
const Index: React.FC<{ kb_id: string; mutateTableDataSourse: any }> = ({
  kb_id,
  mutateTableDataSourse,
}) => {
  const intl = useIntl();
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const [urlList, setUrlList] = useState<string[]>([]);
  const showModal = () => {
    setOpen(true);
  };

  const onHandle = async () => {
    setConfirmLoading(true);
    for (const url of urlList) {
      const params = {
        chunk_size: 800,
        kb_id,
        mode: 'strong',
        url: url,
        user_id: 'zzp',
      };
      await api_upload_weblink(params);
    }
    setConfirmLoading(false);
    handleCancel();
    mutateTableDataSourse();
  };
  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };

  const [addUrlValue, setAddUrlValue] = useState('');
  return (
    <>
      <Button type="default" style={{ marginLeft: 10 }} onClick={showModal}>
        添加网址
      </Button>
      <Modal
        title="添加网址"
        open={open}
        onOk={onHandle}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        cancelButtonProps={{ style: { display: 'none' } }}
      >
        <Flex vertical={true} gap={10} style={{ padding: '20px 0' }}>
          <Input
            size="small"
            value={addUrlValue}
            onChange={(v) => {
              setAddUrlValue(v.target.value);
            }}
            suffix={
              <>
                <Button
                  onClick={() => {
                    if (addUrlValue && !urlList.includes(addUrlValue)) {
                      setUrlList([...urlList, addUrlValue]);
                      setAddUrlValue('');
                    }
                  }}
                  type="text"
                  icon={<PlusOutlined />}
                ></Button>
              </>
            }
          />
          {urlList?.map((url, index) => (
            <Input
              key={url}
              size="small"
              value={url}
              onChange={(e) => {
                const _urlList = [...urlList];
                _urlList[index] = e.target.value;
                setUrlList(_urlList);
              }}
              suffix={
                <>
                  <Button
                    type="text"
                    icon={<DeleteOutlined />}
                    onClick={() => {
                      const _urlList = [...urlList];
                      _urlList.splice(index, 1);
                      setUrlList(_urlList);
                    }}
                  ></Button>
                </>
              }
            />
          ))}
        </Flex>
      </Modal>
    </>
  );
};

export default Index;
