import { Button, Flex, Input, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import { api_delete_files, api_upload_faqs } from '@/services';
const Index: React.FC<{ kb_id: string; editParams?: any; mutateTableDataSourse: any }> = ({
  kb_id,
  editParams,
  mutateTableDataSourse,
}) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  useEffect(() => {
    if (editParams) {
      setAnswer(editParams.answer);
      setQuestion(editParams.question);
    }
  }, [editParams]);
  const showModal = () => {
    setOpen(true);
  };

  const onHandle = async () => {
    if (!question || !answer || question.trim() === '' || answer.trim() === '') {
      return;
    }
    setConfirmLoading(true);
    if (editParams) {
      const params = {
        user_id: 'zzp',
        kb_id: kb_id,
        file_ids: [editParams.file_id],
      };
      await api_delete_files(params);
    }
    const params = {
      user_id: 'zzp',
      kb_id: kb_id,
      faqs: [{ question, answer, nos_key: null }],
      chunk_size: '800',
    };
    await api_upload_faqs(params);
    mutateTableDataSourse();
    setConfirmLoading(false);
    handleCancel();
  };
  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };

  return (
    <>
      {editParams ? (
        <Button type={'link'} onClick={showModal}>
          编辑
        </Button>
      ) : (
        <Button type="primary" style={{ marginLeft: 'auto' }} onClick={showModal}>
          录入问答
        </Button>
      )}

      <Modal
        title="录入问答"
        open={open}
        onOk={onHandle}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        cancelButtonProps={{ style: { display: 'none' } }}
      >
        <Flex vertical={true} gap={10} style={{ padding: '20px 0' }}>
          <Input
            value={question}
            onChange={(v) => {
              setQuestion(v.target.value);
            }}
            maxLength={100}
            count={{
              show: true,
            }}
            placeholder="请输入问题，100字以内"
          />
          <Input.TextArea
            autoSize={{ minRows: 4, maxRows: 4 }}
            value={answer}
            onChange={(v) => {
              setAnswer(v.target.value);
            }}
            maxLength={1000}
            count={{
              show: true,
            }}
            placeholder="请输入答案，1000字以内"
          />
        </Flex>
      </Modal>
    </>
  );
};

export default Index;
