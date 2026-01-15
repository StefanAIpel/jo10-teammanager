import React from 'react';
import { getScoreResult, TODAY } from '../utils/helpers';

function Overview({ team, afspraken }) {
  const played = team.wedstrijden.filter(m => m.sortDate < TODAY || m.uitslag);
  const upcoming = team.wedstrijden.filter(m => m.sortDate >= TODAY && !m.uitslag && m.type !== 'info' && m.type !== 'ntb');
  
  return (
    <div className="tab-content">
      <div className="disclaimer">
        📱 Teamapp is leidend • Laatste info: <a href="https://www.voetbal.nl" target="_blank" rel="noopener noreferrer">voetbal.nl</a>
      </div>
      
      <div className="section">
        <h3 className="section-title">🌟 Spelers</h3>
        <div className="players-row">
          {team.spelers.map(speler => (
            <div key={speler} className="player-chip">
              <div className="player-avatar">{speler[0]}</div>
              <span>{speler}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="section">
        <h3 className="section-title">📌 Belangrijkste afspraken</h3>
        <div className="afspraken-grid">
          {afspraken.slice(0, 4).map((a, i) => (
            <div key={i} className="afspraak-mini">
              <strong>{a.icon} {a.titel}</strong>
              <p>{a.tekst.split('.')[0]}</p>
            </div>
          ))}
        </div>
      </div>
      
      <h3 className="programma-title">📊 Gespeeld</h3>
      <div className="programma-list">
        {played.length ? played.map(m => (
          <div key={m.id} className="programma-item">
            <div className="date">{m.datum}</div>
            <div className="opp">{m.tegenstander}</div>
            {m.uitslag ? (
              <span className={`badge score ${getScoreResult(m.uitslag, m.type)}`}>{m.uitslag}</span>
            ) : (
              <span className={`badge ${m.type}`}>{m.type === 'thuis' ? 'T' : 'U'}</span>
            )}
          </div>
        )) : <p className="empty-text">Nog geen wedstrijden gespeeld</p>}
      </div>
      
      <h3 className="programma-title">📅 Komende wedstrijden</h3>
      <div className="programma-list">
        {upcoming.slice(0, 5).map(m => (
          <div key={m.id} className="programma-item">
            <div className="date">{m.datum}</div>
            <div className="opp">{m.tegenstander}</div>
            <span className={`badge ${m.type}`}>{m.type === 'thuis' ? 'THUIS' : 'UIT'}</span>
          </div>
        ))}
        {upcoming.length === 0 && <p className="empty-text">Geen wedstrijden gepland</p>}
      </div>
    </div>
  );
}

export default Overview;
