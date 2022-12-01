/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { udpateState } from 'redux/actions/formActions';
import MemberLevelStep1 from 'components/WizardLevels/Members/Step1';
import MemberLevelStep2 from 'components/WizardLevels/Members/Step2';
import { getMemberStepComponent } from 'shared/constants';
import useGenericForm from 'hooks/useGenericForm';
import { subscriptionForList } from 'shared/constants';
import { initialState as FormReducerState } from 'redux/reducers/formReducer'
import moment from 'moment';

export default function useMemberForm(memberLevelStep2Ref, memberLevelStep4ContinueBtn) {
  const dispatch = useDispatch();
  const formReducerState = useSelector(state => state.formReducer);
  const {
    currentLevel,
    levels,
    subscriberState,
    errors
  } = formReducerState;
  const { handleSubscriberFieldUpdate, handleSubscriberErrorFieldUpdate } = useGenericForm();

  // Level Members: Step 1 checking
  useEffect(() => {
    if (isFirstStepChanged()) {
      _handleFirstStepChange();
    }
  }, [
    currentLevel,
    subscriberState,
    levels.member.currentStep,
    levels.member.step2.show
  ]);
  useEffect(() => {
    if (currentLevel === 1 && levels.member.currentStep === 2 && levels.member.step2.show) {
      memberLevelStep2Ref.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [
    currentLevel,
    subscriberState,
    levels.member.currentStep,
    levels.member.step2.show
  ]);
  useEffect(() => {
    if (subscriberState.subscriptionFor) {
      console.log("subscriberState.subscriptionFor: ", subscriberState.subscriptionFor)
      const { hasPartner, hasChildren } = subscriptionForList.find((item, index) => item.title === subscriberState.subscriptionFor)

      let updatedState = {
        ...formReducerState,
        subscriberState: {
          ...formReducerState.subscriberState,
          hasPartner,
          hasChildren
        }
      };
      if (levels.member.completed) {
        updatedState = {
          ...updatedState,
          levels: {
            ...updatedState.levels,
            partner: {
              ...formReducerState.levels.partner,
              show: hasPartner,
              showFirstStep: hasPartner,
              showSecondStep: false,
              showViewCard: false
            },
            children: {
              ...formReducerState.levels.partner,
              show: hasChildren,
              showFirstStep: hasChildren,
              showSecondStep: false,
              showViewCard: false
            },
          },
          subscriberState: {
            ...formReducerState.subscriberState,
            children: {
              ...FormReducerState.subscriberState.children,
            },
            hasPartner: false,
            hasChildren: false,
            partnerGender: null,
            partnerBirthDate: null,
          }
        }
      }
      console.log('updatedState: ', updatedState)
      dispatch(udpateState(updatedState));
    }
  }, [
    subscriberState.subscriptionFor
  ]);

  // Level Members: Step 2 checking
  useEffect(() => {
    if (isSecondStepChanged() && levels.member.currentStep === 2) {
      handleMemberStepStateUpdate({
        // currentStep: 3,
        step2: {
          show: true,
          filled: true
        },
        step3: {
          show: true,
          filled: false
        }
      });
    }
  }, [
    currentLevel,
    subscriberState,
    levels.member.currentStep,
    levels.member.step3.show
  ]);

  // Level Members: Step 4 checking
  useEffect(() => {
    if (currentLevel === 1 && levels.member.currentStep === 4 && levels.member.step4.show && subscriberState.professionOrActivity) {
      memberLevelStep2Ref.current?.scrollIntoView({ behavior: 'smooth' });
      memberLevelStep4ContinueBtn.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [
    currentLevel,
    subscriberState.professionOrActivity,
    levels.member.currentStep,
    levels.member.step4.show
  ]);

  // State Update Helpers
  const getMemberCurrentStepComponent = () => {
    let step = levels.member.currentStep
    return (
      getMemberStepComponent(
        step,
        subscriberState,
        _handleSecondStepChange,
        memberLevelStep2Ref,
        handleSubscriberFieldUpdate,
        _hanldeDobInput,
        _handleDobContinue,
        errors,
        memberLevelStep4ContinueBtn,
        _handleProfessionContinue,
        _handleSocialContinue,
        _handleRevertToFirstStep
      )
    )
  }
  const handleMemberStepStateUpdate = (value) => {
    dispatch(udpateState({
      ...formReducerState,
      levels: {
        ...formReducerState.levels,
        member: {
          ...formReducerState.levels.member,
          ...value
        }
      }
    }))
  }
  const _handleFirstStepChange = () => {
    handleMemberStepStateUpdate({
      currentStep: 2,
      step1: {
        show: true,
        filled: true
      },
      step2: {
        show: true,
        filled: false
      }
    });
  }
  const _handleSecondStepChange = (name, title) => {
    dispatch(udpateState({
      ...formReducerState,
      levels: {
        ...formReducerState.levels,
        member: {
          ...formReducerState.levels.member,
          currentStep: 3
        }
      },
      subscriberState: {
        ...formReducerState.subscriberState,
        [name]: title
      }
    }));
  }
  const handleStepDecrement = (type) => {
    let currentStepValue = levels[type].currentStep;
    dispatch(udpateState({
      ...formReducerState,
      levels: {
        ...formReducerState.levels,
        [type]: {
          ...formReducerState.levels[type],
          currentStep: currentStepValue - 1,
          step2: {
            ...formReducerState.levels[type].step2,
            show: true,
          },
          step3: {
            ...formReducerState.levels[type].step3,
            show: false,
          }
        }
      }
    }));
  }
  const _hanldeDobInput = (e) => {
    handleSubscriberFieldUpdate("dateOfBirth", e.target.value)
  }
  const _handleDobContinue = () => {
    const error = validateDob();
    if (!error) {
      dispatch(udpateState({
        ...formReducerState,
        levels: {
          ...formReducerState.levels,
          member: {
            ...formReducerState.levels.member,
            currentStep: levels.member.currentStep + 1,
            step2: {
              ...formReducerState.levels.member.step2,
              show: true,
            },
            step3: {
              ...formReducerState.levels.member.step3,
              show: true,
            },
            step4: {
              ...formReducerState.levels.member.step3,
              show: true,
            }
          }
        },
        errors: {
          ...formReducerState.errors,
          dateOfBirth: error
        }
      }));
    }
  }
  const _handleProfessionContinue = () => {
    if (subscriberState.professionOrActivity) {
      dispatch(udpateState({
        ...formReducerState,
        levels: {
          ...formReducerState.levels,
          member: {
            ...formReducerState.levels.member,
            currentStep: levels.member.currentStep + 1,
            step2: {
              ...formReducerState.levels.member.step2,
              show: true,
            },
            step3: {
              ...formReducerState.levels.member.step3,
              show: true,
            },
            step4: {
              ...formReducerState.levels.member.step4,
              show: true,
            },
            step5: {
              ...formReducerState.levels.member.step5,
              show: true,
            }
          }
        },
      }));
    }
  }
  const _handleSocialContinue = () => {
    if (subscriberState.professionOrActivity) {
      dispatch(udpateState({
        ...formReducerState,
        currentLevel: formReducerState.currentLevel + 1,
        levels: {
          ...formReducerState.levels,
          member: {
            ...formReducerState.levels.member,
            currentStep: levels.member.currentStep + 1,
            completed: true,
            step2: {
              ...formReducerState.levels.member.step2,
              show: true,
            },
            step3: {
              ...formReducerState.levels.member.step3,
              show: true,
            },
            step4: {
              ...formReducerState.levels.member.step4,
              show: true,
            },
            step5: {
              ...formReducerState.levels.member.step5,
              show: true,
            },
            step6: {
              ...formReducerState.levels.member.step6,
              show: true,
            }
          },
          contract: {
            ...formReducerState.levels.contract,
            show: subscriberState.hasPartner || subscriberState.hasChildren ? false : true
          },
          partner: {
            ...formReducerState.levels.partner,
            show: subscriberState.hasPartner,
            showFirstStep: subscriberState.hasPartner,
          },
          children: {
            ...formReducerState.levels.children,
            show: subscriberState.hasChildren,
            showFirstStep: subscriberState.hasChildren
          },
        },
      }));
    }
  }
  const _handleRevertToFirstStep = () => {
    if (subscriberState.professionOrActivity) {
      dispatch(udpateState({
        ...formReducerState,
        levels: {
          ...formReducerState.levels,
          member: {
            ...formReducerState.levels.member,
            currentStep: 2,
          }
        },
      }));
    }
  }

  // Validation methods
  const validateDob = () => {
    let errorMsg = "Entrée invalide"
    if (!subscriberState.dateOfBirth || subscriberState.dateOfBirth.indexOf('_') > -1) {
      handleSubscriberErrorFieldUpdate("dateOfBirth", errorMsg);
      return errorMsg;
    }
    if (!moment(subscriberState.dateOfBirth, 'DD-MM-YYYY').isValid()) {
      handleSubscriberErrorFieldUpdate("dateOfBirth", errorMsg);
      return errorMsg;
    }

    const dobYear = moment(subscriberState.dateOfBirth).format("YYYY");
    const currentYear = moment(new Date()).format("YYYY");
    const yearDiff = currentYear - dobYear;

    errorMsg = "Désolé, vous devez être majeur pour souscrire à une mutuelle."
    if (yearDiff < 18) {
      handleSubscriberErrorFieldUpdate("dateOfBirth", errorMsg);
      return errorMsg;
    }

    errorMsg = null;
    handleSubscriberErrorFieldUpdate("dateOfBirth", errorMsg);
    return errorMsg;
  }

  // Helper Methods
  const isFirstStepChanged = () => currentLevel === 1 && levels.member.currentStep === 1 && subscriberState.subscriptionFor;
  const isSecondStepChanged = () => currentLevel === 1 && levels.member.step2.show && subscriberState.gender;
  const isMemberCurrentStepEqualsToValue = () => {
    return levels.member.currentStep > 2
  }

  return {
    // State
    currentLevel,
    levels,
    subscriberState,

    // Components
    MemberLevelStep1,
    MemberLevelStep2,

    // Methods
    handleSubscriberFieldUpdate,
    getMemberCurrentStepComponent,
    _hanldeDobInput,
    handleStepDecrement,
    isMemberCurrentStepEqualsToValue
  }
}
