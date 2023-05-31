import type { Email } from "../routes/api/email/services/sendgrid/types";

//TODO: add unit tests for this validator function
export const validateEmail = (email: Email): boolean => {
  const validateFields = Object.values(email).every(
    attribute => attribute !== undefined && attribute !== null && attribute
  );

  if (!validateFields) {
    return false;
  }

  const { phone, message } = email;

  const validatedPhone = validatePhone(phone);
  const validatedMessage = validateMessage(message);

  return validatedPhone && validatedMessage;
}

const validatePhone = (phone: string): boolean => {
  const phoneNumeric = Number(phone);
  const phoneLength = phone.length;

  if (phoneLength === 9 || phoneLength === 8 && isNaN(phoneNumeric)) {
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
