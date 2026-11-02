import type { EmailRequest } from "./types";
import sendgrid from "@sendgrid/mail";

// Configure once at module load time
sendgrid.setApiKey(process.env.SENDGRID_API_KEY || "");

export class SendGrid {
  message: EmailRequest;

  constructor(msg: EmailRequest) {
    this.message = msg;
  }

  async sendEmail(): Promise<void> {
    const [response] = await sendgrid.send(this.message);
    if (response.statusCode !== 202) {
      throw new Error(`SendGrid returned ${response.statusCode}`);
    }
  }
}
