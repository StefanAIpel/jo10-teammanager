import React from 'react';
import { getScoreResult } from '../utils/helpers';

function AllMatches({ teams }) {
  // Verzamel alle wedstrijden
  const allMatches = [];
  Object.keys(teams).forEach(teamId => {
    teams[teamId].wedstrijden.forEach(match => {
      if (match.type !== 'info' && match.type !== 'ntb' && match.type !== 'vrij') {
        allMatches.push({ ...match, teamNaam: teams[teamId].naam });
      }
    });
  });
  
  // Sorteer op datum
  allMatches.sort((a, b) => a.sortDate.localeCompare(b.sortDate) || (a.aftrap || '').localeCompare(b.aftrap || ''));
  
  // Groepeer op datum
  const grouped = {};
  allMatches.forEach(m => {
    if (!grouped[m.datum]) grouped[m.datum] = [];
    grouped[m.datum].push(m);
  });
  
  return (
    <div className="tab-content">
      <h3 className="section-title">📅 Alle JO10 wedstrijden</h3>
      
      <div className="all-matches-list">
        {Object.keys(grouped).map(datum => (
          <div key={datum}>
            <div className="date-header">📅 {datum}</div>
            {grouped[datum].map(m => {
              const thuisUit = m.type === 'thuis' ? '🏠 THUIS' : '🚗 UIT';
              const scoreClass = m.uitslag ? getScoreResult(m.uitslag, m.type) : '';
              
              return (
                <div key={`${m.teamNaam}-${m.id}`} className="all-match">
                  <span className="team">{m.teamNaam}</span>
                  <div className="info">
                    <div className="opp">{m.tegenstander}</div>
                    <div className="det">{thuisUit}</div>
                  </div>
                  {m.uitslag ? (
                    <span className={`score ${scoreClass}`}>{m.uitslag}</span>
                  ) : (
                    <span className="time">{m.aftrap || '-'}</span>
                  )}
                </div>
              );
            })}
          </div>
        ))}
        
        <div className="date-header fase4">📅 Za 11 apr</div>
        <div className="all-match fase4">
          <div className="info center">
            <div className="opp fase4-text">🚀 Start Fase 4</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllMatches;
