'use client';

import { useState } from 'react';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';

function getPdfUrl(token: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.replace('/v2', '/v1')
    || 'https://localhost:7211/api/v1';
  return `${baseUrl}/QuotationPreview/DownloadPdf/${token}`;
}

interface PdfDownloadButtonProps {
  token: string;
  quotationCode: string;
}

export default function PdfDownloadButton({ token, quotationCode }: PdfDownloadButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const url = getPdfUrl(token);
      const response = await fetch(url);
      if (!response.ok) throw new Error('Error al descargar');

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = `${quotationCode}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error('Error downloading PDF:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={isDownloading}
      className="flex items-center gap-2 px-4 py-1.5 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-colors"
    >
      <ArrowDownTrayIcon className="w-4 h-4" />
      {isDownloading ? 'Descargando...' : 'Descargar PDF'}
    </button>
  );
}
