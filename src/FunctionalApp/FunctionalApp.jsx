import React, { useState } from "react";
import { ProfileInformation } from "../ProfileInformation";
import { FunctionalForm } from "./FunctionalForm";

export const FunctionalApp = () => {
  const [state, setState] = useState({
    isFormSubmitted: false,
    city: '',
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    hasInputError: [],
    showProfileInformation: false,
  });

  return (
    <>
      <h2>Functional</h2>
      <ProfileInformation userData={null} />
      <FunctionalForm state={state} setState={setState} />
    </>
  );
};
