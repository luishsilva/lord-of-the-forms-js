import { Component } from "react";
import { ClassForm } from "./ClassForm";
import { ProfileInformation } from "../ProfileInformation";

export class ClassApp extends Component {

  state = {
    city: "",
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
  }

  setAppState = (newState) => {
    this.setState(newState);
  }

  onHandleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state)
  }

  render() {
    const { email, firstName, lastName, phone, city, } = this.state;
    
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
          stateData={this.state}
          setStateMethod={this.setAppState}
          onSubmit={this.onHandleSubmit}
        />
      </>
    );
  }
}
