import { useEffect, useRef, useState } from 'react';

interface IProps {
  blobUrl: string;
}
const Index: React.FC<IProps> = ({ blobUrl }) => {
  const [text, setText] = useState('');
  useEffect(() => {
    if (blobUrl) {
      fetch(blobUrl)
        .then((response) => {
          return response.text();
        })
        .then((res) => {
          setText(res);
        });
    }
  }, [blobUrl]);
  return (
    <>
      <pre>{text}</pre>
    </>
  );
};

export default Index;
