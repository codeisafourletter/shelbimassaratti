/* Local-only inquiry preparation. No storage, requests, or automatic sending. */
(function () {
  function formatInquiry(values) {
    const text = key => String(values[key] || '').trim();
    const name = text('artist'), city = text('city'), goal = text('goal');
    if (!name || !city || !goal) throw new Error('Add your artist name, city, and what help you need.');
    const links = text('music').split(/\r?\n/).map(line => line.trim()).filter(Boolean);
    if (!links.length || links.length > 3) throw new Error('Add one to three music links, one per line.');
    for (const link of links) {
      let url;
      try { url = new URL(link); } catch { throw new Error('Use a full https:// or http:// address for each music link.'); }
      if (!['https:', 'http:'].includes(url.protocol) || url.username || url.password) {
        throw new Error('Use public https:// or http:// music links without sign-in details.');
      }
    }
    const context = text('context');
    return `Hi Shelbi, I'm ${name} from ${city}.\n\nMy music:\n${links.join('\n')}\n\n${context ? `Current audience / shows: ${context}\n\n` : ''}What I'm working toward and where I need help:\n${goal}`;
  }
  if (typeof module !== 'undefined' && module.exports) module.exports = {formatInquiry};
  if (typeof document === 'undefined') return;
  const form = document.getElementById('inquiry-form');
  if (!form) return;
  const preview = document.getElementById('inquiry-preview');
  const output = document.getElementById('inquiry-message');
  const status = document.getElementById('inquiry-status');
  const copy = document.getElementById('inquiry-copy');
  const music = form.elements.namedItem('music');
  let revision = 0;
  form.hidden = false;
  document.getElementById('inquiry-tools').hidden = false;
  const clearPreview = () => {
    revision += 1;
    preview.hidden = true;
    output.value = '';
    status.textContent = '';
    music.setCustomValidity('');
  };
  form.addEventListener('input', clearPreview);
  form.addEventListener('reset', clearPreview);
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    try { output.value = formatInquiry(Object.fromEntries(new FormData(form))); }
    catch (error) {
      music.setCustomValidity(error.message);
      music.reportValidity();
      return;
    }
    preview.hidden = false;
    status.textContent = 'Your message is ready. Review it, then copy and send it on Instagram.';
    output.focus();
  });
  copy.addEventListener('click', async () => {
    const currentRevision = revision;
    try {
      await navigator.clipboard.writeText(output.value);
      if (currentRevision === revision) status.textContent = 'Copied. Open Instagram and paste your message to Plattinum Management.';
    } catch {
      if (currentRevision !== revision) return;
      output.focus();
      output.select();
      status.textContent = 'Copy is unavailable here. Your message is selected—use your device’s Copy command.';
    }
  });
})();
