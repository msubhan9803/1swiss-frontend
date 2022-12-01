import { useRef } from 'react'
import {
    UPDATE_ADDITIONAL_FORM_STATE,
    CLEAR_FORM_STATE,
    SET_SUBSCRIPTION_FORM_CURRENT_LEVEL,
    CLEAR_LOADING_ADDITIONAL_FORM_STATE,
    UPDATE_ADDITIONAL_FIELD_STATE,
    UPDATE_PAYMENT_FORM_STATE,
    TOGGLE_SUBSCRIPTION_COMPLETION_STATE,
    UPDATE_SELECTED_OFFER_STATE,
    TOGGLE_SUBSCRIPTION_OFFER_REQ_STATE,
    FORMS_HANDLE_FIELD_CHANGE
} from 'redux/types';
import AdditionalForm from 'components/SubscriptionForms/AdditionalForm';
import PaymentForm from 'components/SubscriptionForms/PaymentForm';

export const initialState = {
    loading: false,
    selectedOfferReqLoader: true,
    subscriptionProgressLoader: false,
    subscriptionCompleted: false,
    currentForm: 0, // additional_form = 0, subscription_form = 1
    tabs: [
        {
            type: 'additional_information',
            label: 'Additional Information',
            completed: false,
            active: true,
            // component: <AdditionalForm />
        },
        {
            type: 'payment_information',
            label: 'Payment Information',
            completed: false,
            active: false,
            // component: <PaymentForm />
        },
    ],
    referenceNumber: null,
    selectedOffer: {
        id: '',
        provider: '',
        monthlyPrice: '',
        name: '',
        code: '',
        label: '',
    },
    additionalFormState: {
        address1: '',
        address2: '',
        nationality: '',
        country: '',
        departmentOfBirth: '',
        cityOfBirth: '',
        hasIndividualContractAlready: '',
        postalCode: '',
        city: '',
        familySituation: '',
        socialSecurityNumber: '',
    },
    paymentFormState: {
        accountOwner: "",
        ibanNumber: "",
        phoneNumber: "",
        periodicity: "",
        samplingDay: ""
    }
};

const subscriptionFormReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SUBSCRIPTION_FORM_CURRENT_LEVEL:
            return {
                ...state,
                currentLevel: action.payload
            }

        case UPDATE_ADDITIONAL_FORM_STATE:
            return {
                ...state,
                currentForm: state.currentForm + 1,
                additionalFormState: action.payload.value,
                tabs: action.payload.tabsTemp
            }

        case UPDATE_ADDITIONAL_FIELD_STATE:
            return {
                ...state,
                additionalFormState: {
                    ...state.additionalFormState,
                    [action.payload.name]: action.payload.value
                }
            }

        case UPDATE_PAYMENT_FORM_STATE:
            return {
                ...state,
                paymentFormState: action.payload
            }

        case CLEAR_FORM_STATE:
            return initialState

        case CLEAR_LOADING_ADDITIONAL_FORM_STATE:
            return {
                ...state,
                loading: false
            }

        case TOGGLE_SUBSCRIPTION_COMPLETION_STATE:
            return {
                ...state,
                subscriptionCompleted: action.payload,
                subscriptionProgressLoader: false
            }

        case TOGGLE_SUBSCRIPTION_OFFER_REQ_STATE:
            return {
                ...state,
                selectedOfferReqLoader: action.payload
            }

        case UPDATE_SELECTED_OFFER_STATE:
            return {
                ...state,
                selectedOffer: action.payload.selectedOffer,
                referenceNumber: action.payload.referenceNumber,
                selectedOfferReqLoader: false
            }

        case FORMS_HANDLE_FIELD_CHANGE:
            return {
                ...state,
                [action.payload.name]: action.payload.value
            }

        default:
            return state
    }
}

export default subscriptionFormReducer;