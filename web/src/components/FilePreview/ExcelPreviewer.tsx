import { useEffect, useRef } from 'react';
import jsPreviewExcel from '@js-preview/excel';
import '@js-preview/excel/lib/index.css';
interface IProps {
  blobUrl: string;
}
const Index: React.FC<IProps> = ({ blobUrl }) => {
  const domRef = useRef<HTMLDivElement | any>(null);
  useEffect(() => {
    if (blobUrl) {
      const myExcelPreviewer = jsPreviewExcel.init(domRef.current);
      myExcelPreviewer
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
      <div style={{ width: '100%', height: '100%' }} ref={domRef}></div>
    </>
  );
};

export default Index;
