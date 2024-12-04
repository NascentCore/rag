import { getChatSettingConfigured, saveChatSettingConfigured } from '@/utils/chatSettingConfigured';
import {
  Button,
  Checkbox,
  Flex,
  Form,
  Input,
  message,
  Select,
  Space,
  Tooltip,
  Typography,
} from 'antd';
import React, { useEffect, useState } from 'react';
import SliderValueInput from './SliderValueInput';
import styles from './index.less';

const Index: React.FC<any> = ({ handleCancel }) => {
  const [modelTypeOption, setModelTypeOption] = useState<any>();

  const [form] = Form.useForm();

  const capabilitiesOptions = [
    {
      value: 'networkSearch',
      label: '联网检索',
      tooltip: '接入互联网，会在需要时通过互联网搜集资料',
    },
    {
      value: 'mixedSearch',
      label: '混合检索',
      tooltip: '使用向量检索与全文检索的综合结果返回',
    },
    {
      value: 'onlySearch',
      label: '仅检索模式',
      tooltip: '此模式不会返回说明文字',
    },
    {
      value: 'rerank',
      label: '检索增强',
      tooltip: '开启二阶段检索（rerank），会大幅增加检索耗时',
    },
    {
      value: 'llm',
      label: 'LLM推理',
      tooltip: '当检索内容中未包含答案时，使用LLM模型自身的能力回答',
    },
    {
      value: 'sql',
      label: 'SQL查询',
      tooltip: '将自然语言转换为SQL查询并展示结果',
    },
  ];

  const changeSelectModel = (modelType?: string) => {
    const chatSettingConfiguredList = getChatSettingConfigured();
    const modelOptions = chatSettingConfiguredList.map((x: any) => ({
      ...x,
      label: x.modelType,
      value: x.modelType,
    }));
    console.log('modelOptions', modelOptions);
    setModelTypeOption(modelOptions);
    const current = modelType
      ? modelOptions.find((x) => x.modelType === modelType)
      : modelOptions.find((x) => x.active === true);
    console.log('current', current);
    form.resetFields();
    form.setFieldsValue(current);
  };

  const modelTypeValueWatch = Form.useWatch('modelType', form);
  const apiContextLengthValueWatch = Form.useWatch('apiContextLength', form);
  const maxTokenMax = (apiContextLengthValueWatch * 256) / 1024;

  const saveCustomerConfig = () => {
    form.validateFields().then((values) => {
      console.log('values', values);
      const parmas = { ...values, active: false };
      console.log('parmas', parmas);
      saveChatSettingConfigured(parmas);
    });
    message.success('保存成功');
  };

  useEffect(() => {
    console.log('ModelTab init');
    changeSelectModel();
  }, []);

  const handleOk = () => {
    form.validateFields().then((values) => {
      values.active = true;
      console.log('values', values);
      saveChatSettingConfigured(values);
      handleCancel();
      message.success('保存成功');
    });
  };

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
        <Form.Item name="id" hidden></Form.Item>
        <Form.Item name="modelType" label={'模型提供方'} rules={[{ required: true }]}>
          <Select
            allowClear
            options={modelTypeOption}
            onChange={(v) => {
              changeSelectModel(v);
            }}
          />
        </Form.Item>
        {modelTypeValueWatch === '自定义模型配置' && (
          <Form.Item name="modelName" label={'自定义模型名称'} rules={[{ required: true }]}>
            <Input placeholder="请输入" allowClear />
          </Form.Item>
        )}

        {modelTypeValueWatch !== 'ollama' && (
          <Form.Item name="apiKey" label={'API秘钥'}>
            <Input placeholder="请输入" allowClear />
          </Form.Item>
        )}

        <Form.Item name="apiBase" label={'API路径'}>
          <Input placeholder="请输入" allowClear />
        </Form.Item>
        <Form.Item name="apiModelName" label={'模型名称'}>
          <Input placeholder="请输入" allowClear />
        </Form.Item>
        <Form.Item
          name="apiContextLength"
          label={
            <Tooltip
              title={<div style={{ color: '#333' }}>LLM输入和输出的总token数量上限</div>}
              color="#fff"
            >
              <span>总Token数量</span>
            </Tooltip>
          }
          rules={[{ required: true }]}
        >
          {modelTypeValueWatch === 'ollama' ? (
            <Tooltip
              color="#fff"
              title={
                <div style={{ color: '#333' }}>
                  <div>
                    ollama本地服务上下文长度无法通过参数设置，默认为2048，具体修改方式请参考：[FAQ]
                  </div>
                  <Typography.Link
                    href="https://github.com/netease-youdao/QAnything/blob/qanything-v2/FAQ_zh.md"
                    target={'_blank'}
                  >
                    https://github.com/netease-youdao/QAnything/blob/qanything-v2/FAQ_zh.md
                  </Typography.Link>
                </div>
              }
            >
              <span>
                ollama本地服务上下文长度无法通过参数设置，默认为2048，具体修改方式请参考：[FAQ]
              </span>
            </Tooltip>
          ) : (
            <SliderValueInput min={4 * 1024} max={200 * 1024} step={1024} />
          )}
        </Form.Item>
        <Form.Item
          name="maxToken"
          label={
            <Tooltip
              title={
                <div style={{ color: '#333' }}>
                  LLM输出的token数量上限. 最大值为: 总Token数量 / 4
                </div>
              }
              color="#fff"
            >
              <span>输出Token数量</span>
            </Tooltip>
          }
          rules={[{ required: true }]}
        >
          <SliderValueInput min={1} max={maxTokenMax} />
        </Form.Item>
        <Form.Item
          name="chunkSize"
          label={
            <Tooltip
              title={
                <div style={{ color: '#333' }}>
                  单个文本分片的token数量上限. 最大值为: 总Token数量 / 4
                </div>
              }
              color="#fff"
            >
              <span>文本分片大小</span>
            </Tooltip>
          }
          rules={[{ required: true }]}
        >
          <SliderValueInput min={1} max={maxTokenMax} />
        </Form.Item>
        <Form.Item
          name="temperature"
          label={
            <Tooltip
              title={
                <div style={{ color: '#333' }}>
                  控制输出的随机性。较低值使输出更确定，较高值增加创意性
                </div>
              }
              color="#fff"
            >
              <span>随机性</span>
            </Tooltip>
          }
          rules={[{ required: true }]}
        >
          <SliderValueInput min={0} max={1} step={0.01} />
        </Form.Item>
        <Form.Item
          name="top_P"
          label={
            <Tooltip
              title={
                <div style={{ color: '#333' }}>
                  限制词汇选择范围。较低值使输出更聚焦，较高值增加多样性
                </div>
              }
              color="#fff"
            >
              <span>累计概率阀值</span>
            </Tooltip>
          }
          rules={[{ required: true }]}
        >
          <SliderValueInput min={0} max={1} step={0.01} />
        </Form.Item>
        <Form.Item
          name="top_K"
          label={
            <Tooltip
              title={
                <div style={{ color: '#333' }}>检索算法取所有文档分片里最相关的分片数量上限</div>
              }
              color="#fff"
            >
              <span>检索结果数量上限</span>
            </Tooltip>
          }
          rules={[{ required: true }]}
        >
          <SliderValueInput min={1} max={100} />
        </Form.Item>
        <Form.Item
          name="context"
          label={
            <Tooltip
              title={<div style={{ color: '#333' }}>单轮对话中保留的历史消息数量上限</div>}
              color="#fff"
            >
              <span>上下文消息数</span>
            </Tooltip>
          }
        >
          <SliderValueInput min={0} max={10} />
        </Form.Item>
        <Form.Item name="capabilities" label="模型能力">
            <Checkbox.Group>
              {capabilitiesOptions.map((option) => (
                <Checkbox key={option.value} value={option.value} style={{ lineHeight: '32px' }}>
                  <Tooltip title={<div style={{ color: '#333' }}>{option.tooltip}</div>} color="#fff">
                    <span>{option.label}</span>
                  </Tooltip>
                </Checkbox>
              ))}
            </Checkbox.Group>
          </Form.Item>
      </Form>
      {modelTypeValueWatch === '自定义模型配置' && (
        <Button type={'primary'} onClick={saveCustomerConfig}>
          保存当前自定义配置
        </Button>
      )}
      <Flex justify={'flex-end'}>
        <Space>
          <Button onClick={handleCancel}>取消</Button>
          <Button type={'primary'} onClick={handleOk}>
            确定
          </Button>
        </Space>
      </Flex>
      <div style={{ height: 30 }}></div>
    </div>
  );
};

export default Index;
