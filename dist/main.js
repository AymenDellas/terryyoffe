const configuredUrl = window.TERRY_SITE?.consultationUrl?.trim();
let destination;
try {
  const parsed = new URL(configuredUrl);
  if (parsed.protocol === 'https:') destination = parsed.href;
} catch { /* An absent or invalid destination must never submit visitor data. */ }

document.querySelectorAll('[data-consultation]').forEach((control) => {
  if (destination) {
    const link = document.createElement('a');
    link.className = control.className;
    link.href = destination;
    link.innerHTML = control.innerHTML;
    control.replaceWith(link);
    return;
  }
  control.addEventListener('click', () => {
    const status = control.parentElement.querySelector('[role="status"]');
    status.hidden = false;
    status.textContent = 'Consultation booking is not connected yet.';
    control.setAttribute('aria-describedby', status.id);
  });
});

document.querySelectorAll('[data-trust-trail]').forEach((trail) => {
  const viewport = trail.querySelector('.trust-window');
  const group = trail.querySelector('.trust-group');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let groupWidth = 0;
  let position = 0;
  let lastWritten = 0;
  let hovered = viewport.matches(':hover');
  let touching = false;
  let dragPointer = null;
  let lastX = 0;
  let holdUntil = 0;
  let visible = false;
  let previousTime = 0;

  // Keep the viewport in the middle copy. Shifting by one whole group is
  // visually identical, including when a visitor drags across a loop boundary.
  const wrap = value => groupWidth ? ((value - groupWidth / 2) % groupWidth + groupWidth) % groupWidth + groupWidth / 2 : 0;
  const writePosition = () => {
    viewport.scrollLeft = position;
    lastWritten = viewport.scrollLeft;
  };
  const measure = () => {
    const phase = groupWidth ? position / groupWidth : 1;
    groupWidth = group.getBoundingClientRect().width;
    position = reducedMotion.matches ? 0 : wrap(phase * groupWidth);
    viewport.tabIndex = reducedMotion.matches ? -1 : 0;
    writePosition();
  };
  new ResizeObserver(measure).observe(group);
  reducedMotion.addEventListener('change', measure);
  document.fonts.ready.then(measure);
  new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }).observe(viewport);
  measure();

  viewport.addEventListener('pointerenter', event => {
    if (event.pointerType === 'mouse') hovered = true;
  });
  viewport.addEventListener('pointerleave', event => {
    if (event.pointerType === 'mouse') hovered = false;
  });
  viewport.addEventListener('pointerdown', event => {
    if (reducedMotion.matches) return;
    touching = true;
    holdUntil = performance.now() + 1400;
    if (event.pointerType !== 'mouse' || event.button !== 0) return;
    event.preventDefault();
    dragPointer = event.pointerId;
    lastX = event.clientX;
    viewport.setPointerCapture(event.pointerId);
    viewport.classList.add('is-dragging');
  });
  viewport.addEventListener('pointermove', event => {
    if (event.pointerId !== dragPointer) return;
    position = wrap(position - (event.clientX - lastX));
    lastX = event.clientX;
    writePosition();
  });
  const endInteraction = event => {
    touching = false;
    holdUntil = performance.now() + 1400;
    if (event.pointerId === dragPointer) {
      dragPointer = null;
      viewport.classList.remove('is-dragging');
      if (viewport.hasPointerCapture(event.pointerId)) viewport.releasePointerCapture(event.pointerId);
    }
  };
  viewport.addEventListener('pointerup', endInteraction);
  viewport.addEventListener('pointercancel', endInteraction);
  viewport.addEventListener('lostpointercapture', () => {
    dragPointer = null;
    touching = false;
    viewport.classList.remove('is-dragging');
  });
  viewport.addEventListener('wheel', () => { holdUntil = performance.now() + 1400; }, { passive: true });
  viewport.addEventListener('scroll', () => {
    if (reducedMotion.matches || Math.abs(viewport.scrollLeft - lastWritten) < .75) return;
    position = wrap(viewport.scrollLeft);
    holdUntil = performance.now() + 1400;
    if (Math.abs(position - viewport.scrollLeft) > .75) writePosition();
    else lastWritten = viewport.scrollLeft;
  }, { passive: true });
  viewport.addEventListener('keydown', event => {
    if (reducedMotion.matches || !['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    event.preventDefault();
    position = wrap(position + (event.key === 'ArrowRight' ? 100 : -100));
    writePosition();
  });

  const animate = time => {
    const elapsed = Math.min(time - previousTime, 50);
    previousTime = time;
    if (visible && !document.hidden && !reducedMotion.matches && !hovered && !touching && dragPointer === null && !viewport.matches(':focus-within') && time > holdUntil) {
      position = wrap(position - elapsed * .024);
      writePosition();
    }
    requestAnimationFrame(animate);
  };
  requestAnimationFrame(animate);
});

document.querySelectorAll('.more-testimonials').forEach(disclosure => {
  disclosure.addEventListener('toggle', () => {
    disclosure.querySelector('summary span').textContent = disclosure.open ? 'Show fewer testimonials' : 'Show all testimonials';
  });
});
