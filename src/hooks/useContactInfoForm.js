/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { udpateState } from 'redux/actions/formActions';
import useGenericForm from 'hooks/useGenericForm';

export default function useContactInfoForm(contactInfoLevelStepRef) {
  const dispatch = useDispatch();
  const formReducerState = useSelector(state => state.formReducer);
  const {
    currentLevel,
    levels,
    subscriberState,
    errors
  } = formReducerState;
  const { handleSubscriberFieldUpdate, handleSubscriberErrorFieldUpdate } = useGenericForm();

  useEffect(() => {
    if (currentLevel === 4 && levels.contactInformation.show) {
      contactInfoLevelStepRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [
    currentLevel,
    subscriberState,
  ]);

  const handleFirstNameChange = (e) => {
    handleSubscriberFieldUpdate("firstName", e.target.value)
  }

  const handleLastameChange = (e) => {
    handleSubscriberFieldUpdate("lastName", e.target.value)
  }

  const handleEmailChange = (e) => {
    handleSubscriberFieldUpdate("email", e.target.value)
  }

  const handleCityChange = (e) => {
    handleSubscriberFieldUpdate("city", e.target.value)
  }

  const handlePhoneNoChange = (e) => {
    handleSubscriberFieldUpdate("phoneNo", e.target.value)
  }

  const handleContinue = () => {
    const { state, errorObj } = validateContractForm();
    if (state) {
      dispatch(udpateState({
        ...formReducerState,
        currentLevel: formReducerState.currentLevel + 1,
        levels: {
          ...formReducerState.levels,
          contactInformation: {
            ...formReducerState.levels.contactInformation,
            show: true,
            completed: true,
            showViewCard: true
          },
          final: {
            show: true,
            completed: false
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
        contactInformation: {
          ...formReducerState.levels.contactInformation,
          show: true,
          completed: true,
          showViewCard: false
        }
      },
    }));
  }

  const validateContractForm = () => {
    let errorObj = {
      firstName: null,
      lastName: null,
      email: null,
      phoneNo: null
    };
    console.log('subscriberState: ', subscriberState)

    if (!subscriberState.firstName) {
      errorObj.firstName = "Obligatoire";
    } else {
      errorObj.firstName = null;
    }
    if (!subscriberState.lastName) {
      errorObj.lastName = "Obligatoire";
    } else {
      errorObj.lastName = null;
    }
    if (!subscriberState.email) {
      errorObj.email = "Obligatoire";
    } else {
      if (validateEmail(subscriberState.email)) {
        errorObj.email = null;
      } else {
        errorObj.email = "Email invalide";
      }
    }
    if (!subscriberState.phoneNo) {
      errorObj.phoneNo = "Obligatoire";
    } else {
      errorObj.phoneNo = null;
    }

    dispatch(udpateState({
      ...formReducerState,
      errors: {
        ...formReducerState.errors,
        ...errorObj
      }
    }));

    if (errorObj.firstName || errorObj.lastName || errorObj.email || errorObj.phoneNo) {
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

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  return {
    // States
    currentLevel,
    levels,
    subscriberState,
    errors,

    // Methods
    handleSubscriberFieldUpdate,
    handleFirstNameChange,
    handleLastameChange,
    handleEmailChange,
    handleCityChange,
    handlePhoneNoChange,
    handleContinue,
    _handleRevertToFirstStep
  }
}
