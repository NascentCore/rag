import {
  DeleteOutlined,
  EditOutlined,
  HeartTwoTone,
  SettingOutlined,
  SmileTwoTone,
} from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import { Alert, Button, Card, Flex, Input, Popover, Space, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import MessageInput from '@/components/MessageInput';
import { useModel } from '@umijs/max';
import styles from './index.less';
import classNames from 'classnames';
import { api_list_knowledge_base } from '@/services';

const Admin: React.FC = () => {
  const intl = useIntl();

  const {
    knowledgeList,
    setKnowledgeList,
    knowledgeListSelect,
    setKnowledgeListSelect,
    setKnowledgeActiveId,
  } = useModel('chat');

  return (
    <div className={styles.knowledgeList}>
      <Space.Compact style={{ width: '100%', marginBottom: 30 }}>
        <Input
          className={styles.addInput}
          placeholder="请输入知识库名称"
          style={{ height: 42, backgroundColor: 'transparent', color: '#fff' }}
        />
        <Button type="primary" style={{ height: 42 }}>
          新建
        </Button>
      </Space.Compact>
      {knowledgeList
        ?.filter((item: any) => !item.kb_id.includes('_FAQ'))
        ?.map((item: any) => {
          return (
            <Popover
              key={item.kb_id}
              placement="right"
              color={'#333647'}
              overlayInnerStyle={{ padding: 10, backgroundColor: '#333647' }}
              content={
                <>
                  <Flex vertical={true} gap={5}>
                    <Button
                      type="primary"
                      icon={<SettingOutlined />}
                      size={'small'}
                      onClick={() => {
                        setKnowledgeActiveId(item.kb_id);
                      }}
                    >
                      管理
                    </Button>
                    <Button type="primary" icon={<EditOutlined />} size={'small'}>
                      重命名
                    </Button>
                    <Button type="primary" icon={<DeleteOutlined />} size={'small'}>
                      删除
                    </Button>
                  </Flex>
                </>
              }
              title={null}
              trigger="hover"
            >
              <div
                className={classNames(
                  styles.knowledgeListItem,
                  knowledgeListSelect.includes(item.kb_id) && styles.knowledgeListItem_select,
                )}
                onClick={() => {
                  console.log('click knowledgeListItem', item.kb_id);
                  if (knowledgeListSelect.includes(item.kb_id)) {
                    const _selectList = knowledgeListSelect.filter((id: any) => id !== item.kb_id);
                    setKnowledgeListSelect(_selectList);
                  } else {
                    const _selectList = [...knowledgeListSelect];
                    _selectList.push(item.kb_id);
                    setKnowledgeListSelect(_selectList);
                  }
                }}
              >
                {item.kb_name}
              </div>
            </Popover>
          );
        })}
    </div>
  );
};

export default Admin;
