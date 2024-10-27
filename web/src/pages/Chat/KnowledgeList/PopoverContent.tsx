import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled,
  SettingOutlined,
} from '@ant-design/icons';
import { Button, Flex, Input, message, Modal } from 'antd';
import React, { useState } from 'react';
import { useModel } from '@umijs/max';
import { api_delete_knowledge_base, api_rename_knowledge_base } from '@/services';

const { confirm } = Modal;

interface KnowledgeBaseItem {
  kb_id: string;
  kb_name: string;
}

interface ReNameValue {
  kb_id: string;
  new_kb_name: string;
  user_id: string;
}

const PopoverContent: React.FC<{
  item: KnowledgeBaseItem;
  setDrawerOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ item, setDrawerOpen }) => {
  const { setKnowledgeActiveId, reloadKnowledgeList } = useModel('chat');

  const [isReNameModalOpen, setReNameIsModalOpen] = useState(false);
  const [reNameValue, setReNameValue] = useState<ReNameValue>({
    kb_id: item.kb_id,
    new_kb_name: item.kb_name,
    user_id: 'zzp',
  });

  const handleManagementClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDrawerOpen && setDrawerOpen(false);
    setKnowledgeActiveId(item.kb_id);
  };

  const handleReNameClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setReNameValue({ ...reNameValue, kb_id: item.kb_id, new_kb_name: item.kb_name });
    setReNameIsModalOpen(true);
  };

  const handleReNameOk = async () => {
    setReNameIsModalOpen(false);
    try {
      await api_rename_knowledge_base(reNameValue);
      reloadKnowledgeList();
      message.success('操作成功');
    } catch {
      message.error('重命名失败');
    }
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    confirm({
      title: '确认操作?',
      icon: <ExclamationCircleFilled />,
      onOk: handleDelete,
      onCancel: () => console.log('Cancel'),
    });
  };

  const handleDelete = async () => {
    try {
      await api_delete_knowledge_base({ kb_ids: [item.kb_id], user_id: 'zzp' });
      await api_delete_knowledge_base({ kb_ids: [`${item.kb_id}_FAQ`], user_id: 'zzp' });
      reloadKnowledgeList();
      message.success('操作成功');
    } catch {
      message.error('删除失败');
    }
  };

  return (
    <>
      <Flex vertical={true} gap={5}>
        <Button
          type="primary"
          icon={<SettingOutlined />}
          size={'small'}
          onClick={handleManagementClick}
        >
          管理
        </Button>
        <Button type="primary" icon={<EditOutlined />} size={'small'} onClick={handleReNameClick}>
          重命名
        </Button>
        <Button type="primary" icon={<DeleteOutlined />} size={'small'} onClick={handleDeleteClick}>
          删除
        </Button>
      </Flex>
      <Modal
        title="重命名"
        open={isReNameModalOpen}
        onOk={handleReNameOk}
        onCancel={() => setReNameIsModalOpen(false)}
      >
        <Input
          value={reNameValue.new_kb_name}
          onChange={(e) => setReNameValue({ ...reNameValue, new_kb_name: e.target.value })}
        />
      </Modal>
    </>
  );
};

export default PopoverContent;
