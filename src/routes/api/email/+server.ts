import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { SendGrid } from './services/sendgrid/index';
import { validateEmail } from '../../../utility/validators';

export const POST = (async ({ request }) => {
  let emailRequest;
  try {
    ({ emailRequest } = await request.json());
  } catch {
    return json({ status: 'fail', code: 400, error: 'Invalid JSON' }, { status: 400 });
  }

  if (!emailRequest || !validateEmail(emailRequest.dynamicTemplateData)) {
    return json(
      { status: 'fail', code: 400, error: 'Missing or invalid fields' },
      { status: 400 }
    );
  }

  try {
    const mail = new SendGrid(emailRequest);
    const statusCode = await mail.sendEmail();

    if (statusCode === 202) {
      return json({ status: 'success', code: 200 });
    }
    return json(
      { status: 'fail', code: 502, error: `SendGrid returned ${statusCode}` },
      { status: 502 }
    );
  } catch (err) {
    console.error('Error sending email:', err);
    return json({ status: 'fail', code: 500, error: 'Failed to send email' }, { status: 500 });
  }
}) satisfies RequestHandler;
