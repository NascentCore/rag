import {
  chat_store_active_key,
  chat_store_key,
  chat_store_knowledge_list_select_key,
} from '@/models/chat';
import {
  getCommonSettingConfigured,
  resetCommonSettingConfigured,
  saveCommonSettingConfigured,
} from '@/utils/commonSettingConfigured';
import { SubmitKey } from '@/utils/interface';
import { Button, Form, Input, message, Modal, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import styles from './index.less';

const Index: React.FC = () => {
  const [form] = Form.useForm();
  const [settingConfig, setSettingConfig] = useState<any>(getCommonSettingConfigured());

  useEffect(() => {
    saveCommonSettingConfigured(settingConfig);
  }, [settingConfig]);

  return (
    <div className={styles.modelInner}>
      <Form
        form={form}
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 19 }}
        labelAlign={'left'}
        onValuesChange={(e) => {
          console.log('e', e);
        }}
      >
        <Form.Item label={'标题'}>
          <Input
            value={settingConfig.webSiteTitle}
            onChange={(e) => {
              setSettingConfig({ ...settingConfig, webSiteTitle: e.target.value });
            }}
          ></Input>
        </Form.Item>
        <Form.Item label={'发送键'}>
          <Select
            value={settingConfig.submitKey}
            options={[
              {
                label: SubmitKey.Enter,
                value: SubmitKey.Enter,
              },
              {
                label: SubmitKey.ShiftEnter,
                value: SubmitKey.ShiftEnter,
              },
            ]}
            onChange={(v) => {
              setSettingConfig({ ...settingConfig, submitKey: v });
            }}
          />
        </Form.Item>
        <Form.Item label={'重置所有设置'}>
          <Button
            danger
            onClick={() => {
              Modal.confirm({
                title: '确认',
                content: '确认重置所有设置？',
                okText: '确认',
                okType: 'danger',
                cancelText: '取消',
                onOk() {
                  resetCommonSettingConfigured();
                  setSettingConfig(getCommonSettingConfigured());
                  message.success('操作成功');
                },
                onCancel() {},
              });
            }}
          >
            立即重置
          </Button>
        </Form.Item>
        <Form.Item label={'清除所有数据'}>
          <Button
            danger
            onClick={() => {
              Modal.confirm({
                title: '确认',
                content: '确认清除所有聊天数据，设置数据？',
                okText: '确认',
                okType: 'danger',
                cancelText: '取消',
                onOk() {
                  localStorage.removeItem(chat_store_key);
                  localStorage.removeItem(chat_store_active_key);
                  localStorage.removeItem(chat_store_knowledge_list_select_key);
                  window.location.reload();
                },
                onCancel() {},
              });
            }}
          >
            立即清除
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Index;
