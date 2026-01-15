import React from 'react';
import { TODAY, TODAY_SHORT, getNextMatch } from '../utils/helpers';

function DateBanner({ team }) {
  const next = getNextMatch(team.wedstrijden);
  
  return (
    <div className="date-banner">
      <span>🗓️ {TODAY_SHORT}</span>
      {next && (
        <span className="next"> • ⚽ Volgende: {next.datum} vs {next.tegenstander}</span>
      )}
    </div>
  );
}

export default DateBanner;
