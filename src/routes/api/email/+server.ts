import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { SendGrid } from './services/sendgrid/index';
import { validateEmail } from '../../../utility/validators'

export const POST = (async ({ request }) => {
  try {
    const { emailRequest } = await request.json();
    const { dynamicTemplateData: email } = emailRequest;

    if (!validateEmail(email)) {
      throw new Error(errors.missingFields)
    }
    const mail = new SendGrid(emailRequest)
    const response = await mail.sendEmail();

    return json({
      response,
      status: 'success',
      code: 200
    });
  } catch (err) {
    //TODO: figure out what status code to return in the json
    console.log(err)

    return json({
      response: err,
      status: "fail",
      code: 401
    })
  }
}) satisfies RequestHandler;

const errors = {
  missingFields: "Missing Fields"
}
