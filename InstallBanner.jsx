import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

function InstallBanner() {
  const [show, setShow] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  
  useEffect(() => {
    // Check if already installed or dismissed
    if (localStorage.getItem('jo10-install-dismissed')) return;
    if (window.matchMedia('(display-mode: standalone)').matches) return;
    
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShow(true);
    };
    
    window.addEventListener('beforeinstallprompt', handler);
    
    // Show for iOS after delay
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    if (isIOS) {
      setTimeout(() => setShow(true), 2000);
    }
    
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);
  
  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setShow(false);
      }
    } else {
      // iOS instructions
      alert('Tik op het "Deel" icoon en kies "Zet op beginscherm"');
    }
  };
  
  const handleClose = () => {
    setShow(false);
    localStorage.setItem('jo10-install-dismissed', 'true');
  };
  
  if (!show) return null;
  
  return (
    <div className="install-banner">
      <span>📲 Als app gebruiken? Voeg toe aan startscherm!</span>
      <div className="install-actions">
        <button className="install-btn" onClick={handleInstall}>Toevoegen</button>
        <button className="install-close" onClick={handleClose}><X size={16} /></button>
      </div>
    </div>
  );
}

export default InstallBanner;
