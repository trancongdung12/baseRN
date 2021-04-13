// validate fields
export const validateEmpty = field => {
  return field !== '';
};

// validate email
export const validateEmail = email => {
  const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
};

// validate phone number
export const validatePhone = phone => {
  // const regex = /^0(1\d{9}|8\d{8}|9\d{8})$/;
  const regex = /((09|03|07|08|05)+([0-9]{8})\b)$/;
  return regex.test(phone);
};

// validate name
export const validateName = name => {
  const regex = /^[^0-9 *&^$#@!(){}\[\]\\//]+[^0-9*&^$#@!(){}\[\]\\//]+$/;
  return regex.test(name);
};
