import React, { useState } from 'react';
import CompanyRegistrationForm from './CompanyRegistrationForm';
import CompanyTypeStep from './CompanyTypeStep';
import CompanyAddressStep from './CompanyAddressStep';
import CompanyContactStep from './CompanyContactStep';

const CompanyRegisterFlow = () => {
  const [step, setStep] = useState(1);

  return (
    <>
      {step === 1 && <CompanyRegistrationForm setStep={setStep} />}
      {step === 2 && <CompanyTypeStep setStep={setStep} />}
      {step === 3 && <CompanyAddressStep setStep={setStep} />}
      {step === 4 && <CompanyContactStep setStep={setStep} />}
    </>
  );
};

export default CompanyRegisterFlow;
