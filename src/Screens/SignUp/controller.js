export const validatePhone = phone => {
  const replacedString = phone.replace(/\s/g, '');
  return !/[a-zA-Z]/.test(replacedString) && !/[^\d\-+]/.test(replacedString);
};
export const validateEmails = email => {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
};
