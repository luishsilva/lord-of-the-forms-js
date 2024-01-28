import { Component } from "react";
import { ClassForm } from "./ClassForm";
import { ProfileInformation } from "../ProfileInformation";
import { isEmailValid, isInputLenghtValid } from "../utils/validations"
import { allCities } from "../utils/all-cities"

export class ClassApp extends Component {

  state = {
    isFormSubmitted: false,
    inputState: {
      city: "",
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
    }
  }

  setAppState = (newState) => {
    this.setState(newState);
  }

  onHandleSubmit = (e) => {
    e.preventDefault();
    this.validadeForm(this.state.inputState)
    this.setState(
      {isFormSubmitted: true}
    );
  }

  validadeForm = (formInputs) => {
    if(formInputs != null){
      Object.entries(formInputs).forEach(([key, value]) => {
        switch (key) {
          case 'firstName':
            if (isInputLenghtValid(value,2)) {
              console.log('first name valid')
            } else {
              console.log('first name not valid')
            }
            break;
          case 'lastName':
            if (isInputLenghtValid(value,2)) {
              console.log('last name valid')
            } else {
              console.log('last name not valid')
            }
            break;
          case 'email':
            if (isEmailValid(value)) {
              console.log('email valid')
            } else {
              console.log('email not valid')
            }
            break;
          default:
            break;
        }
      });
    }
  }

  render() {
    const { email, firstName, lastName, phone, city, } = this.state.inputState;
    const { isFormSubmitted } = this.state;
    
    return (
      <>
        <h2>Class</h2>
        <ProfileInformation
          userData={
            // toggle the following lines to change
            // null
            { email, firstName, lastName, phone, city, }
          }
        />
        <ClassForm 
          allCities={allCities}
          isFormSubmitted={isFormSubmitted}
          onSubmit={this.onHandleSubmit}
          stateData={this.state}
          setStateMethod={this.setAppState}
        />
      </>
    );
  }
}
