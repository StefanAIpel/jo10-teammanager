import React from 'react';

function TeamSelector({ teams, currentTeam, onChange }) {
  return (
    <div className="team-selector">
      <div className="team-buttons">
        {Object.keys(teams).map(teamId => (
          <button
            key={teamId}
            className={`team-btn ${currentTeam === teamId ? 'active' : ''}`}
            onClick={() => onChange(teamId)}
          >
            {teams[teamId].naam}
          </button>
        ))}
      </div>
    </div>
  );
}

export default TeamSelector;
