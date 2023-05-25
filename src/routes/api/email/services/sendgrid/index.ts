import type { EmailRequest } from './types';
import sendgrid from '@sendgrid/mail';
import dotenv from 'dotenv';
dotenv.config();

export class SendGrid {
  message: EmailRequest;
  Sendgrid: any;
  SENDGRID_API_KEY = process.env.VITE_SENDGRID_API_KEY || '';
  SENDGRID_API_URL = process.env.VITE_SENDGRID_API_URL || '';

  constructor(msg: EmailRequest) {
    // set up the api keys
    this.Sendgrid = sendgrid.setApiKey(this.SENDGRID_API_KEY);
    this.message = msg
  }

  async sendEmail() {
    try {
      const response = await this.Sendgrid.send(this.message);

      if (response.ok) {
        console.log('Email sent successfully');
      } else {
        console.error('Error sending email:', await response.text());
      }
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
}

