import { Component } from "react";
import { ClassForm } from "./ClassForm";
import { ProfileInformation } from "../ProfileInformation";
import { isEmailValid, isInputLenghtValid, isCityValid, isPhoneValid } from "../utils/validations"
import { allCities } from "../utils/all-cities"

export class ClassApp extends Component {

  state = {
    isFormSubmitted: false,
    city: "",
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    hasInputError: []
  }

  setAppState = (newState) => {
    const key = Object.keys(newState)[0];
    const value = newState[key];
    this.validateInput(key,value)
    this.setState(newState);
  }

  onHandleSubmit = (e) => {
    e.preventDefault();
    this.validateFormSubmite(this.state)
    this.setState({
      isFormSubmitted: true
    });
  }

  addError = (key) => {
    this.setState((prevState) => {
      if (!prevState.hasInputError.includes(key)) {
        return {
          hasInputError: [...prevState.hasInputError, key],
        };
      }
      return null;
    });
  };

  removeError = (key) => {
    this.setState((prevState) => {
      const filteredErrors = prevState.hasInputError.filter((item) => item !== key);
      if (filteredErrors.length !== prevState.hasInputError.length) {
        return {
          hasInputError: filteredErrors,
        };
      }
      return null;
    });
  };

  validateInput = (key, value) => {
    switch (key) {
      case 'firstName':
      case 'lastName':
        if (isInputLenghtValid(value, 2)) {
          this.removeError(key);
        } else {
          this.addError(key);
        }
        break;
      case 'email':
        if (isEmailValid(value)) {
          this.removeError(key);
        } else {
          this.addError(key);
        }
        break;
      case 'city':
        if (isCityValid(allCities, value)) {
          this.removeError(key);
        } else {
          this.addError(key);
        }
        break;
      case 'phone':
        if (isPhoneValid(value)) {
          this.removeError(key);
        } else {
          this.addError(key);
        }
        break;
      default:
        break;
    }
  }

  validateFormSubmite = (formInputs) => {
    if (formInputs && typeof formInputs === 'object') {
      Object.entries(formInputs).forEach(([key, value]) => {
        this.validateInput(key, value)
      });
    }
  }

  render() {
    const { email, firstName, lastName, phone, city, isFormSubmitted } = this.state;

    return (
      <>
        <h2>Class</h2>
        {isFormSubmitted && this.state.hasInputError.length === 0 && <ProfileInformation
          userData={
            // toggle the following lines to change
            // null
            { email, firstName, lastName, phone, city, }
          }
        />}
        <ClassForm 
          allCities={allCities}
          onSubmit={this.onHandleSubmit}
          stateData={this.state}
          setStateMethod={this.setAppState}
          addError={this.addError}
          removeError={this.removeError}
        />
      </>
    );
  }
}
