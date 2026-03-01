import React, { useMemo } from 'react';
import { useQrState } from '../context/QrContext';
import { useQrCode } from '../hooks/useQrCode';

export default function PreviewTab() {
  const { data, dotsColor, bgColor, logoDataUrl } = useQrState();

  const options = useMemo(() => ({
    data: data || 'https://vercode.com',
    dotsOptions: {
      color: dotsColor,
      type: 'square'
    },
    backgroundOptions: {
      color: bgColor,
    },
    image: logoDataUrl || undefined,
    imageOptions: {
      crossOrigin: 'anonymous',
      margin: 5,
      imageSize: 0.28,
      hideBackgroundDots: true
    }
  }), [data, dotsColor, bgColor, logoDataUrl]);

  const { ref, downloadPng, downloadSvg } = useQrCode(options);

  return (
    <div className="card">
      <div className="card-body">
        
        <div className="preview-badge-container">
          <div className="preview-badge">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
            Aperçu en direct
          </div>
        </div>

        <div className="qr-container" role="img" aria-label="Aperçu du code QR">
          <div ref={ref} className="qr-wrapper" />
        </div>

        <div className="actions-row">
          <button type="button" className="btn btn-secondary" onClick={downloadPng}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            PNG
          </button>
          <button type="button" className="btn btn-secondary" onClick={downloadSvg}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            SVG
          </button>
        </div>

      </div>
    </div>
  );
}
