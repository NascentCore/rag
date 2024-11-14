import { useEffect, useRef } from 'react';
import { init } from 'pptx-preview';

interface IProps {
  blobUrl: string;
}
const Index: React.FC<IProps> = ({ blobUrl }) => {
  const domRef = useRef<HTMLDivElement | any>(null);
  useEffect(() => {
    if (blobUrl) {
      fetch(blobUrl)
        .then((response) => {
          return response.arrayBuffer();
        })
        .then((res) => {
          const pptxPrviewer = init(domRef.current, {
            width: domRef.current.offsetWidth - 20,
            height: domRef.current.offsetHeight,
          });
          pptxPrviewer.preview(res);
        });
    }
  }, [blobUrl]);
  return (
    <>
      <div style={{ width: '100%', height: '100%' }} ref={domRef}></div>
    </>
  );
};

export default Index;
