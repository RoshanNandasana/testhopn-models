import React, { useState } from "react";
import CompanyRegistrationForm from "./CompanyRegistrationForm";
import IndividualRegistrationForm from "./IndividualRegistrationForm";

export default function RegistrationPage() {
  const [mode, setMode] = useState("company");

  function handleSwitch() {
    setMode((prevMode) => (prevMode === "company" ? "individual" : "company"));
  }

  return (
    <>
      {mode === "company" ? (
        <CompanyRegistrationForm onSwitch={handleSwitch} />
      ) : (
        <IndividualRegistrationForm onSwitch={handleSwitch} />
      )}
    </>
  );
}
