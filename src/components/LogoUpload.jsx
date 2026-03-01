import React, { useRef } from 'react';
import { imageToCircleDataUrl } from '../utils/circleImage';

export default function LogoUpload({ onUpload }) {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type !== 'image/png' && file.type !== 'image/svg+xml') {
        alert('Veuillez importer un fichier PNG ou SVG.');
        return;
      }

      const reader = new FileReader();
      reader.onload = async (event) => {
        const dataUrl = event.target.result;
        try {
          const circularDataUrl = await imageToCircleDataUrl(dataUrl);
          onUpload(circularDataUrl);
        } catch {
          onUpload(dataUrl);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="logo-upload" onClick={() => fileInputRef.current?.click()}>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
        <polyline points="17 8 12 3 7 8"></polyline>
        <line x1="12" y1="3" x2="12" y2="15"></line>
      </svg>
      <span>Importer PNG ou SVG</span>
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        accept=".png, .svg" 
        style={{ display: 'none' }} 
      />
    </div>
  );
}
