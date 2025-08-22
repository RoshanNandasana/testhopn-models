import React, { useState } from 'react';
import CompanyRegistrationForm from './CompanyRegistrationForm';
import CompanyTypeStep from './CompanyTypeStep';

const CompanyRegisterFlow = () => {
  const [step, setStep] = useState(1);

  return (
    <>
      {step === 1 && <CompanyRegistrationForm setStep={setStep} />}
      {step === 2 && <CompanyTypeStep setStep={setStep} />}
    </>
  );
};

export default CompanyRegisterFlow;
