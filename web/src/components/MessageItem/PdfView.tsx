import { Spin } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
const pdfjsLib = require('pdfjs-dist');

console.log('pdfjsLib', pdfjsLib);

interface IProps {
  fileBase64?: string;
}

const Index: React.FC<IProps> = ({ fileBase64 }) => {
  const [loading, setLoading] = useState(true);
  const canvasWrapRef = useRef<HTMLDivElement>(null);

  const initView = async (fileBase64: string) => {
    setLoading(true);
    const pdfData = fileBase64;
    const binaryData = atob(pdfData);
    const len = binaryData.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryData.charCodeAt(i);
    }
    pdfjsLib.GlobalWorkerOptions.workerSrc = '/scripts/pdfjs/pdf.worker.js';
    try {
      const pdf = await pdfjsLib.getDocument(bytes).promise;
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const scale = 1; // 放大比例
        const viewport = page.getViewport({ scale });
        const canvas = document.createElement('canvas');
        if (canvasWrapRef.current) {
          canvasWrapRef.current.appendChild(canvas);
        }
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };
        await page.render(renderContext).promise;
        if (i === 1) {
          setLoading(false);
        }
        console.log('Page rendered');
      }
    } catch (error) {
      console.error('Failed to render PDF:', error);
    }
  };

  useEffect(() => {
    if (fileBase64 && canvasWrapRef.current) {
      initView(fileBase64);
    }
    // 清理函数
    return () => {
      if (canvasWrapRef.current) {
        while (canvasWrapRef.current.firstChild) {
          canvasWrapRef.current.removeChild(canvasWrapRef.current.firstChild);
        }
      }
    };
  }, [fileBase64]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {loading && (
        <div
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}
        >
          <Spin size="large" />
        </div>
      )}

      <div ref={canvasWrapRef}></div>
    </div>
  );
};

export default Index;
