import React from 'react';
import { useQrState } from '../context/QrContext';
import ColorField from './ColorField';
import LogoUpload from './LogoUpload';

export default function DesignTab({ onGenerate }) {
  const { data, setData, dotsColor, setDotsColor, bgColor, setBgColor, logoDataUrl, setLogoDataUrl } = useQrState();

  return (
    <div className="card">
      <div className="card-header-gradient">
        <h2>Générer un code</h2>
        <p>Créez votre code QR personnalisé en un instant</p>
      </div>

      <div className="card-body">
        <label className="label" htmlFor="qr-content">Contenu</label>
        <div className="input-group input-group--multiline">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
          </svg>
          <textarea
            id="qr-content"
            className="input-element input-element--textarea"
            value={data}
            onChange={(e) => setData(e.target.value)}
            placeholder="Texte, lien, paragraphe…"
            rows={3}
          />
        </div>

        <label className="label">Personnaliser les couleurs</label>
        <div className="colors-row">
          <ColorField label="Points" color={dotsColor} onChange={setDotsColor} />
          <ColorField label="Fond" color={bgColor} onChange={setBgColor} />
        </div>

        <label className="label">Logo (optionnel)</label>
        {logoDataUrl ? (
          <div className="logo-row">
            <div className="logo-preview-wrap">
              <img src={logoDataUrl} alt="" className="logo-preview" />
            </div>
            <button type="button" className="btn btn-remove-logo" onClick={() => setLogoDataUrl(null)} aria-label="Supprimer le logo">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
              Supprimer le logo
            </button>
          </div>
        ) : (
          <LogoUpload onUpload={(url) => setLogoDataUrl(url)} />
        )}

        {onGenerate && (
          <div className="actions-row">
            <button className="btn btn-primary" onClick={onGenerate}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <rect x="7" y="7" width="3" height="3"></rect>
                <rect x="14" y="7" width="3" height="3"></rect>
                <rect x="7" y="14" width="3" height="3"></rect>
                <rect x="14" y="14" width="3" height="3"></rect>
              </svg>
              Générer
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
