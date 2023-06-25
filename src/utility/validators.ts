import type { Email } from "../routes/api/email/services/sendgrid/types";


//TODO: add unit tests for this validator function
export const validateEmail = (email: Email): boolean => {
  const requiredFields = ['phone', 'email', 'firstName', 'lastName'];

  const testFields = (field: keyof Email): boolean => {
    return email[field] !== undefined &&
      email[field].length !== 0 &&
      email[field] !== null
  }
  const validateFields = requiredFields.every((field) => testFields(field as keyof Email));

  if (!validateFields) {
    return false;
  }

  const { phone, message } = email;

  const validatedPhone = validatePhone(phone);
  const validatedMessage = validateMessage(message); // should we validate the message

  return validatedPhone
}

const validatePhone = (phone: string): boolean => {
  const phoneNumeric = Number(phone);
  const phoneLength = phone.length;
  console.log(phoneLength, !isNaN(phoneNumeric))

  if ((phoneLength === 11 || phoneLength === 10) && !isNaN(phoneNumeric)) {
    return true
  }

  return false;
}

const validateMessage = (message: string): boolean => {
  if (message.length > 50) {
    return true;
  }

  return false;
}
