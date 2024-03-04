import { useState } from "react";
import { ErrorMessage } from "../ErrorMessage";
import { TextInput } from "./components/TextInput";
import { PhoneInput } from "./components/PhoneInput";
import { allCities } from "../utils/all-cities"
import { isEmailValid, isCityValid, isPhoneValid, validateLetterInput } from '../utils/validations'

const firstNameErrorMessage = "First name must be at least 2 characters long";
const lastNameErrorMessage = "Last name must be at least 2 characters long";
const emailErrorMessage = "Email is Invalid";
const cityErrorMessage = "State is Invalid";
const phoneNumberErrorMessage = "Invalid Phone Number";

export const FunctionalForm = ({setUser}) => {
  const [isFormSubmitted, setIsFormSubmitted] = useState(null);
  const [formInputValues, setFormInputValues ] = useState({
    city: '',
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
  });

  const { email, firstName, lastName, city } = formInputValues;
  const formInputValidate = {
    firstName: formInputValues?.firstName?.length > 2,
    lastName: formInputValues?.lastName?.length > 2,
    email: isEmailValid(formInputValues?.email),
    city: isCityValid(allCities, formInputValues?.city),
    phone: isPhoneValid(formInputValues?.phone),
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const isInputValid = formInputValidate?.firstName && formInputValidate?.lastName && formInputValidate?.email && formInputValidate?.city && formInputValidate?.phone;
    setIsFormSubmitted(true);
    if (!isInputValid) {
      alert('Bad data input');
      return
    }
    setUser(formInputValues);
  };

  const updateState = (key, value) => {
    setFormInputValues(prevState => ({
      ...prevState,
      [key]: value,
    }));
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    updateState(name, validateLetterInput(value));
  };

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
      <ErrorMessage message={firstNameErrorMessage} show={(isFormSubmitted && !formInputValidate.firstName)} />

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
      <ErrorMessage message={lastNameErrorMessage} show={(isFormSubmitted && !formInputValidate.lastName)} />

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
      <ErrorMessage message={emailErrorMessage} show={(isFormSubmitted && !formInputValidate.email)} />

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
      <ErrorMessage message={cityErrorMessage} show={(isFormSubmitted && !formInputValidate.city)} />

      <div className="input-wrap">
        <PhoneInput updateState={updateState} />
      </div>
      <ErrorMessage message={phoneNumberErrorMessage} show={(isFormSubmitted && !formInputValidate.phone)} />

      <input type="submit" value="Submit" onClick={onSubmit}/>
    </form>
  );
};
