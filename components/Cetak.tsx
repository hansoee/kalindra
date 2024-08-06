import { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

// Set workerSrc to the local worker file provided by pdfjs-dist
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.1.81/pdf.worker.min.js`;

const Cetak: React.FC = () => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    console.log('PDF loaded successfully');
  };

  const onDocumentLoadError = (error: Error) => {
    console.error('Error while loading PDF:', error);
  };

  return (
    <div style={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <Document
        file="https://drive.google.com/file/d/11X1aPoTDtkTzNukbcmzEIEmNecOxVkiq/view?usp=sharing"
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={onDocumentLoadError}
      >
        <Page pageNumber={pageNumber} />
      </Document>
      <div>
        <button disabled={pageNumber <= 1} onClick={() => setPageNumber(pageNumber - 1)}>
          Previous
        </button>
        <span>
          Page {pageNumber} of {numPages}
        </span>
        <button disabled={pageNumber >= numPages!} onClick={() => setPageNumber(pageNumber + 1)}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Cetak;
