import { useState } from "react";
import { ProfileInformation } from "../ProfileInformation";
import { FunctionalForm } from "./FunctionalForm";
import { allCities } from "../utils/all-cities";
import { isEmailValid, isCityValid, isPhoneValid } from '../utils/validations'

export const FunctionalApp = () => {

  const [isFormSubmitted, setIsFormSubmitted] = useState(null);
  const [shouldShowProfileInfo, setShouldShowProfileInfo] = useState(false);
  const [formInputValues, setFormInputValues ] = useState({
    city: '',
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
  });

  const { email, firstName, lastName, phone, city } = formInputValues;

  const formInputValidate = {
    firstName: firstName?.length > 2,
    lastName: lastName?.length > 2,
    email: isEmailValid(email),
    city: isCityValid(allCities, city),
    phone: isPhoneValid(phone),
  }

  const updateState = (key, value) => {
    setFormInputValues(prevState => ({
      ...prevState,
      [key]: value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const isInputValid = formInputValidate.firstName && formInputValidate.lastName && formInputValidate.email && formInputValidate.city && formInputValidate.phone;
    if (!isInputValid) {
      alert('Bad data input');
    }
    setShouldShowProfileInfo(isInputValid || isFormSubmitted)
    setIsFormSubmitted(true);
  };

  return (
    <>
      <h2>Functional</h2>
      <ProfileInformation
        userData={
          shouldShowProfileInfo ? { email, firstName, lastName, phone, city, phone } : false
        }
      />
      <FunctionalForm 
        isFormSubmitted={isFormSubmitted} 
        formInputValues={formInputValues} 
        updateState={updateState} 
        onSubmit={onSubmit} 
        formInputValidate={formInputValidate}
      />
    </>
  );
};
