import { Component } from "react";
import { ClassForm } from "./ClassForm";
import { ProfileInformation } from "../ProfileInformation";
import { isEmailValid, isInputLengthValid, isCityValid, isPhoneValid } from "../utils/validations"
import { allCities } from "../utils/all-cities"

export class ClassApp extends Component {

  state = {
    user: null
  }

  setAppState = (newState) => {
    this.setState(newState);
  }

  render() {
    const { user } = this.state;
    return (
      <>
        <h2>Class</h2>
        <ProfileInformation
          userData={user}
        />
        <ClassForm 
          userStateData={this.state}
          setStateMethod={this.setAppState} 
        />
      </>
    );
  }
}
