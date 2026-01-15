import React, { useState } from 'react';
import { X } from 'lucide-react';

function EditModal({ match, team, onSave, onClose }) {
  const [formData, setFormData] = useState({ ...match });
  
  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };
  
  const handleArrayChange = (field, value) => {
    const arr = value.split(',').map(s => s.trim()).filter(s => s);
    setFormData({ ...formData, [field]: arr });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };
  
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>✏️ Bewerk wedstrijd</h3>
          <button className="modal-close" onClick={onClose}><X size={20} /></button>
        </div>
        
        <form onSubmit={handleSubmit} className="modal-body">
          <div className="form-row">
            <div className="form-group">
              <label>Tegenstander</label>
              <input 
                type="text" 
                value={formData.tegenstander}
                onChange={e => handleChange('tegenstander', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Type</label>
              <select 
                value={formData.type}
                onChange={e => handleChange('type', e.target.value)}
              >
                <option value="thuis">Thuis</option>
                <option value="uit">Uit</option>
                <option value="oefenwedstrijd">Oefenwedstrijd</option>
                <option value="vrij">Vrij</option>
                <option value="ntb">NTB</option>
              </select>
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Verzameltijd</label>
              <input 
                type="text" 
                value={formData.verzamelTijd || ''}
                onChange={e => handleChange('verzamelTijd', e.target.value)}
                placeholder="bijv. 09:30"
              />
            </div>
            <div className="form-group">
              <label>Aftrap</label>
              <input 
                type="text" 
                value={formData.aftrap || ''}
                onChange={e => handleChange('aftrap', e.target.value)}
                placeholder="bijv. 10:00"
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Veld</label>
              <input 
                type="text" 
                value={formData.veld || ''}
                onChange={e => handleChange('veld', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Kleedkamer</label>
              <input 
                type="text" 
                value={formData.kleedkamer || ''}
                onChange={e => handleChange('kleedkamer', e.target.value)}
              />
            </div>
          </div>
          
          <div className="form-group">
            <label>Verzamelplek</label>
            <input 
              type="text" 
              value={formData.verzamelPlek || ''}
              onChange={e => handleChange('verzamelPlek', e.target.value)}
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Aanvoerder</label>
              <select 
                value={formData.aanvoerder || ''}
                onChange={e => handleChange('aanvoerder', e.target.value)}
              >
                <option value="">Selecteer...</option>
                {team.spelers.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Spelbegeleider</label>
              <select 
                value={formData.spelbegeleider || ''}
                onChange={e => handleChange('spelbegeleider', e.target.value)}
              >
                <option value="">Selecteer...</option>
                {team.spelers.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="form-group">
            <label>Chauffeurs (komma-gescheiden)</label>
            <input 
              type="text" 
              value={(formData.chauffeurs || []).join(', ')}
              onChange={e => handleArrayChange('chauffeurs', e.target.value)}
            />
          </div>
          
          <div className="form-group">
            <label>Afwezig (komma-gescheiden)</label>
            <input 
              type="text" 
              value={(formData.afwezig || []).join(', ')}
              onChange={e => handleArrayChange('afwezig', e.target.value)}
            />
          </div>
          
          <div className="form-group">
            <label>Invallers (komma-gescheiden)</label>
            <input 
              type="text" 
              value={(formData.invallers || []).join(', ')}
              onChange={e => handleArrayChange('invallers', e.target.value)}
              placeholder="bijv. Tian, Mert"
            />
          </div>
          
          <div className="form-group">
            <label>Weer</label>
            <input 
              type="text" 
              value={formData.weer || ''}
              onChange={e => handleChange('weer', e.target.value)}
              placeholder="bijv. 8°C, bewolkt"
            />
          </div>
          
          <div className="form-group">
            <label>Extra info</label>
            <textarea 
              value={formData.info || ''}
              onChange={e => handleChange('info', e.target.value)}
              rows={2}
            />
          </div>
          
          <div className="form-group">
            <label>Uitslag</label>
            <input 
              type="text" 
              value={formData.uitslag || ''}
              onChange={e => handleChange('uitslag', e.target.value)}
              placeholder="bijv. 3-1"
            />
          </div>
          
          <div className="form-group">
            <label>Locatie URL (Google Maps)</label>
            <input 
              type="url" 
              value={formData.locatieUrl || ''}
              onChange={e => handleChange('locatieUrl', e.target.value)}
            />
          </div>
        </form>
        
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>Annuleren</button>
          <button className="btn btn-primary" onClick={handleSubmit}>Opslaan</button>
        </div>
      </div>
    </div>
  );
}

export default EditModal;
