import React, { Component } from "react";
import { ErrorMessage } from "../ErrorMessage";
import { TextInput } from "./components/TextInput";
import { allowOnlyLetters, allowOnlyNumbers } from "../utils/validations"

const firstNameErrorMessage = "First name must be at least 2 characters long";
const lastNameErrorMessage = "Last name must be at least 2 characters long";
const emailErrorMessage = "Email is Invalid";
const cityErrorMessage = "State is Invalid";
const phoneNumberErrorMessage = "Invalid Phone Number";

export class ClassForm extends Component {

  state = {
    refs: [React.createRef(), React.createRef(), React.createRef(), React.createRef(), ]
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.props.setStateMethod({
      [name]: allowOnlyLetters(value),
    }, this.populateDatalist);
  };

  populateDatalist = () => {
    const { allCities, stateData:{city} } = this.props;

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

  handlePhoneInputChange = (index) => (e) => {
  
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

    if (allowOnlyNumbers(e.target.value) ){
      if (shouldGoToNextRef) {
        if (nextRef !== undefined) {
          nextRef.current?.focus();
        }
      }
  
      if (shouldGoToPrevRef) {
        if (prevRef !== undefined) {
          prevRef.current?.focus();
        }
      }
    }
  }

  render() {
    const { onSubmit, isFormSubmitted } = this.props;
    const { city, email, firstName, lastName } = this.props.stateData;

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
              onChange: this.handleChange,
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
              onChange: this.handleChange,
              value:lastName
            }}
          />
        </div>
        <ErrorMessage message={lastNameErrorMessage} show={isFormSubmitted} />

        {/* Email Input */}
        <div className="input-wrap">
          <TextInput 
            label="Email"
            inputProps={{
              placeholder:"Email",
              name: "email",
              onChange: this.handleChange,
              value:email
            }}
          />
        </div>
        <ErrorMessage message={emailErrorMessage} show={isFormSubmitted} />

        {/* City Input */}
        <div className="input-wrap">
          <TextInput 
            label="City"
            inputProps={{
              placeholder:"Hobbiton",
              name: "city",
              list: "cities",
              onChange: (e) => {
                this.handleChange(e);
                this.populateDatalist();
              },
              value:city
            }}
          />
          <datalist id="cities" />
        </div>
        <ErrorMessage message={cityErrorMessage} show={isFormSubmitted} />

        <div className="input-wrap">
          <label htmlFor="phone">Phone:</label>
          <div id="phone-input-wrap">
            {/* Phone input 0 */}
            <TextInput 
              value={this.state.refs[0].current?.value}
              inputProps={{
                id: "phone-input-0",
                placeholder:"55",
                name: "phone-input-0",
                onChange: this.handlePhoneInputChange(0),
                ref: this.state.refs[0]
              }}
            />
            -
            {/* Phone input 1 */}
            <TextInput 
              value={this.state.refs[1].current?.value}
              inputProps={{
                id: "phone-input-1",
                placeholder:"55",
                name: "phone-input-1",
                onChange: this.handlePhoneInputChange(1),
                ref: this.state.refs[1]
              }}
            />
            {/* <input type="text" id="phone-input-2" placeholder="55" /> */}
            -
            {/* Phone input 2 */}
            <TextInput 
              value={this.state.refs[2].current?.value}
              inputProps={{
                id: "phone-input-2",
                placeholder:"55",
                name: "phone-input-2",
                onChange: this.handlePhoneInputChange(2),
                ref: this.state.refs[2]
              }}
            />
            {/* <input type="text" id="phone-input-3" placeholder="55" /> */}
            -
            <TextInput 
              value={this.state.refs[3].current?.value}
              inputProps={{
                id: "phone-input-3",
                placeholder:"55",
                name: "phone-input-3",
                onChange: this.handlePhoneInputChange(3),
                ref: this.state.refs[3]
              }}
            />
            {/* <input type="text" id="phone-input-4" placeholder="5" /> */}
          </div>
        </div>

        <ErrorMessage message={phoneNumberErrorMessage} show={isFormSubmitted} />

        <input 
          type="submit" 
          value="Submit" 
        />
      </form>
    );
  }
}
