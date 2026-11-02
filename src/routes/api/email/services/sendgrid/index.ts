import type { EmailRequest } from "./types";

import sendgrid from "@sendgrid/mail";
import dotenv from "dotenv";

dotenv.config();

// Configure once at startup instead of per request.
sendgrid.setApiKey(process.env.VITE_SENDGRID_API_KEY || "");

export class SendGrid {
  message: EmailRequest;

  constructor(msg: EmailRequest) {
    this.message = msg;
  }

  async sendEmail(): Promise<number> {
    const [response] = await sendgrid.send(this.message);
    return response.statusCode;
  }
}
