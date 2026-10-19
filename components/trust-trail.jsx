'use client';

import { useEffect, useRef } from 'react';

export default function TrustTrail({ credentials }) {
  const viewportRef = useRef(null);

  useEffect(() => {
    const viewport = viewportRef.current;
    const group = viewport.querySelector('.trust-group');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const cleanups = [];
    let disposed = false;
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
    let animationFrame;

    const listen = (type, callback, options) => {
      viewport.addEventListener(type, callback, options);
      cleanups.push(() => viewport.removeEventListener(type, callback, options));
    };
    // A whole-group shift keeps either drag direction seamless in the middle copy.
    const wrap = value => groupWidth ? ((value - groupWidth / 2) % groupWidth + groupWidth) % groupWidth + groupWidth / 2 : 0;
    const writePosition = () => {
      viewport.scrollLeft = position;
      lastWritten = viewport.scrollLeft;
    };
    const measure = () => {
      if (disposed) return;
      const phase = groupWidth ? position / groupWidth : 1;
      groupWidth = group.getBoundingClientRect().width;
      position = reducedMotion.matches ? 0 : wrap(phase * groupWidth);
      viewport.tabIndex = reducedMotion.matches ? -1 : 0;
      writePosition();
    };
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(group);
    reducedMotion.addEventListener('change', measure);
    document.fonts.ready.then(measure);
    const intersectionObserver = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    intersectionObserver.observe(viewport);
    measure();

    listen('pointerenter', event => {
      if (event.pointerType === 'mouse') hovered = true;
    });
    listen('pointerleave', event => {
      if (event.pointerType === 'mouse') hovered = false;
    });
    listen('pointerdown', event => {
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
    listen('pointermove', event => {
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
    listen('pointerup', endInteraction);
    listen('pointercancel', endInteraction);
    listen('lostpointercapture', () => {
      dragPointer = null;
      touching = false;
      viewport.classList.remove('is-dragging');
    });
    listen('wheel', () => { holdUntil = performance.now() + 1400; }, { passive: true });
    listen('scroll', () => {
      if (reducedMotion.matches || Math.abs(viewport.scrollLeft - lastWritten) < .75) return;
      position = wrap(viewport.scrollLeft);
      holdUntil = performance.now() + 1400;
      if (Math.abs(position - viewport.scrollLeft) > .75) writePosition();
      else lastWritten = viewport.scrollLeft;
    }, { passive: true });
    listen('keydown', event => {
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
      animationFrame = requestAnimationFrame(animate);
    };
    animationFrame = requestAnimationFrame(animate);

    return () => {
      disposed = true;
      cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      reducedMotion.removeEventListener('change', measure);
      cleanups.forEach(cleanup => cleanup());
      if (dragPointer !== null && viewport.hasPointerCapture(dragPointer)) viewport.releasePointerCapture(dragPointer);
      viewport.classList.remove('is-dragging');
    };
  }, []);

  return (
    <aside className="trust-trail" aria-label="Terry's coaching credentials" data-trust-trail="">
      <div ref={viewportRef} className="trust-window" tabIndex={0} role="group" aria-label="Coaching credentials. Drag, swipe, or use the left and right arrow keys to explore.">
        <div className="trust-track">
          {[0, 1, 2].map(index => <ul className="trust-group" key={index} aria-hidden={index > 0 ? true : undefined}>{credentials.map(credential => <li key={credential}>{credential}</li>)}</ul>)}
        </div>
      </div>
    </aside>
  );
}
