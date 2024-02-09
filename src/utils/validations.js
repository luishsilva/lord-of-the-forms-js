export function isEmailValid(emailAddress) {
  // eslint-disable-next-line no-useless-escape
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return !!emailAddress.match(regex);
}

export const isInputLenghtValid = (value, minLength) => value.length >= minLength;


export const allowOnlyLetters = (value) => value.replace(/\d/g, '');

export const allowOnlyNumbers = (value) => value.replace(/\D/g, '');

export const isCityValid = (allCities, value) =>  {
  const lowerCaseArrayItems = allCities.map((city) => city.toLowerCase());
  return lowerCaseArrayItems.includes(value.toLowerCase());
};

export const isPhoneValid = (value) => {
  if (value) {
    return value.join('').length === 7;
  }
  return false;
};