/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { udpateState } from 'redux/actions/formActions';
import useGenericForm from 'hooks/useGenericForm';

export default function useContractForm(contractLevelStepRef) {
  const dispatch = useDispatch();
  const formReducerState = useSelector(state => state.formReducer);
  const {
    currentLevel,
    levels,
    subscriberState,
    errors,
    loadingPolicies,
    errorReference
  } = formReducerState;
  const { handleSubscriberFieldUpdate, handleSubscriberErrorFieldUpdate } = useGenericForm();

  useEffect(() => {
      if (currentLevel === 2 && levels.contract.show) {
          contractLevelStepRef.current?.scrollIntoView({ behavior: 'smooth' });
      }
  }, [
      currentLevel,
      subscriberState,
  ]);

  const handlePostCodeChange = (value) => {
    handleSubscriberFieldUpdate("postCode", value)
  }

  const handlePostCodeAddressChange = (value) => {
    handleSubscriberFieldUpdate("postCodeAddress", value)
  }

  const handleInsuranceDate = (value) => {
    console.log('value: ', value)
    handleSubscriberFieldUpdate("insuranceDate", value)
  }

  const handleContinue = () => {
    const { state, errorObj } = validateContractForm();
    console.log('error state: ', state)
    console.log('errorObj: ', errorObj)
    if (state) {
      dispatch(udpateState({
        ...formReducerState,
        currentLevel: formReducerState.currentLevel + 1,
        levels: {
          ...formReducerState.levels,
          contract: {
            ...formReducerState.levels.contract,
            completed: true,
            show: true,
            showViewCard: true
          },
          needs: {
            ...formReducerState.levels.needs,
            show: true
          }
        },
        errors: {
          ...formReducerState.errors,
          ...errorObj
        }
      }));
    }
  }

  const _handleRevertToFirstStep = () => {
    dispatch(udpateState({
      ...formReducerState,
      levels: {
        ...formReducerState.levels,
        contract: {
          ...formReducerState.levels.contract,
          completed: true,
          show: true,
          showViewCard: false
        },
        needs: {
          show: true,
          completed: false,
        },
      },
    }));
  }

  const _handlePostalCodeAndAddressChange = (postCode, postCodeAddress) => {
    debugger;
    dispatch(udpateState({
      ...formReducerState,
      subscriberState: {
        ...formReducerState.subscriberState,
        postCode: parseInt(postCode),
        postCodeAddress: `${postCode} - ${postCodeAddress}`,
        city: postCodeAddress
      }
    }));
  }

  const validateContractForm = () => {
    let errorObj = {
      postCode: null,
      currentlyInsured: null,
      insuranceDate: null
    };
    console.log('subscriberState: ', subscriberState)

    if (!subscriberState.postCode) {
      errorObj.postCode = "Obligatoire";
      errorReference.postalCodeRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else {
      errorObj.postCode = null;
    }
    if (!subscriberState.currentlyInsured) {
      errorObj.currentlyInsured = "Obligatoire";
    } else {
      errorObj.currentlyInsured = null;
    }
    if (!subscriberState.insuranceDate) {
      errorObj.insuranceDate = "Obligatoire";
    } else {
      errorObj.insuranceDate = null;
    }

    dispatch(udpateState({
      ...formReducerState,
      errors: {
        ...formReducerState.errors,
        ...errorObj
      }
    }));

    if (errorObj.postCode || errorObj.currentlyInsured || errorObj.insuranceDate) {
      return {
        state: false,
        errorObj
      };
    }
    return {
      state: true,
      errorObj
    };
  }

  return {
    // States
    currentLevel,
    levels,
    subscriberState,
    errors,
    loadingPolicies,
    errorReference,

    // Methods
    handleSubscriberFieldUpdate,
    handlePostCodeChange,
    handlePostCodeAddressChange,
    handleInsuranceDate,
    handleContinue,
    _handleRevertToFirstStep,
    _handlePostalCodeAndAddressChange
  }
}
