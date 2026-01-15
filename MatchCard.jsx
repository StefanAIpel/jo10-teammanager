import React from 'react';
import { Clock, MapPin, Users, Car, Info, ExternalLink } from 'lucide-react';
import { getScoreResult } from '../utils/helpers';

function MatchCard({ match, editMode, onEdit, onWhatsApp }) {
  const { type, datum, tegenstander, ronde, verzamelTijd, aftrap, veld, kleedkamer, 
          verzamelPlek, spelbegeleider, aanvoerder, chauffeurs, afwezig, invallers, weer, info, 
          uitslag, locatieUrl } = match;
  
  // Info card
  if (type === 'info') {
    return (
      <div className="match-card info">
        <p className="date-small">{datum}</p>
        <p className="info-text">🚀 {tegenstander}</p>
      </div>
    );
  }
  
  // NTB card
  if (type === 'ntb') {
    return (
      <div className={`match-card ntb ${editMode ? 'editable' : ''}`} onClick={editMode ? () => onEdit(match) : undefined}>
        <div className="match-head">
          <div>
            <div className="date">{datum}</div>
            <div className="opponent">{tegenstander}</div>
          </div>
          <span className="match-badge ntb">NTB</span>
        </div>
      </div>
    );
  }
  
  const badgeText = { thuis: 'Thuis', uit: 'Uit', vrij: 'Vrij', training: 'Training', oefenwedstrijd: 'Oefenwedstr.' }[type] || type;
  
  // Vrij card
  if (type === 'vrij') {
    return (
      <div className="match-card vrij">
        <div className="match-head">
          <div>
            <div className="date">{datum}</div>
            <div className="opponent">{tegenstander}</div>
          </div>
          <span className="match-badge vrij">{badgeText}</span>
        </div>
      </div>
    );
  }
  
  return (
    <div className={`match-card ${type} ${editMode ? 'editable' : ''}`} onClick={editMode ? () => onEdit(match) : undefined}>
      <div className="match-head">
        <div>
          <div className="date">{datum}{ronde !== '-' ? ` • R${ronde}` : ''}</div>
          <div className="opponent">{tegenstander}</div>
        </div>
        <span className={`match-badge ${type}`}>{badgeText}</span>
      </div>
      
      <div className="match-body">
        <div className="match-grid">
          <div className="match-row">
            <span className="icon">⏰</span>
            <span className="label">Verzamelen:</span>
            <span className="value">{verzamelTijd || 'NTB'}</span>
          </div>
          <div className="match-row">
            <span className="icon">⚽</span>
            <span className="label">Aftrap:</span>
            <span className="value">{aftrap || 'NTB'}</span>
          </div>
          <div className="match-row">
            <span className="icon">🥅</span>
            <span className="label">Veld:</span>
            <span className="value">{veld || 'NTB'}</span>
          </div>
          <div className="match-row">
            <span className="icon">🚪</span>
            <span className="label">KK:</span>
            <span className="value">{kleedkamer || 'NTB'}</span>
          </div>
          
          {aanvoerder && (
            <div className="match-row">
              <span className="icon">🎖</span>
              <span className="label">Aanvoerder:</span>
              <span className="value">{aanvoerder}</span>
            </div>
          )}
          
          {type === 'thuis' && (
            <div className="match-row">
              <span className="icon">🧑‍⚖</span>
              <span className="label">Spelbeg:</span>
              <span className="value">{spelbegeleider || 'NTB'}</span>
            </div>
          )}
          
          {type !== 'thuis' && (
            <div className="match-row full">
              <span className="icon">📍</span>
              <span className="label">Verzamelplek:</span>
              <span className="value">{verzamelPlek || 'Karwei Vathorst'}</span>
            </div>
          )}
          
          {type === 'uit' && chauffeurs && chauffeurs.length > 0 && (
            <div className="match-row full">
              <span className="icon">🚗</span>
              <span className="label">Chauffeurs:</span>
              <span className="value">{chauffeurs.join(', ')}</span>
            </div>
          )}
          
          {afwezig && afwezig.length > 0 && (
            <div className="match-row full">
              <span className="icon">😶‍🌫</span>
              <span className="label">Afwezig:</span>
              <span className="value">{afwezig.join(', ')}</span>
            </div>
          )}
          
          {weer && (
            <div className="match-row full">
              <span className="icon">🌤</span>
              <span className="value">{weer}</span>
            </div>
          )}
          
          {info && (
            <div className="match-row full">
              <span className="icon">ℹ️</span>
              <span className="value">{info}</span>
            </div>
          )}
        </div>
        
        {locatieUrl && type === 'uit' && (
          <a href={locatieUrl} target="_blank" rel="noopener noreferrer" className="loc-link">
            📍 Locatie
          </a>
        )}
        
        {invallers && invallers.length > 0 && (
          <div className="team-changes">
            <strong>Invallers:</strong>{' '}
            <span className="plus">+{invallers.join(', +')}</span>
          </div>
        )}
      </div>
      
      {uitslag && (
        <div className={`match-score ${getScoreResult(uitslag, type)}`}>
          ⚽ Uitslag: {uitslag}
        </div>
      )}
      
      <div className="match-actions">
        <button className="action-btn whatsapp" onClick={(e) => { e.stopPropagation(); onWhatsApp(match); }}>
          <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          WhatsApp
        </button>
        {editMode && (
          <button className="action-btn edit" onClick={(e) => { e.stopPropagation(); onEdit(match); }}>
            ✏️ Bewerk
          </button>
        )}
      </div>
    </div>
  );
}

export default MatchCard;
