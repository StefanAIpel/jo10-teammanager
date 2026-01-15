import React from 'react';
import MatchCard from './MatchCard';
import { openWhatsApp } from '../utils/helpers';

function MatchList({ matches, editMode, onEdit, showToast }) {
  const handleWhatsApp = (match) => {
    openWhatsApp(match);
  };
  
  return (
    <div className="tab-content">
      <div className="disclaimer">
        📱 Teamapp is leidend • Laatste info: <a href="https://www.voetbal.nl" target="_blank" rel="noopener noreferrer">voetbal.nl</a>
      </div>
      
      <h3 className="section-title">🏆 Wedstrijdschema</h3>
      
      <div className="match-list">
        {matches.map(match => (
          <MatchCard
            key={match.id}
            match={match}
            editMode={editMode}
            onEdit={onEdit}
            onWhatsApp={handleWhatsApp}
          />
        ))}
      </div>
      
      <div className="match-legend">
        <strong>S</strong> = Spelbegeleider · <strong>R</strong> = Chauffeur<br />
        Thuis: kleedkamers · Uit: Karwei Vathorst
      </div>
    </div>
  );
}

export default MatchList;
