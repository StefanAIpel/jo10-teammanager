import React, { useState } from 'react';
import { X, Lock } from 'lucide-react';

function PasswordModal({ onSubmit, onClose }) {
  const [password, setPassword] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(password);
  };
  
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal small" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3><Lock size={18} /> Wachtwoord</h3>
          <button className="modal-close" onClick={onClose}><X size={20} /></button>
        </div>
        
        <form onSubmit={handleSubmit} className="modal-body">
          <div className="form-group">
            <label>Voer trainerwachtwoord in:</label>
            <input 
              type="password" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoFocus
              placeholder="Wachtwoord"
            />
          </div>
        </form>
        
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>Annuleren</button>
          <button className="btn btn-primary" onClick={handleSubmit}>Inloggen</button>
        </div>
      </div>
    </div>
  );
}

export default PasswordModal;
