import React from 'react';

function AlertBanner({ message }) {
  return (
    <div className="alert-banner" dangerouslySetInnerHTML={{ __html: '🔔 ' + message }} />
  );
}

export default AlertBanner;
