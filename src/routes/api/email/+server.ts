import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { SendGrid } from './services/sendgrid/index';
import { validateEmail } from '../../../utility/validators';

export const POST = (async ({ request }) => {
  const { emailRequest } = await request.json().catch(() => ({}));

  if (!emailRequest || !validateEmail(emailRequest.dynamicTemplateData)) {
    return json({ status: 'fail', error: 'Missing or invalid fields' }, { status: 400 });
  }

  try {
    await new SendGrid(emailRequest).sendEmail();
    return json({ status: 'success' });
  } catch (err) {
    console.error('Error sending email:', err);
    return json({ status: 'fail' }, { status: 500 });
  }
}) satisfies RequestHandler;
