import React from 'react'
import Subtitle from 'components/Subtitle';
import Step1 from 'components/WizardLevels/Children/Step1';
import Step2 from 'components/WizardLevels/Children/Step2';
import Step3 from 'components/WizardLevels/Children/Step3';
import useChildrenInfo from 'hooks/useChildrenInfo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default function ChildrenInfo() {
  const {
    errors,
    childrenError,
    levels,
    subscriberState,
    isAllChildrensProffessionSame,
    handleNumOfChildren,
    handleSubscriberFieldUpdate,
    handleIsAllChildrenSame,
    handleContinue,
    handleChildrenDob,
    handleChildrenActivity,
    handleStepDecrement,
    isChildrenCurrentStepEqualsToValue,
    handleFinalContinue
  } = useChildrenInfo();

  return (
    <div className='my-20'>
      {
        isChildrenCurrentStepEqualsToValue() && (
          <FontAwesomeIcon
            icon={faArrowLeft}
            className='cursor-pointer'
            onClick={() => handleStepDecrement("children")}
          />
        )
      }

      {
        levels.children.showFirstStep && (
          <Step1
            handleNumOfChildren={handleNumOfChildren}
            numOfChildren={levels.children.NumOfChildren}
            isAllChildrensProffessionSame={isAllChildrensProffessionSame}
            handleIsAllChildrenSame={handleIsAllChildrenSame}
            handleContinue={handleContinue}
            errors={errors}
          />
        )
      }

      {
        levels.children.showSecondStep && (
          <Step2
            numOfChildren={levels.children.NumOfChildren}
            subscriberState={subscriberState}
            handleChildrenDob={handleChildrenDob}
            handleChildrenActivity={handleChildrenActivity}
            errors={errors}
            handleContinue={handleFinalContinue}
            childrenError={childrenError}
          />
        )
      }

      {
        levels.children.showViewCard && (
          <Step3
            state={levels}
            handleStepDecrement={() => handleStepDecrement("children")}
          />
        )
      }

      < hr />
    </div>
  )
}
