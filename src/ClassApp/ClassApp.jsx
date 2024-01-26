import { Component } from "react";
import { ClassForm } from "./ClassForm";
import { ProfileInformation } from "../ProfileInformation";

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
    this.validadeForm(this.state)
    this.setState(
      {isFormSubmitted: true}
    );
    console.log(this.state)
  }

  validadeForm = (formInputs) => {
    console.log(formInputs)
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
          isFormSubmitted={isFormSubmitted}
          onSubmit={this.onHandleSubmit}
          stateData={this.state}
          setStateMethod={this.setAppState}
        />
      </>
    );
  }
}
