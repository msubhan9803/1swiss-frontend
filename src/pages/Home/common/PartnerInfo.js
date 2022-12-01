import React from 'react'
import Subtitle from 'components/Subtitle';
import Step1 from 'components/WizardLevels/PartnerInfo/Step1';
import Step2 from 'components/WizardLevels/PartnerInfo/Step2';
import Step3 from 'components/WizardLevels/PartnerInfo/Step3';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import usePartnerForm from 'hooks/usePartnerForm.js';

export default function PartnerInfo() {
  const {
    levels,
    errors,
    formReducerState,
    subscriberState,
    handlePartnerValues,
    _handleDobContinue,
    _handleRevertToFirstStep,
    isMemberCurrentStepEqualsToValue,
    handleStepDecrement
  } = usePartnerForm();

  return (
    <div className='my-20'>
      {
        isMemberCurrentStepEqualsToValue() && (
          <FontAwesomeIcon
            icon={faArrowLeft}
            className='cursor-pointer'
            onClick={() => handleStepDecrement("partner")}
          />
        )
      }
      
      <Subtitle
        subtitle="Passons à votre conjoint(e), il/elle est"
      />

      {
        levels.partner.showFirstStep && (
          <Step1
            subscriberState={subscriberState}
            handlePartnerValues={handlePartnerValues}
          />
        )
      }

      {
        levels.partner.showSecondStep && (
          <Step2
            name="partnerBirthDate"
            state={subscriberState}
            _hanldeDobInput={handlePartnerValues}
            _handleDobContinue={_handleDobContinue}
            errors={errors.partnerBirthDate}
          />
        )
      }

      {
        levels.partner.showViewCard && (
          <Step3
            state={subscriberState}
            _handleRevertToFirstStep={_handleRevertToFirstStep}
          />
        )
      }

      <hr />
    </div>
  )
}