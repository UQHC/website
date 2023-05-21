import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import dotenv from 'dotenv';
import { SendGrid } from './services/sendgrid/index';
dotenv.config();

export const POST = (async ({ request }) => {
  // validate the values coming from the request
  // use sendgrid class to recieve and send the email
  const { emailRequest } = await request.json();

  const mail = new SendGrid(emailRequest)

  const response = await mail.sendemail();


  return json({ response });


  // return an success response using json like so: json(body: {status: 'success', code: 'statusCodeNum'})
}) satisfies RequestHandler;

const validateEmailReuqest = () => {
  // validate the email request
}
