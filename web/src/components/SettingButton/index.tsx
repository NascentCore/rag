import { SettingOutlined } from '@ant-design/icons';
import {
  Button,
  Checkbox,
  Col,
  Flex,
  Form,
  Input,
  message,
  Modal,
  Row,
  Select,
  Slider,
  Tooltip,
  Typography,
} from 'antd';
import React, { useEffect, useState } from 'react';
import SliderValueInput from './SliderValueInput';
import {
  activeChatSettingConfigured,
  getUserChatSetting,
  saveChatSettingConfigured,
} from '@/utils/userChatSetting';

const Index: React.FC = () => {
  const [modelTypeOption, setModelTypeOption] = useState();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form] = Form.useForm();

  useEffect(() => {
    changeSelectModel('openAI');
  }, []);

  const changeSelectModel = (modelType: string) => {
    const userChatSetting = getUserChatSetting();
    const chatSettingConfiguredList = userChatSetting.chatSettingConfigured;
    const modelOptions = chatSettingConfiguredList.map((x: any) => ({
      ...x,
      label: x.modelType,
      value: x.modelType,
    }));
    console.log('modelOptions', modelOptions);
    setModelTypeOption(modelOptions);
    const current = modelOptions.find((x) => x.modelType === modelType);
    console.log('current', current);
    form.resetFields();
    form.setFieldsValue(current);
  };
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    form.validateFields().then((values) => {
      console.log('values', values);
      activeChatSettingConfigured(values);
    });
    message.success('保存成功');
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const modelTypeValueWatch = Form.useWatch('modelType', form);
  const apiContextLengthValueWatch = Form.useWatch('apiContextLength', form);
  const maxTokenMax = (apiContextLengthValueWatch * 256) / 1024;

  const saveCustomerConfig = () => {
    form.validateFields().then((values) => {
      console.log('values', values);
      const parmas = { ...values, modelType: values.modelName };
      console.log('parmas', parmas);
      saveChatSettingConfigured(parmas);
    });
    setIsModalOpen(false);
    message.success('保存成功');
  };

  return (
    <>
      <Button
        type={'text'}
        shape="round"
        style={{ padding: '0 12px' }}
        icon={<SettingOutlined />}
        onClick={showModal}
      ></Button>
      <Modal
        title="模型配置"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={800}
      >
        <Form
          form={form}
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 19 }}
          labelAlign={'left'}
          onValuesChange={(e) => {
            console.log('e', e);
          }}
        >
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
          <Form.Item name="capabilities" label={'模型能力'}>
            <Checkbox.Group>
              <Checkbox value="networkSearch" style={{ lineHeight: '32px' }}>
                联网检索
              </Checkbox>
              <Checkbox value="mixedSearch" style={{ lineHeight: '32px' }}>
                混合检索
              </Checkbox>
              <Checkbox value="onlySearch" style={{ lineHeight: '32px' }}>
                仅检索模式
              </Checkbox>
              <Checkbox value="rerank" style={{ lineHeight: '32px' }}>
                检索增强
              </Checkbox>
            </Checkbox.Group>
          </Form.Item>
        </Form>
        {modelTypeValueWatch === '自定义模型配置' && (
          <Button type={'primary'} onClick={saveCustomerConfig}>
            保存当前自定义配置
          </Button>
        )}
      </Modal>
    </>
  );
};

export default Index;
