import { useState, useEffect } from 'react'
import { QrProvider } from './context/QrContext'
import Navbar from './components/Navbar'
import Tabs from './components/Tabs'
import DesignTab from './components/DesignTab'
import PreviewTab from './components/PreviewTab'

// Import our new globals.css instead of default Vite files
import './styles/globals.css'

function AppContent() {
  const [activeTab, setActiveTab] = useState('design');
  const [isWide, setIsWide] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        setIsWide(window.innerWidth >= 700);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleGenerateClick = () => {
    if (!isWide) {
      setActiveTab('preview');
    } else {
      const previewPane = document.getElementById('preview-pane');
      if (previewPane) {
        previewPane.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  return (
    <div className="app-container">
      <Navbar />
      {!isWide && <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />}

      <div className={`content-area ${isWide ? 'content-area--split' : ''}`}>
        {isWide ? (
          <>
            <div className="pane pane--design">
              <DesignTab onGenerate={handleGenerateClick} />
            </div>
            <div className="pane pane--preview" id="preview-pane">
              <PreviewTab />
            </div>
          </>
        ) : (
          activeTab === 'design'
            ? <DesignTab onGenerate={handleGenerateClick} />
            : <PreviewTab />
        )}
      </div>
      
      <div className="footer">
        <strong>À propos de Vercode</strong>
        Générateur de codes QR minimaliste, simple et rapide. Créé par Jean-Marc Verbeck.
        
        <div className="footer-socials">
          <a href="#" aria-label="Twitter/X">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
            </svg>
          </a>
          <a href="https://github.com/GIT-VERBECK" aria-label="GitHub" target="_blank" rel="noopener noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <QrProvider>
      <AppContent />
    </QrProvider>
  )
}

export default App
