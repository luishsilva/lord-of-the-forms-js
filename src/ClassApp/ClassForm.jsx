import { Component } from "react";
import { ErrorMessage } from "../ErrorMessage";
import { TextInput } from "./components/TextInput";
import { SelectInput } from "./components/SelectInput";

const firstNameErrorMessage = "First name must be at least 2 characters long";
const lastNameErrorMessage = "Last name must be at least 2 characters long";
const emailErrorMessage = "Email is Invalid";
const cityErrorMessage = "State is Invalid";
const phoneNumberErrorMessage = "Invalid Phone Number";

export class ClassForm extends Component {
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

  render() {
    const { onSubmit } = this.props;
    const { city, email, firstName, lastName, phone } = this.props.stateData;

    return (
      <form onSubmit={onSubmit}>
        <u>
          <h3>User Information Form</h3>
        </u>
        {/* first name input */}
        <TextInput 
          label="First Name"
          value={firstName}
          inputProps={{
            placeholder:"First Name",
            name: "firstName",
            onChange: this.handleChange
          }}
        />
        <ErrorMessage message={firstNameErrorMessage} show={true} />

        {/* last name input */}
        <TextInput 
          label="Last Name"
          value={lastName}
          inputProps={{
            placeholder:"Last Name",
            name: "lastName",
            onChange: this.handleChange}
          }
        />
        <ErrorMessage message={lastNameErrorMessage} show={true} />

        {/* Email Input */}
        <TextInput 
          label="Email"
          value={email}
          inputProps={{
            placeholder:"Email",
            name: "email",
            onChange: this.handleChange}
          }
        />
        <ErrorMessage message={emailErrorMessage} show={true} />

        {/* City Input */}
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
        <ErrorMessage message={cityErrorMessage} show={true} />

        <div className="input-wrap">
          <label htmlFor="phone">Phone:</label>
          <div id="phone-input-wrap">
            <input type="text" id="phone-input-1" placeholder="55" />
            -
            <input type="text" id="phone-input-2" placeholder="55" />
            -
            <input type="text" id="phone-input-3" placeholder="55" />
            -
            <input type="text" id="phone-input-4" placeholder="5" />
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
