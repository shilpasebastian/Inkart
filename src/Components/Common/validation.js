export const validateEmail = email => {
  //const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  if (emailRegex.test(email)) {
    return true;
  } else {
    return false;
  }
};

export const validatePhoneNumber = phoneNumber => {
  const phoneNumberRegex = /^[0-9]{10}$/;
  if (phoneNumberRegex.test(phoneNumber)) {
    return true;
  } else {
    return false;
  }
};
