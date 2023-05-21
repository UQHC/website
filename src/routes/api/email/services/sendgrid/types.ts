type HttpMethod = 'POST' | 'GET' | 'PATCH' | 'DELETE'
type ContentType = "application/json"

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

export interface Request {
  method: HttpMethod,
  headers: {
    'Content-Type': ContentType,
    Authorization: string,
  },
  body: string,
};

export interface EmailData {
  personalizations: Personalization[],
  content: Content[],
  from: From,
};


export interface EmailDatas {
  personalizations: {
    to: { email: string }[];
    subject: string;
  }[];
  from: { email: string };
  content: {
    type: string;
    value: string;
  }[];
}
