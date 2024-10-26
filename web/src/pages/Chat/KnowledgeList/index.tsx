import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled,
  SettingOutlined,
} from '@ant-design/icons';
import { useIntl } from '@umijs/max';
import { Button, Flex, Input, message, Modal, Popover, Space } from 'antd';
import React, { useState } from 'react';
import { useModel } from '@umijs/max';
import styles from './index.less';
import classNames from 'classnames';
import {
  api_delete_knowledge_base,
  api_new_knowledge_base,
  api_rename_knowledge_base,
} from '@/services';
import { detectDeviceType } from '@/utils';
const { confirm } = Modal;
const deviceType = detectDeviceType();
const Admin: React.FC<{ setDrawerOpen?: any }> = ({ setDrawerOpen }) => {
  const intl = useIntl();
  const [newValue, seNewtValue] = useState('');

  const {
    knowledgeList,
    knowledgeListSelect,
    setKnowledgeListSelect,
    setKnowledgeActiveId,
    reloadKnowledgeList,
  } = useModel('chat');

  const [reNameValue, setReNameValue] = useState<{
    kb_id: string;
    new_kb_name: string;
    user_id: string;
  }>({
    kb_id: '',
    new_kb_name: '',
    user_id: '',
  });
  const [isReNameModalOpen, setReNameIsModalOpen] = useState(false);
  const showReNameModal = () => {
    setReNameIsModalOpen(true);
  };

  const reNameHandleOk = () => {
    setReNameIsModalOpen(false);
    api_rename_knowledge_base(reNameValue).then((res) => {
      reloadKnowledgeList();
      message.success('操作成功');
      reNameHandleCancel();
    });
  };

  const reNameHandleCancel = () => {
    setReNameIsModalOpen(false);
  };

  return (
    <div className={styles.knowledgeList}>
      <Space.Compact style={{ width: '100%', marginBottom: 30 }}>
        <Input
          value={newValue}
          onChange={(v) => {
            seNewtValue(v.target.value);
          }}
          className={styles.addInput}
          placeholder="请输入知识库名称"
          style={{ height: 42, backgroundColor: 'transparent', color: '#fff' }}
        />
        <Button
          type="primary"
          style={{ height: 42 }}
          onClick={() => {
            if (newValue) {
              api_new_knowledge_base({
                kb_name: newValue,
                user_id: 'zzp',
              }).then((res) => {
                console.log('api_new_knowledge_base', res);
                if (res?.code !== 200) {
                  return;
                }
                const kb_id = res?.data?.kb_id;
                const kb_name = res?.data?.kb_name;
                api_new_knowledge_base({
                  kb_id: kb_id + '_FAQ',
                  kb_name: kb_name + '_FAQ',
                  user_id: 'zzp',
                }).then((res) => {
                  if (res?.code !== 200) {
                    return;
                  }
                  reloadKnowledgeList();
                  message.success('操作成功');
                });
              });
            }
          }}
        >
          新建
        </Button>
      </Space.Compact>
      {knowledgeList
        ?.filter((item: any) => !item.kb_id.includes('_FAQ'))
        ?.map((item: any) => {
          return (
            <>
              {deviceType === 'pc' && (
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
                        <Button
                          type="primary"
                          icon={<EditOutlined />}
                          size={'small'}
                          onClick={() => {
                            setReNameValue({
                              kb_id: item.kb_id,
                              new_kb_name: item.kb_name,
                              user_id: 'zzp',
                            });
                            showReNameModal();
                          }}
                        >
                          重命名
                        </Button>
                        <Button
                          type="primary"
                          icon={<DeleteOutlined />}
                          size={'small'}
                          onClick={() => {
                            confirm({
                              title: '确认操作?',
                              icon: <ExclamationCircleFilled />,
                              onOk() {
                                api_delete_knowledge_base({
                                  kb_ids: [item.kb_id],
                                  user_id: 'zzp',
                                }).then((res) => {
                                  if (res.code !== 200) {
                                    return;
                                  }
                                  api_delete_knowledge_base({
                                    kb_ids: [item.kb_id + '_FAQ'],
                                    user_id: 'zzp',
                                  }).then((res) => {
                                    reloadKnowledgeList();
                                    message.success('操作成功');
                                  });
                                });
                              },
                              onCancel() {
                                console.log('Cancel');
                              },
                            });
                          }}
                        >
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
                        const _selectList = knowledgeListSelect.filter(
                          (id: any) => id !== item.kb_id,
                        );
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
              )}

              {deviceType === 'mobile' && (
                <>
                  <div
                    className={classNames(
                      styles.knowledgeListItem,
                      knowledgeListSelect.includes(item.kb_id) && styles.knowledgeListItem_select,
                    )}
                    onClick={(e) => {
                      console.log('click knowledgeListItem', item.kb_id);
                      if (knowledgeListSelect.includes(item.kb_id)) {
                        const _selectList = knowledgeListSelect.filter(
                          (id: any) => id !== item.kb_id,
                        );
                        setKnowledgeListSelect(_selectList);
                      } else {
                        const _selectList = [...knowledgeListSelect];
                        _selectList.push(item.kb_id);
                        setKnowledgeListSelect(_selectList);
                      }
                    }}
                  >
                    {item.kb_name}

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
                              onClick={(e) => {
                                e.stopPropagation();
                                if (setDrawerOpen) {
                                  setDrawerOpen(false);
                                }
                                setKnowledgeActiveId(item.kb_id);
                              }}
                            >
                              管理
                            </Button>
                            <Button
                              type="primary"
                              icon={<EditOutlined />}
                              size={'small'}
                              onClick={(e) => {
                                e.stopPropagation();
                                setReNameValue({
                                  kb_id: item.kb_id,
                                  new_kb_name: item.kb_name,
                                  user_id: 'zzp',
                                });
                                showReNameModal();
                              }}
                            >
                              重命名
                            </Button>
                            <Button
                              type="primary"
                              icon={<DeleteOutlined />}
                              size={'small'}
                              onClick={(e) => {
                                e.stopPropagation();
                                confirm({
                                  title: '确认操作?',
                                  icon: <ExclamationCircleFilled />,
                                  onOk() {
                                    api_delete_knowledge_base({
                                      kb_ids: [item.kb_id],
                                      user_id: 'zzp',
                                    }).then((res) => {
                                      if (res.code !== 200) {
                                        return;
                                      }
                                      api_delete_knowledge_base({
                                        kb_ids: [item.kb_id + '_FAQ'],
                                        user_id: 'zzp',
                                      }).then((res) => {
                                        reloadKnowledgeList();
                                        message.success('操作成功');
                                      });
                                    });
                                  },
                                  onCancel() {
                                    console.log('Cancel');
                                  },
                                });
                              }}
                            >
                              删除
                            </Button>
                          </Flex>
                        </>
                      }
                      title={null}
                      trigger={'click'}
                    >
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        type={'text'}
                        style={{ marginLeft: 'auto', color: '#fff' }}
                        icon={<SettingOutlined />}
                      ></Button>
                    </Popover>
                  </div>
                </>
              )}
            </>
          );
        })}
      <Modal
        title="重命名"
        open={isReNameModalOpen}
        onOk={reNameHandleOk}
        onCancel={reNameHandleCancel}
      >
        <Input
          value={reNameValue.new_kb_name}
          onChange={(e) => {
            setReNameValue({ ...reNameValue, new_kb_name: e.target.value });
          }}
        ></Input>
      </Modal>
    </div>
  );
};

export default Admin;
