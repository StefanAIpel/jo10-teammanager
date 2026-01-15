import React from 'react';
import { X } from 'lucide-react';

function ProfileModal({ teams, allPersons, currentProfile, onSelect, onClose }) {
  const trainers = ['Eric', 'Dominique', 'Mark', 'Ryan', 'Stefan', 'Gigi', 'Niels', 'Hassan'];
  
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal profile-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>👤 Kies profiel</h3>
          <button className="modal-close" onClick={onClose}><X size={20} /></button>
        </div>
        
        <div className="modal-body profile-body">
          <div className="profile-section">
            <h4>Trainers & Teammanagers</h4>
            <div className="profile-grid">
              {trainers.map(name => {
                const p = allPersons[name];
                return (
                  <div 
                    key={name}
                    className={`profile-option ${currentProfile === name ? 'selected' : ''}`}
                    onClick={() => onSelect(name)}
                  >
                    <div className="avatar">{name[0]}</div>
                    <div className="profile-info">
                      <div className="pname">{name}</div>
                      <div className="pteam">{p?.team?.toUpperCase()}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          {Object.keys(teams).map(teamId => (
            <div key={teamId} className="profile-section">
              <h4>{teams[teamId].naam}</h4>
              <div className="profile-grid">
                {teams[teamId].spelers.map(name => (
                  <div 
                    key={name}
                    className={`profile-option ${currentProfile === name ? 'selected' : ''}`}
                    onClick={() => onSelect(name)}
                  >
                    <div className="avatar">{name[0]}</div>
                    <div className="profile-info">
                      <div className="pname">{name}</div>
                      <div className="pteam">{teams[teamId].naam}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProfileModal;
