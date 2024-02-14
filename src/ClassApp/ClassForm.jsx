import React, { Component } from "react";
import { ErrorMessage } from "../ErrorMessage";
import { TextInput } from "./components/TextInput";
import { PhoneInput } from "./components/PhoneInput";
import { allowOnlyLetters, allowOnlyNumbers } from "../utils/validations"
import { allCities } from "../utils/all-cities"

const firstNameErrorMessage = "First name must be at least 2 characters long";
const lastNameErrorMessage = "Last name must be at least 2 characters long";
const emailErrorMessage = "Email is Invalid";
const cityErrorMessage = "State is Invalid";
const phoneNumberErrorMessage = "Invalid Phone Number";

export class ClassForm extends Component {

  state = {
    refs: [React.createRef(), React.createRef(), React.createRef(), React.createRef(),],
  }

  onChange = (e) => {
    const { name, value } = e.target;
    this.props.setStateMethod({
      [name]: allowOnlyLetters(value),
    }, this.populateDatalist);
  };

  populateDatalist = () => {
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

  onPhoneChange = (index) => (e) => {
    const inputType = e.nativeEvent.inputType;
    const value = allowOnlyNumbers(e.target.value);
    const lengths = [2, 2, 2, 1];
    const currentMaxLength = lengths[index];
    const nextRef = this.state.refs[index + 1];
    const prevRef = this.state.refs[index > 0 ? index - 1 : index];
    const shouldGoToNextRef = currentMaxLength === value.length;
    const shouldGoToPrevRef = value.length === 0;

    const newRefs = [...this.state.refs];
    newRefs[index].current.value = value.slice(0, currentMaxLength);
  
    // Update the state with the new array of refs
    this.setState({ refs: newRefs }, () => {
      // After updating state, get the phone value and call setStateMethod
      const phoneValue = this.state.refs.map((ref) => ref.current.value);
      this.props.setStateMethod({
        phone: phoneValue,
      });
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

  render() {
    const { onSubmit, } = this.props;
    const { city, email, firstName, lastName, isFormSubmitted, hasInputError } = this.props.stateData;

    return (
      <form onSubmit={onSubmit}>
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
              onChange: this.onChange,
              value: firstName
            }}
          />
        </div>
        <ErrorMessage message={firstNameErrorMessage} show={ (isFormSubmitted && hasInputError.includes('firstName'))} />

        {/* last name input */}
        <div className="input-wrap">
          <TextInput 
            label="Last Name"
            inputProps={{
              placeholder:"Last Name",
              name: "lastName",
              onChange: this.onChange,
              value:lastName
            }}
          />
        </div>
        <ErrorMessage message={lastNameErrorMessage} show={isFormSubmitted && hasInputError.includes('lastName')} />

        {/* Email Input */}
        <div className="input-wrap">
          <TextInput 
            label="Email"
            inputProps={{
              placeholder:"Email",
              name: "email",
              onChange: this.onChange,
              value:email
            }}
          />
        </div>
        <ErrorMessage message={emailErrorMessage} show={isFormSubmitted && hasInputError.includes('email')} />

        {/* City Input */}
        <div className="input-wrap">
          <TextInput 
            label="City"
            inputProps={{
              placeholder:"Hobbiton",
              name: "city",
              list: "cities",
              onChange: (e) => {
                this.onChange(e);
                this.populateDatalist();
              },
              value:city
            }}
          />
          <datalist id="cities" />
        </div>
        <ErrorMessage message={cityErrorMessage} show={isFormSubmitted && hasInputError.includes('city')} />

        <div className="input-wrap">
          <PhoneInput state={this.state} onPhoneChange={this.onPhoneChange} />
        </div>

        <ErrorMessage message={phoneNumberErrorMessage} show={isFormSubmitted && hasInputError.includes('phone')} />

        <input 
          type="submit" 
          value="Submit" 
        />
      </form>
    );
  }
}
