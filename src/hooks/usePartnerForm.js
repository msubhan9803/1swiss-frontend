/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { udpateState } from 'redux/actions/formActions';

export default function usePartnerForm() {
    const dispatch = useDispatch();
    const formReducerState = useSelector(state => state.formReducer);
    const {
        levels,
        subscriberState,
        errors
    } = formReducerState;

    const handlePartnerValues = (name, value) => {
        dispatch(udpateState({
            ...formReducerState,
            levels: {
                ...formReducerState.levels,
                partner: {
                    ...formReducerState.levels.partner,
                    currentStep: levels.partner.currentStep + 1,
                    showFirstStep: false,
                    showSecondStep: true
                }
            },
            subscriberState: {
                ...formReducerState.subscriberState,
                [name]: value
            }
        }))
    }

    const _handleDobContinue = () => {
        dispatch(udpateState({
            ...formReducerState,
            levels: {
                ...formReducerState.levels,
                partner: {
                    ...formReducerState.levels.partner,
                    currentStep: levels.partner.currentStep + 1,
                    showFirstStep: false,
                    showSecondStep: false,
                    showViewCard: true
                },
                contract: {
                    ...formReducerState.levels.contract,
                    show: !subscriberState.hasChildren
                }
            }
        }))
    }

    const _handleRevertToFirstStep = () => {
        dispatch(udpateState({
            ...formReducerState,
            levels: {
                ...formReducerState.levels,
                partner: {
                    ...formReducerState.levels.partner,
                    currentStep: 1,
                    showFirstStep: true,
                    showSecondStep: false,
                    showViewCard: false
                }
            }
        }))
    }

    const isMemberCurrentStepEqualsToValue = () => {
        return levels.partner.currentStep > 2
    }

    const handleStepDecrement = (type) => {
      let currentStepValue = levels[type].currentStep;
        dispatch(udpateState({
            ...formReducerState,
            levels: {
                ...formReducerState.levels,
                partner: {
                    ...formReducerState.levels.partner,
                    currentStep: currentStepValue - 1,
                    showFirstStep: true,
                    showSecondStep: false,
                    showViewCard: false
                }
            }
        }))
    }

    return {
        levels,
        errors,
        formReducerState,
        subscriberState,
        handlePartnerValues,
        _handleDobContinue,
        _handleRevertToFirstStep,
        isMemberCurrentStepEqualsToValue,
        handleStepDecrement
    }
}
