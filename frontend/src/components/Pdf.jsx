import React from 'react';
import { Button } from '@mui/material';
import {pdfjs } from 'react-pdf';
import { saveAs } from 'file-saver';

// Set up the worker for react-pdf
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PdfDownloadComponent = ({ pdfUrl, fileName }) => {


  const handleDownload = async () => {
    try {
      const response = await fetch(pdfUrl);
      const blob = await response.blob();
      saveAs(blob, fileName);
    } catch (error) {
      console.error('Error al descargar el pdf:', error);
      alert('Error al descargar el pdf, intente otra vez');
    }
  };

  
  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleDownload}>
        Descargar PDF
      </Button>
    </div>
  );
};

export default PdfDownloadComponent;