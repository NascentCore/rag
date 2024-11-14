import { useEffect, useRef } from 'react';
import jsPreviewPdf from '@js-preview/pdf';

interface IProps {
  blobUrl: string;
}
const Index: React.FC<IProps> = ({ blobUrl }) => {
  const domRef = useRef<HTMLDivElement | any>(null);
  useEffect(() => {
    if (blobUrl) {
      const myPdfPreviewer = jsPreviewPdf.init(domRef.current, {
        onError: (e) => {
          console.log('发生错误', e);
        },
        onRendered: () => {
          console.log('渲染完成');
        },
      });
      myPdfPreviewer.preview(blobUrl);
    }
  }, [blobUrl]);
  return (
    <>
      <div ref={domRef}></div>
    </>
  );
};

export default Index;
