import { useEffect, useRef, useState } from 'react';
import { Image } from 'antd';

interface IProps {
  blobUrl: string;
}
const Index: React.FC<IProps> = ({ blobUrl }) => {
  return (
    <>
      <Image preview={false} src={blobUrl} />
    </>
  );
};

export default Index;
