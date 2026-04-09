// Shared form submission handler for Terraplex Dealer Platform sites.
//
// Reads form-encoded body, validates a honeypot, sends an email via Resend,
// and 302-redirects back to the page with ?submitted=true (or ?error=...).
//
// Required env vars (set in Netlify site settings):
//   RESEND_API_KEY  — the dealer's Resend API key
//   RESEND_FROM     — sender address (e.g. "Pyro Ag <do-not-reply@beardedgingerdesigns.com>")
//   RESEND_TO       — notification recipient (the dealer's email)
//
// This file is managed by the platform. Do not edit by hand — re-run
// "Scaffold form handling" in the platform UI to refresh it.

export default async (req, _context) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  const formText = await req.text();
  const params = new URLSearchParams(formText);
  const fields = Object.fromEntries(params.entries());

  // Honeypot — bots happily fill any input. Real users never see this field.
  if (fields._gotcha && fields._gotcha.trim() !== '') {
    // Return success silently so the bot thinks it worked.
    return redirectBack(req, fields, { submitted: 'true' });
  }

  // Required env vars
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM;
  const to = process.env.RESEND_TO;
  if (!apiKey || !from || !to) {
    console.error('[submit] missing required env vars', {
      hasKey: !!apiKey, hasFrom: !!from, hasTo: !!to,
    });
    return redirectBack(req, fields, { error: 'config' });
  }

  // Build the email body from the submitted fields, skipping internal _* keys.
  const visibleFields = Object.entries(fields).filter(([k]) => !k.startsWith('_'));
  const submitterEmail = (fields.email || '').trim();
  const siteHost = new URL(req.url).host;
  const subject = `New form submission — ${siteHost}`;

  const textBody = [
    `New form submission from ${siteHost}`,
    '',
    ...visibleFields.map(([k, v]) => `${labelize(k)}: ${v}`),
    '',
    `Submitted: ${new Date().toISOString()}`,
  ].join('\n');

  const htmlBody = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #111;">
      <h2 style="margin: 0 0 12px;">New form submission</h2>
      <p style="margin: 0 0 16px; color: #666;">From <strong>${escapeHtml(siteHost)}</strong></p>
      <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
        ${visibleFields.map(([k, v]) => `
          <tr>
            <td style="padding: 8px 12px; border-bottom: 1px solid #eee; color: #666; font-weight: 600; vertical-align: top; width: 30%;">${escapeHtml(labelize(k))}</td>
            <td style="padding: 8px 12px; border-bottom: 1px solid #eee; white-space: pre-wrap;">${escapeHtml(v)}</td>
          </tr>
        `).join('')}
      </table>
      <p style="margin: 16px 0 0; color: #999; font-size: 12px;">
        Submitted: ${new Date().toISOString()}
      </p>
    </div>
  `;

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: submitterEmail || undefined,
        subject,
        text: textBody,
        html: htmlBody,
      }),
    });
    if (!r.ok) {
      const body = await r.text().catch(() => '');
      console.error('[submit] resend rejected', r.status, body.slice(0, 300));
      return redirectBack(req, fields, { error: 'send_failed' });
    }
  } catch (err) {
    console.error('[submit] resend fetch failed', err.message);
    return redirectBack(req, fields, { error: 'send_failed' });
  }

  return redirectBack(req, fields, { submitted: 'true' });
};

// Helpers ------------------------------------------------------------------

function redirectBack(req, fields, params) {
  // Use the form-supplied _redirect path if present, validated against the
  // request's own host so this can't be turned into an open redirect.
  const reqUrl = new URL(req.url);
  const wanted = (fields._redirect || '/').trim();
  let target;
  try {
    // Allow absolute URLs only if they match the request host.
    const candidate = new URL(wanted, reqUrl.origin);
    if (candidate.origin !== reqUrl.origin) {
      target = new URL('/', reqUrl.origin);
    } else {
      target = candidate;
    }
  } catch {
    target = new URL('/', reqUrl.origin);
  }
  for (const [k, v] of Object.entries(params)) target.searchParams.set(k, v);
  return new Response(null, {
    status: 302,
    headers: { Location: target.toString() },
  });
}

function labelize(key) {
  // Best-effort: snake_case / camelCase → Title Case.
  return key
    .replace(/[_-]+/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/\b\w/g, c => c.toUpperCase())
    .trim();
}

function escapeHtml(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
