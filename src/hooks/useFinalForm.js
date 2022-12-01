/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { udpateState, loadPolicies } from 'redux/actions/formActions';
import useGenericForm from 'hooks/useGenericForm';

export default function useFinalForm() {
  const dispatch = useDispatch();
  const formReducerState = useSelector(state => state.formReducer);
  const [termsCheckState, setTermsCheckState] = useState(false);
  let navigate = useNavigate();

  const handleFinalContinue = () => {
    console.log('loading policies...')
    dispatch(udpateState({
      ...formReducerState,
      loadingPolicies: true
    }))
    dispatch(loadPolicies(
      formReducerState.subscriberState,
      formReducerState,
      navigate,
      udpateState,
    ))
  }

  return {
    // States
    termsCheckState,
    
    // Methods
    setTermsCheckState,
    handleFinalContinue
  }
}
