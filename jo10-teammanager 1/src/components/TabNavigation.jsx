import React from 'react';

const tabs = [
  { id: 'overzicht', label: 'Overzicht', icon: '🏠' },
  { id: 'wedstrijden', label: 'Schema', icon: '🏆' },
  { id: 'trainingen', label: 'Training', icon: '📅' },
  { id: 'afspraken', label: 'Afspraken', icon: '📋' },
  { id: 'alles', label: 'Totaal', icon: '📊' }
];

function TabNavigation({ activeTab, onChange }) {
  return (
    <nav className="tabs">
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={`tab ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => onChange(tab.id)}
        >
          <span className="tab-icon">{tab.icon}</span>
          <span className="tab-label">{tab.label}</span>
        </button>
      ))}
    </nav>
  );
}

export default TabNavigation;
