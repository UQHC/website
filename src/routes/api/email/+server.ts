import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { SendGrid } from './services/sendgrid/index';
import { validateEmail } from '../../../utility/validators';

export const POST: RequestHandler = async ({ request }) => {
  try {
    const { emailRequest } = await request.json().catch(() => ({}));

    if (!emailRequest || !validateEmail(emailRequest.dynamicTemplateData)) {
      return json({ status: 'fail', error: 'Missing or invalid fields' }, { status: 400 });
    }

    await new SendGrid(emailRequest).sendEmail();
    return json({ status: 'success' }, { status: 200 });
  } catch (err) {
    console.error('Error sending email:', err);
    return json({ status: 'fail', error: 'Failed to send email' }, { status: 500 });
  }
};
