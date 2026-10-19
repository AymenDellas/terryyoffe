'use client';

import { useState } from 'react';
import { DisclosureIcon } from './icons';

export default function TestimonialsDisclosure({ children }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <details className="more-testimonials" onToggle={event => setExpanded(event.currentTarget.open)}>
      <summary><span>{expanded ? 'Show fewer testimonials' : 'Show all testimonials'}</span><DisclosureIcon /></summary>
      <div className="additional-testimonials">{children}</div>
    </details>
  );
}
