import React, { useRef, useState } from "react";
import { ErrorMessage } from "../ErrorMessage";
import { TextInput } from "./components/TextInput";
import { PhoneInput } from "./components/PhoneInput";
import { allowOnlyLetters , allowOnlyNumbers } from '../utils/validations'

const firstNameErrorMessage = "First name must be at least 2 characters long";
const lastNameErrorMessage = "Last name must be at least 2 characters long";
const emailErrorMessage = "Email is Invalid";
const cityErrorMessage = "State is Invalid";
const phoneNumberErrorMessage = "Invalid Phone Number";

export const FunctionalForm = ({ state, setState }) => {
  const { firstName, lastName, email, city, isFormSubmitted } = state;
  const [stateRefs, setStateRefs] = useState({
    refs: [useRef(), useRef(), useRef(), useRef()]
  });


  const onChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: allowOnlyLetters(value),
    }));
  }

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
    setState({
      phone: phoneValue,
    });

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
      <ErrorMessage message={firstNameErrorMessage} show={isFormSubmitted} />

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
      <ErrorMessage message={lastNameErrorMessage} show={isFormSubmitted} />

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
      <ErrorMessage message={emailErrorMessage} show={isFormSubmitted} />

      <div className="input-wrap">
        <TextInput 
          label="City"
          inputProps={{
            placeholder:"City",
            name: "city",
            onChange: onChange,
            value: city
          }}
        />
      </div>
      <ErrorMessage message={cityErrorMessage} show={isFormSubmitted} />

      <div className="input-wrap">
        <PhoneInput onPhoneChange={onPhoneChange} state={stateRefs} />
      </div>
      <ErrorMessage message={phoneNumberErrorMessage} show={isFormSubmitted} />

      <input type="submit" value="Submit" />
    </form>
  );
};
