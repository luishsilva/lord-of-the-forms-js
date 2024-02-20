import React, { useRef, useState } from "react";
import { ErrorMessage } from "../ErrorMessage";
import { TextInput } from "./components/TextInput";
import { PhoneInput } from "./components/PhoneInput";
import { allowOnlyLetters , allowOnlyNumbers } from '../utils/validations'
import { allCities } from "../utils/all-cities"

const firstNameErrorMessage = "First name must be at least 2 characters long";
const lastNameErrorMessage = "Last name must be at least 2 characters long";
const emailErrorMessage = "Email is Invalid";
const cityErrorMessage = "State is Invalid";
const phoneNumberErrorMessage = "Invalid Phone Number";

export const FunctionalForm = ({ state, updateState, onSubmit }) => {
  const { firstName, lastName, email, city, isFormSubmitted, hasInputError } = state;
  const [stateRefs, setStateRefs] = useState({
    refs: [useRef(), useRef(), useRef(), useRef()]
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    updateState(name, allowOnlyLetters(value));
  };

  const onPhoneChange = (index) => (e) => {
    const inputType = e.nativeEvent.inputType;
    const value = allowOnlyNumbers(e.target.value);
    const lengths = [2, 2, 2, 1];
    const currentMaxLength = lengths[index];
    const nextRef = stateRefs.refs[index + 1];
    const prevRef = stateRefs.refs[index > 0 ? index - 1 : index];
    const shouldGoToNextRef = currentMaxLength === value.length;
    const shouldGoToPrevRef = value.length === 0;

    const newRefs = [...stateRefs.refs];
    newRefs[index].current.value = value.slice(0, currentMaxLength);
    setStateRefs(() => {
      return { refs: newRefs };
    });

    const phoneValue = stateRefs.refs.map((ref) => ref.current?.value);
    updateState('phone', phoneValue)

    if (shouldGoToNextRef) {
      if (nextRef !== undefined) {
        nextRef.current?.focus();
      }
    }

    if (shouldGoToPrevRef  && inputType === 'deleteContentBackward') {
      if (prevRef !== undefined) {
        prevRef.current?.focus();
      }
    }
  }

  const populateDatalist = () => {
    const datalist = document.getElementById('cities');
    const filteredCities = allCities.filter(city =>
      city.toLowerCase().includes(city.toLowerCase())
    );

    // Clear existing options
    datalist.innerHTML = '';

    // Populate datalist with filtered cities
    filteredCities.forEach(city => {
      const option = document.createElement('option');
      option.value = city;
      datalist.appendChild(option);
    });
  };

  return (
    <form>
      <u>
        <h3>User Information Form</h3>
      </u>

      {/* first name input */}
      <div className="input-wrap">
        <TextInput 
          label="First Name"
          inputProps={{
            placeholder:"First Name",
            name: "firstName",
            onChange: onChange,
            value: firstName
          }}
        />
      </div>
      <ErrorMessage message={firstNameErrorMessage} show={(isFormSubmitted && hasInputError.includes('firstName'))} />

      {/* last name input */}
      <div className="input-wrap">
        <TextInput 
          label="Last Name"
          inputProps={{
            placeholder:"Last Name",
            name: "lastName",
            onChange: onChange,
            value: lastName
          }}
        />
      </div> 
      <ErrorMessage message={lastNameErrorMessage} show={(isFormSubmitted && hasInputError.includes('lastName'))} />

      <div className="input-wrap">
        <TextInput 
          label="Email"
          inputProps={{
            placeholder:"exemplo@email.com",
            name: "email",
            onChange: onChange,
            value: email
          }}
        />
      </div> 
      <ErrorMessage message={emailErrorMessage} show={(isFormSubmitted && hasInputError.includes('email'))} />

      <div className="input-wrap">
        <TextInput 
          label="City"
          inputProps={{
            placeholder:"City",
            name: "city",
            onChange: (e) => {
              onChange(e),
              populateDatalist()
            },
            value: city,
            list: "cities",
          }}
        />
        <datalist id="cities" />
      </div> 
      <ErrorMessage message={cityErrorMessage} show={(isFormSubmitted && hasInputError.includes('city'))} />

      <div className="input-wrap">
        <PhoneInput onPhoneChange={onPhoneChange} state={stateRefs} />
      </div>
      <ErrorMessage message={phoneNumberErrorMessage} show={(isFormSubmitted && hasInputError.includes('phone'))} />

      <input type="submit" value="Submit" onClick={onSubmit}/>
    </form>
  );
};
