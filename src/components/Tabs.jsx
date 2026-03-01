import React from 'react';

export default function Tabs({ activeTab, setActiveTab }) {
  return (
    <div className="tabs">
      <div 
        className={`tab ${activeTab === 'design' ? 'active' : ''}`}
        onClick={() => setActiveTab('design')}
      >
        Conception
      </div>
      <div 
        className={`tab ${activeTab === 'preview' ? 'active' : ''}`}
        onClick={() => setActiveTab('preview')}
      >
        Aperçu & Export
      </div>
    </div>
  );
}
