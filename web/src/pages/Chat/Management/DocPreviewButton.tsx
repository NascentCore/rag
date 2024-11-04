import { Button, Modal } from 'antd';
import { useState } from 'react';

const Index = ({ record }: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <Button type={'link'} onClick={() => setIsModalOpen(true)}>
        预览
      </Button>
      <Modal
        title="切片分析结果"
        open={isModalOpen}
        onOk={() => setIsModalOpen(true)}
        onCancel={() => setIsModalOpen(false)}
        width={'100vw'}
        footer={null}
      ></Modal>
    </>
  );
};

export default Index;
