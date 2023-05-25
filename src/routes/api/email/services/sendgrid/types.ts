export interface EmailRequest {
  to: string
  templateId: string,
  subject: string,
  from: From,
  dynamicTemplateData: Email,
};

export interface Email {
  email: string,
  firstName: string,
  lastName: string,
  message: string,
  phone: string,
};

interface From {
  email: string
}

