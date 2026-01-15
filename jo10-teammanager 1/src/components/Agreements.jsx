import React from 'react';

function Agreements({ afspraken }) {
  return (
    <div className="tab-content">
      <h3 className="section-title">📋 Teamafspraken</h3>
      
      <div className="afspraken-list">
        {afspraken.map((a, i) => (
          <div key={i} className="afspraak-card">
            <div className="afspraak-head">
              <span className="afspraak-icon">{a.icon}</span>
              <strong>{a.titel}</strong>
            </div>
            <p className="afspraak-text">{a.tekst}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Agreements;
