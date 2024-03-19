import React, { Component } from "react";
import { ErrorMessage } from "../ErrorMessage";
import { TextInput } from "./components/TextInput";
import { PhoneInput } from "./components/PhoneInput";
import { validateLetterInput, validateNumericInput } from "../utils/validations"
import { allCities } from "../utils/all-cities"

const firstNameErrorMessage = "First name must be at least 2 characters long";
const lastNameErrorMessage = "Last name must be at least 2 characters long";
const emailErrorMessage = "Email is Invalid";
const cityErrorMessage = "State is Invalid";
const phoneNumberErrorMessage = "Invalid Phone Number";

export class ClassForm extends Component {
  state = {
    city: "",
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
  }

  isFormSubmittedState = {
    isFormSubmitted: false
  }

  onChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      ...prevState,
      [name]: value,
    }), this.populateDatalist);
  };

  updatePhoneState = (value) => {
    this.setState({
      phone: value
    });
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

  formInputValidate = {
    firstName: this.state.firstName?.length > 2,
    lastName: this.state.lastName?.length > 2,
    email: 'value3',
    city: 'value3',
    phone: 'value3',
  };

  onSubmit = (e) => {
    e.preventDefault();
    
    console.log(this.state.firstName.length > 2)
    
    this.props.setStateMethod({
      user: this.state
    });
  }

  render() {

    const { firstName, lastName, email, city, phone } = this.state;
    const { isFormSubmitted } = this.isFormSubmittedState;

    return (
      <form onSubmit={this.onSubmit}>
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
          <PhoneInput updatePhoneState={this.updatePhoneState} />
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
