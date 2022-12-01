import React from 'react'
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    udpateAdditionalFormState,
    udpateAdditionalFormChange,
    udpatePaymentFormState,
    toggleSubscriptionCompletionState,
    updateSubscriberSelectedOffer,
    toggleSubscriptionOfferReqState,
    updateSubscriberInfo,
    toggleUpdateSubscriberInfoLoader,
    handleFieldChange
} from 'redux/actions/subscriberFormActions';
import { useNavigate } from "react-router-dom";

export default function useSubscriptionForm() {
    const dispatch = useDispatch();
    const subscriptionFormReducerState = useSelector(state => state.subscriptionFormReducer);
    const {
        loading,
        selectedOfferReqLoader,
        subscriptionProgressLoader,
        subscriptionCompleted,
        currentForm,
        tabs,
        additionalFormState,
        paymentFormState,
        selectedOffer,
        referenceNumber
    } = subscriptionFormReducerState;
    const formReducerState = useSelector(state => state.formReducer);
    const { apiData } = formReducerState;
    let navigate = useNavigate();

    const _handleAdditionalFormSubmit = (state) => {
        const tabsTemp = [...tabs];
        tabsTemp[currentForm].completed = true;
        tabsTemp[currentForm].active = false;
        tabsTemp[currentForm + 1].active = true;

        dispatch(udpateAdditionalFormState(state, tabsTemp))
    };

    const _handleAdditionalStateChange = (name, value) => {
        dispatch(udpateAdditionalFormChange(name, value));
    };

    const _handlePaymentFormSubmit = (state) => {
        dispatch(udpatePaymentFormState(state))
    };

    const redirectToMainPage = (toggleState) => {
        dispatch(toggleSubscriptionCompletionState(toggleState));
    };

    const handleSelectOffer = (offerObj, toggleSelectedOfferModal) => {
        dispatch(toggleSubscriptionOfferReqState(true));
        dispatch(updateSubscriberSelectedOffer(apiData.subscriber._id, offerObj, toggleSelectedOfferModal));
    }

    const handleUpdateSubscriberState = (paymentState) => {
        dispatch(handleFieldChange('subscriptionProgressLoader', true))
        dispatch(toggleUpdateSubscriberInfoLoader(true));
        debugger;
        dispatch(updateSubscriberInfo(apiData.subscriber._id, additionalFormState, paymentState, redirectToMainPage));
    }

    const handleSubscriptionContinue = () => navigate("/subscription", { replace: true });

    const handleCompletion = () => {
        redirectToMainPage(false);
        navigate("/", { replace: true })
        handleFieldChange('subscriptionProgressLoader', false);
    };

    return {
        loading,
        selectedOfferReqLoader,
        subscriptionProgressLoader,
        subscriptionCompleted,
        currentForm,
        tabs,
        additionalFormState,
        paymentFormState,
        selectedOffer,
        referenceNumber,
        _handleAdditionalFormSubmit,
        _handleAdditionalStateChange,
        _handlePaymentFormSubmit,
        redirectToMainPage,
        handleSelectOffer,
        handleSubscriptionContinue,
        handleUpdateSubscriberState,
        handleCompletion
    }
}
