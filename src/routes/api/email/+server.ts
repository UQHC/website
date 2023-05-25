import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { SendGrid } from './services/sendgrid/index';

export const POST = (async ({ request }) => {
  // TODO:validate the values coming from the request
  // use sendgrid class to recieve and send the email
  const { emailRequest } = await request.json();
  const mail = new SendGrid(emailRequest)
  const response = await mail.sendemail();

  console.log(response)

  return json({ response });

  // TODO: return an success response using json like so: json(body: {status: 'success', code: 'statusCodeNum'})


}) satisfies RequestHandler;

const validateEmailReuqest = () => {
  // TODO: validate the email request
}
