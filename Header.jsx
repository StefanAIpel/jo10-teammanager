import React from 'react';
import { User, Edit2, Check } from 'lucide-react';

function Header({ profile, onProfileClick, onEditClick, editMode }) {
  return (
    <header className="header">
      <div className="header-left">
        <div className="logo">⚽</div>
        <div className="header-title">
          <h1>VV Hooglanderveen</h1>
          <p>JO10 • Seizoen 25-26 • Fase 3</p>
        </div>
      </div>
      <div className="header-right">
        <button className="profile-btn" onClick={onProfileClick}>
          <User size={16} />
          <span>{profile || 'Kies'}</span>
        </button>
        <button 
          className={`edit-btn ${editMode ? 'active' : ''}`} 
          onClick={onEditClick}
        >
          {editMode ? <Check size={18} /> : <Edit2 size={18} />}
        </button>
      </div>
    </header>
  );
}

export default Header;
