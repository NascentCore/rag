import { ArrowLeftOutlined } from '@ant-design/icons';
import { history, useIntl } from '@umijs/max';
import { Button, Result, Segmented } from 'antd';
import { Col, Row } from 'antd/es';
import React from 'react';

const Index: React.FC = () => (
  <>
    <Row align={'middle'} gutter={20}>
      <Col>
        <Button type={'primary'} icon={<ArrowLeftOutlined />}>
          返回对话
        </Button>
      </Col>
      <Col>
        <div style={{ fontSize: 20 }}>知识库名称</div>
      </Col>
      <Col>知识库id: xxxxxxxxxx</Col>
    </Row>
    <Row>
      <Col>
        <Segmented<string> options={['文档集', '问答集']} />
      </Col>
    </Row>
  </>
);

export default Index;
