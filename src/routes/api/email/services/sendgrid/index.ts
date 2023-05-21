//import { VITE_SENDGRID_API_URL } from '$env/static/private';
import type { Request, EmailData } from './types';
import sendgrid from '@sendgrid/mail';
import dotenv from 'dotenv';
import fetch from 'node-fetch'
dotenv.config();


// use dotenv instead
//const { VITE_SENDGRID_API_URL, VITE_SENDGRID_API_KEY } = import.meta.env;

// const SENDGRID_API_KEY = process.env.VITE_SENDGRID_API_URL;
// const SENDGRID_API_KEY = process.env.VITE_SENDGRID_API_KEY;


export class SendGrid {
  message: EmailData;
  Sendgrid: any;
  SENDGRID_API_KEY = process.env.VITE_SENDGRID_API_KEY || '';
  SENDGRID_API_URL = process.env.VITE_SENDGRID_API_URL || '';

  constructor(msg: EmailData) {
    // set up the api keys
    /*
    this.request = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${this.SENDGRID_API_KEY}`,
      },
      body: JSON.stringify(msg),
    };
    */
    this.Sendgrid = sendgrid.setApiKey(this.SENDGRID_API_KEY);

    this.message = msg
  }

  async sendemail() {

    console.log("url", this.SENDGRID_API_URL)
    try {
      /**
      const response = await fetch(this.SENDGRID_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.SENDGRID_API_KEY}`,
        },
        body: JSON.stringify(this.message),
      });
      */

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

