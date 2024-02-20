import React, { useState } from "react";
import { ProfileInformation } from "../ProfileInformation";
import { FunctionalForm } from "./FunctionalForm";
import { isEmailValid, isInputLengthValid, isCityValid, isPhoneValid } from "../utils/validations";
import { allCities } from "../utils/all-cities"

export const FunctionalApp = () => {
  const [state, setState] = useState({
    isFormSubmitted: false,
    city: '',
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    hasInputError: [],
    showProfileInformation: false,
  });

  const updateState = (key, value) => {
    validateInput(key, value);
    setState((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };


  const onSubmit = (e) => {
    e.preventDefault()
    validateFormSubmit(state);
    setState((prevState) => ({
      ...prevState,
      isFormSubmitted: true,
      showProfileInformation: prevState.hasInputError?.length === 0 
    }));
  };

  const addError = (key) => {
    setState((prevState) => {
      if (!prevState.hasInputError?.includes(key)) {
        return {
          ...prevState,
          hasInputError: [...prevState.hasInputError, key],
        };
      }
      return prevState;
    });
  };

  const removeError = (key) => {
    setState((prevState) => {
      const filteredErrors = prevState.hasInputError?.filter((item) => item !== key);
      if (filteredErrors !== undefined && filteredErrors.length !== prevState.hasInputError?.length) {
        return {
          ...prevState,
          hasInputError: filteredErrors,
        };
      }
      return prevState;
    });
  };

  const validateInput = (key, value) => {
    switch (key) {
      case 'firstName':
      case 'lastName':
        if (isInputLengthValid(value, 2)) {
          removeError(key);
        } else {
          addError(key);
        }
        break;
      case 'email':
        if (isEmailValid(value)) {
          removeError(key);
        } else {
          addError(key);
        }
        break;
      case 'city':
        if (isCityValid(allCities, value)) {
          removeError(key);
        } else {
          addError(key);
        }
        break;
      case 'phone':
        if (isPhoneValid(value)) {
          removeError(key);
        } else {
          addError(key);
        }
        break;
      default:
        break;
    }
  }

  const validateFormSubmit = (formInputs) => {
    if (formInputs && typeof formInputs === 'object') {
      Object.entries(formInputs).forEach(([key, value]) => {
        validateInput(key, value)
      });
    }
  }

  const { email, firstName, lastName, phone, city, showProfileInformation, hasInputError } = state;

  return (
    <>
      <h2>Functional</h2>
      <ProfileInformation
        userData={
          { email, firstName, lastName, phone, city, }
        }
        showProfileInformation={showProfileInformation}
      />
      <FunctionalForm state={state} updateState={updateState} onSubmit={onSubmit} hasInputError={hasInputError} />
    </>
  );
};
