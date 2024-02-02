import React, { Component } from "react";
import { ErrorMessage } from "../ErrorMessage";
import { TextInput } from "./components/TextInput";

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
    this.props.setStateMethod((prevState) => ({
      ...prevState,
      inputState: {
        ...prevState.inputState,
        [name]: value,
      },
    }), this.populateDatalist);
  };

  populateDatalist = () => {
    const { allCities, stateData:{inputState} } = this.props;

    const datalist = document.getElementById('cities');
    const filteredCities = allCities.filter(city =>
      city.toLowerCase().includes(inputState.city.toLowerCase())
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
    const value = e.target.value.trim();
    if (value !== '') {
      const lengths = [2, 2, 2, 1];
      const currentMaxLength = lengths[index];
      const nextRef = this.state.refs[index + 1];
      const prevRef = this.state.refs[index > 0 ? index - 1 : index];
      const shouldGoToNextRef = currentMaxLength === value.length;
      const shouldGoToPrevRef = value.length === 0;
      
      // control input focus
      if (shouldGoToNextRef) {
        if (nextRef !== undefined) {
          nextRef.current?.focus();
        }
      }

      //control input focus
      if (shouldGoToPrevRef) {
        if (prevRef !== undefined) {
          prevRef.current?.focus();
        }
      }
      
      this.setState(prevState => {
        // Create a new array by spreading the previous refs
        const newRefs = [...prevState.refs];
        
        newRefs[index].current.value = value.slice(0, currentMaxLength);
        return { refs: newRefs };
      });
      //console.log(this.state.refs[index].current?.value)
    }
/*     if (shouldGoToNextRef) {
      if (nextRef !== undefined) {
        nextRef.current?.focus();
      }
    }

    if (shouldGoToPrevRef) {
      if (prevRef !== undefined) {
        prevRef.current?.focus();
      }
    }

    const newState = this.state.phoneInputState.map((phoneInput, phoneInputIndex) => 
      index === phoneInputIndex ? e.target.value : phoneInput
    );

    this.setState({
      phoneInputState : newState,
    })

    switch (index) {
      case 0:
        if (index === 0 && !isInputLengthValid(e.target.value,2)) {
          this.addInputErrorValidate(e.target.name);
          this.phoneValidateErrors(true)
        } else {
          this.removeInputErrorValidate(e.target.name);
          this.phoneValidateErrors(false)
        } 
        break;
      case 1: 
        if (index === 1 && !isInputLengthValid(e.target.value,2)) {
          this.addInputErrorValidate(e.target.name);
          this.phoneValidateErrors(true)
        } else {
          this.removeInputErrorValidate(e.target.name);
          this.phoneValidateErrors(false)
        }   
        break;    
      case 2: 
        if (index === 2 && !isInputLengthValid(e.target.value,2)) {
          this.addInputErrorValidate(e.target.name);
          this.phoneValidateErrors(true)
        } else {
          this.removeInputErrorValidate(e.target.name);
          this.phoneValidateErrors(false)
        }   
        break; 
      case 3:
        if (index === 3 && !isInputLengthValid(e.target.value,1)) {
          this.addInputErrorValidate(e.target.name);
          this.phoneValidateErrors(true)
        } else {
          this.removeInputErrorValidate(e.target.name);
          this.phoneValidateErrors(false)
        }   
        break;   
      default:
        break;
    } */
  }

  render() {
    const { onSubmit } = this.props;
    const { city, email, firstName, lastName, phone } = this.props.stateData;

    return (
      <form onSubmit={onSubmit}>
        <u>
          <h3>User Information Form</h3>
        </u>
        {/* first name input */}
        <div className="input-wrap">
          <TextInput 
            label="First Name"
            value={firstName}
            inputProps={{
              placeholder:"First Name",
              name: "firstName",
              onChange: this.handleChange
            }}
          />
        </div>
        <ErrorMessage message={firstNameErrorMessage} show={true} />

        {/* last name input */}
        <div className="input-wrap">
          <TextInput 
            label="Last Name"
            value={lastName}
            inputProps={{
              placeholder:"Last Name",
              name: "lastName",
              onChange: this.handleChange}
            }
          />
        </div>
        <ErrorMessage message={lastNameErrorMessage} show={true} />

        {/* Email Input */}
        <div className="input-wrap">
          <TextInput 
            label="Email"
            value={email}
            inputProps={{
              placeholder:"Email",
              name: "email",
              onChange: this.handleChange}
            }
          />
        </div>
        <ErrorMessage message={emailErrorMessage} show={true} />

        {/* City Input */}
        <div className="input-wrap">
          <TextInput 
            label="City"
            value={city}
            inputProps={{
              placeholder:"Hobbiton",
              name: "city",
              list: "cities",
              onChange: (e) => {
                this.handleChange(e);
                this.populateDatalist();
              },
            }}
          />
          <datalist id="cities" />
        </div>
        <ErrorMessage message={cityErrorMessage} show={true} />

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

        <ErrorMessage message={phoneNumberErrorMessage} show={true} />

        <input 
          type="submit" 
          value="Submit" 
        />
      </form>
    );
  }
}
