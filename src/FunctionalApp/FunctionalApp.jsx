import { useState } from "react";
import { ProfileInformation } from "../ProfileInformation";
import { FunctionalForm } from "./FunctionalForm";
import { allCities } from "../utils/all-cities";
import { isEmailValid, isCityValid, isPhoneValid } from '../utils/validations'

export const FunctionalApp = () => {

  const [isFormSubmitted, setIsFormSubmitted] = useState(null);
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
    phone: isPhoneValid(phone)
  }

  const updateState = (key, value) => {
    setFormInputValues(prevState => ({
      ...prevState,
      [key]: value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault()
    setIsFormSubmitted(true);
  };

  return (
    <>
      <h2>Functional</h2>
      {/* <ProfileInformation
        userData={
          { email, firstName, lastName, phone, city, }
        }
        showProfileInformation={showProfileInformation}
      /> */}
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
