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
