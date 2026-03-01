import React from 'react';
import { useQrState } from '../context/QrContext';

export default function ColorField({ label, color, onChange }) {
  const { theme } = useQrState();
  const hexLabel = color.toUpperCase();
  
  return (
    <div className="color-field">
      <div 
        className="color-preview" 
        style={{ backgroundColor: color }}
      />
      <div className="color-info">
        <span className="color-name">{label}</span>
        <span className="color-hex">{hexLabel}</span>
      </div>
      <input 
        type="color" 
        value={color} 
        onChange={(e) => onChange(e.target.value)} 
        className="color-input-hidden"
      />
    </div>
  );
}
