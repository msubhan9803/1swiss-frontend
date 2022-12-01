import {
    UPDATE_ADDITIONAL_FORM_STATE,
    UPDATE_ADDITIONAL_FIELD_STATE,
    UPDATE_PAYMENT_FORM_STATE,
    TOGGLE_SUBSCRIPTION_COMPLETION_STATE,
    UPDATE_SELECTED_OFFER_STATE,
    TOGGLE_SUBSCRIPTION_OFFER_REQ_STATE,
    FORM_INFO_SUCCESSFULL,
    FORMS_HANDLE_FIELD_CHANGE
} from "redux/types";
import axios from 'axios';

export const updateSubscriberSelectedOffer = (userId, offerState, toggleSelectedOfferModal) => async dispatch => {
    debugger;
    const res = await axios({
        url: `${process.env.REACT_APP_API_URL}/api/v1/health/updateSubscriberSelectedOffer`,
        method: "PUT",
        data: {
            _id: userId,
            selectedOffer: offerState
        },
    });

    if (res.status == 200) {
        dispatch({
            type: UPDATE_SELECTED_OFFER_STATE,
            payload: res.data.data.subscriber
        })
    } else {
        dispatch(toggleSubscriptionOfferReqState(false));
        toggleSelectedOfferModal();
    }
}

export const updateSubscriberInfo = (userId, additionalInfo, paymentInfo, redirectToMainPage) => async dispatch => {
    const res = await axios({
        url: `${process.env.REACT_APP_API_URL}/api/v1/health`,
        method: "PUT",
        data: {
            _id: userId,
            additionalInfo: additionalInfo,
            paymentInfo: paymentInfo
        },
    });

    if (res.status == 200) {
        redirectToMainPage(true)
    }
}

export const udpateAdditionalFormState = (value, tabsTemp) => dispatch => {
    dispatch({
        type: UPDATE_ADDITIONAL_FORM_STATE,
        payload: { value, tabsTemp }
    })
}

export const udpatePaymentFormState = (value) => dispatch => {
    dispatch({
        type: UPDATE_PAYMENT_FORM_STATE,
        payload: value
    })
}

export const udpateAdditionalFormChange = (name, value) => dispatch => {
    dispatch({
        type: UPDATE_ADDITIONAL_FIELD_STATE,
        payload: { name, value }
    })

    setTimeout(() => {
        dispatch({
            type: TOGGLE_SUBSCRIPTION_COMPLETION_STATE
        })
    }, [500])
}

export const handleFieldChange = (name, value) => dispatch => {
    debugger;
    dispatch({
        type: FORMS_HANDLE_FIELD_CHANGE,
        payload: { name, value }
    })
}

export const toggleSubscriptionCompletionState = (value) => dispatch => {
    dispatch({
        type: TOGGLE_SUBSCRIPTION_COMPLETION_STATE,
        payload: value
    })
}

export const toggleSubscriptionOfferReqState = (value) => dispatch => {
    dispatch({
        type: TOGGLE_SUBSCRIPTION_OFFER_REQ_STATE,
        payload: value
    })
}

export const toggleUpdateSubscriberInfoLoader = (value) => dispatch => {
    dispatch({
        type: TOGGLE_SUBSCRIPTION_OFFER_REQ_STATE,
        payload: value
    })
}