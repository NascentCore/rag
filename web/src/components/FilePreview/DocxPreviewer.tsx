import { useEffect, useRef } from 'react';
import jsPreviewDocx from '@js-preview/docx';
import '@js-preview/docx/lib/index.css';
interface IProps {
  blobUrl: string;
}
const Index: React.FC<IProps> = ({ blobUrl }) => {
  const domRef = useRef<HTMLDivElement | any>(null);
  useEffect(() => {
    if (blobUrl) {
      const myDocxPreviewer = jsPreviewDocx.init(domRef.current);
      myDocxPreviewer
        .preview(blobUrl)
        .then((res) => {
          console.log('预览完成');
        })
        .catch((e) => {
          console.log('预览失败', e);
        });
    }
  }, [blobUrl]);
  return (
    <>
      <div ref={domRef}></div>
    </>
  );
};

export default Index;
