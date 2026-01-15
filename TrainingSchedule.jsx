import React, { useState } from 'react';
import { TODAY, getVrijdagen } from '../utils/helpers';

function TrainingSchedule({ editMode, techniekDates, techniekSettings, onSave }) {
  const [showConfig, setShowConfig] = useState(false);
  const [localDates, setLocalDates] = useState(techniekDates);
  const [localSettings, setLocalSettings] = useState(techniekSettings);
  
  const vrijdagen = getVrijdagen();
  const activeTechniek = techniekDates.filter(d => d >= TODAY);
  
  const toggleDate = (date) => {
    if (localDates.includes(date)) {
      setLocalDates(localDates.filter(d => d !== date));
    } else if (localDates.length < 8) {
      setLocalDates([...localDates, date].sort());
    }
  };
  
  const handleSave = () => {
    onSave(localDates, localSettings);
    setShowConfig(false);
  };
  
  return (
    <div className="tab-content">
      <h3 className="section-title">📅 Weekschema</h3>
      
      <div className="training-list">
        <div className="train-card">
          <div className="train-day">DI</div>
          <div className="train-info">
            <p className="train-title">Teamtraining</p>
            <p className="train-time">17:45 - 19:00 • Veld 5B</p>
          </div>
        </div>
        <div className="train-card">
          <div className="train-day">DO</div>
          <div className="train-info">
            <p className="train-title">Teamtraining</p>
            <p className="train-time">17:45 - 19:00 • Veld 5A</p>
          </div>
        </div>
      </div>
      
      <div className="train-notice">
        ⏰ <strong>Uiterlijk 5 minuten van tevoren aanwezig!</strong>
      </div>
      
      <h3 className="section-title" style={{ marginTop: 20 }}>⚽ Techniektraining (vrijdag)</h3>
      
      <div className="train-card techniek">
        <div className="train-day techniek">VR</div>
        <div className="train-info">
          <p className="train-title techniek">Techniektraining</p>
          <p className="train-time">{techniekSettings.tijd} • {techniekSettings.veld}</p>
        </div>
      </div>
      
      <div className={`train-notice ${activeTechniek.length > 0 ? 'active' : 'inactive'}`}>
        {activeTechniek.length > 0 ? (
          <>✅ <strong>Actief</strong> - {activeTechniek.length} training(en) gepland</>
        ) : (
          <>⏸️ <strong>Nog niet actief</strong> - Start waarschijnlijk 27 februari</>
        )}
      </div>
      
      {techniekDates.length > 0 && (
        <div className="training-list" style={{ marginTop: 8 }}>
          {techniekDates.map(d => {
            const date = new Date(d);
            const isPast = d < TODAY;
            const formatted = date.toLocaleDateString('nl-NL', { weekday: 'short', day: 'numeric', month: 'short' });
            return (
              <div key={d} className={`train-card techniek ${isPast ? 'past' : ''}`}>
                <div className="train-day techniek">VR</div>
                <div className="train-info">
                  <p className="train-title techniek">Techniektraining</p>
                  <p className="train-time">{formatted} • {techniekSettings.tijd} • {techniekSettings.veld}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
      
      {editMode && (
        <>
          <button className="techniek-config-btn" onClick={() => setShowConfig(!showConfig)}>
            ⚙️ Techniektraining configureren
          </button>
          
          {showConfig && (
            <div className="techniek-config">
              <div className="config-inputs">
                <div className="config-field">
                  <label>Tijd</label>
                  <input 
                    type="text" 
                    value={localSettings.tijd}
                    onChange={(e) => setLocalSettings({ ...localSettings, tijd: e.target.value })}
                  />
                </div>
                <div className="config-field">
                  <label>Veld</label>
                  <input 
                    type="text" 
                    value={localSettings.veld}
                    onChange={(e) => setLocalSettings({ ...localSettings, veld: e.target.value })}
                  />
                </div>
              </div>
              
              <p className="config-label">Selecteer vrijdagen (max 8):</p>
              <div className="vrijdagen-grid">
                {vrijdagen.map(d => {
                  const date = new Date(d);
                  const formatted = date.toLocaleDateString('nl-NL', { day: 'numeric', month: 'short' });
                  const selected = localDates.includes(d);
                  return (
                    <button 
                      key={d} 
                      className={`vrijdag-btn ${selected ? 'selected' : ''}`}
                      onClick={() => toggleDate(d)}
                    >
                      {formatted}
                    </button>
                  );
                })}
              </div>
              
              <button className="save-techniek-btn" onClick={handleSave}>
                Opslaan
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default TrainingSchedule;
