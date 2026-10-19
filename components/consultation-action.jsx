'use client';

import { useState } from 'react';
import { ArrowIcon } from './icons';

export default function ConsultationAction({ id, label, consultationUrl }) {
  const [showStatus, setShowStatus] = useState(false);
  let destination;
  try {
    const parsed = new URL(consultationUrl?.trim());
    if (parsed.protocol === 'https:') destination = parsed.href;
  } catch { /* Preserve the explicit unconnected state for absent or invalid URLs. */ }

  return (
    <div className="action-group">
      {destination ? (
        <a className="action" href={destination} data-consultation=""><span>{label}</span><ArrowIcon /></a>
      ) : (
        <button className="action" type="button" data-consultation="" onClick={() => setShowStatus(true)} aria-describedby={showStatus ? `booking-status-${id}` : undefined}><span>{label}</span><ArrowIcon /></button>
      )}
      <p className="booking-status" id={`booking-status-${id}`} role="status" hidden={!showStatus}>{showStatus ? 'Consultation booking is not connected yet.' : ''}</p>
    </div>
  );
}
