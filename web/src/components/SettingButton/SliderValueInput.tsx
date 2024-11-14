import { Col, Input, Row, Slider } from 'antd';
import React, { useState } from 'react';

interface IProps {
  id?: string;
  value?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}

const SliderValue: React.FC<IProps> = (props) => {
  const { id, value = 0, onChange, min = 0, max, step } = props;

  return (
    <Row id={id} gutter={20}>
      <Col span={20}>
        <Slider value={value} min={min} max={max} onChange={onChange} step={step} />
      </Col>
      <Col span={4}>
        <Input value={value} />
      </Col>
    </Row>
  );
};

export default SliderValue;
