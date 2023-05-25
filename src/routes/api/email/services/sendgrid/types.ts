export interface EmailAddress {
  email: string;
}

export interface Personalization {
  to: EmailAddress[];
  subject: string;
}

export interface From {
  email: string;
}

export interface Content {
  type: 'text/plain' | 'text/html';
  value: string;
}

export interface EmailRequest {
  personalizations: Personalization[],
  templateId: string,
  subject: string,
  from: From,
};

