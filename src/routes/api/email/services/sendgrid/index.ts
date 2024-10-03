import type { EmailRequest } from "./types";
import sendgrid from "@sendgrid/mail";
import dotenv from "dotenv";
dotenv.config();

export class SendGrid {
  message: EmailRequest;
  dev = process.env.DEV;
  Sendgrid: any;
  SENDGRID_API_KEY = process.env.VITE_SENDGRID_API_KEY || "";
  SENDGRID_API_URL = process.env.VITE_SENDGRID_API_URL || "";

  constructor(msg: EmailRequest) {
    this.message = msg;

    if (this.dev) {
      this.Sendgrid = {};

      return;
    }

    this.Sendgrid = sendgrid.setApiKey(this.SENDGRID_API_KEY);
  }

  async sendEmail() {
    try {
      const [response] = await this.Sendgrid?.send(this.message);
      const { statusCode } = response;

      if (statusCode === 202) {
        console.log("Email sent successfully");
      } else {
        console.error("Error sending email:", response);
      }
    } catch (error) {
      console.error("Error sending email:", error);
    }
  }
}
