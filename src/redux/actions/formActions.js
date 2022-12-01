/*
 src/actions/formAction.js
*/
import {
    SET_CURRENT_LEVEL,
    UPDATE_STATE,
    CLEAR_STATE,
    CLEAR_FORM_STATE,
    SET_SCORE_STATS,
    CLEAR_LOADING_STATE
} from "redux/types";
import axios from 'axios';
import moment from "moment";

export const setCurrentLevel = (value) => dispatch => {
    dispatch({
        type: SET_CURRENT_LEVEL,
        payload: value
    })
}

export const udpateState = (value) => dispatch => {
    dispatch({
        type: UPDATE_STATE,
        payload: value
    })
}

export const loadPolicies = (state, formReducerState, navigate, udpateState) => async dispatch => {
    let payload = {
        status: state.subscriptionFor,
        gender: state.gender,
        birthDate: moment(state.dateOfBirth, 'DD-MM-YYYY').format('MM-DD-YYYY'),
        activity: state.professionOrActivity,
        socialRegime: state.socialPlan,
        hasPartner: state.hasPartner,
        hasChildren: state.hasChildren,
        partnerGender: state.partnerGender,
        partnerBirthDate: state.partnerBirthDate ? moment(state.partnerBirthDate, 'DD-MM-YYYY').format('MM-DD-YYYY') : null,
        children: {
            child1: {
                birthDate: state.children.child1.birthDate ? moment(state.children.child1.birthDate, 'DD-MM-YYYY').format('MM-DD-YYYY') : null,
                activity: state.children.child1.activity
            },
            child2: {
                birthDate: state.children.child2.birthDate ? moment(state.children.child2.birthDate, 'DD-MM-YYYY').format('MM-DD-YYYY') : null,
                activity: state.children.child2.activity
            },
            child3: {
                birthDate: state.children.child3.birthDate ? moment(state.children.child3.birthDate, 'DD-MM-YYYY').format('MM-DD-YYYY') : null,
                activity: state.children.child3.activity
            },
            child4: {
                birthDate: state.children.child4.birthDate ? moment(state.children.child4.birthDate, 'DD-MM-YYYY').format('MM-DD-YYYY') : null,
                activity: state.children.child4.activity
            },
            child5: {
                birthDate: state.children.child5.birthDate ? moment(state.children.child5.birthDate, 'DD-MM-YYYY').format('MM-DD-YYYY') : null,
                activity: state.children.child5.activity
            },
            child6: {
                birthDate: state.children.child6.birthDate ? moment(state.children.child6.birthDate, 'DD-MM-YYYY').format('MM-DD-YYYY') : null,
                activity: state.children.child6.activity
            },
            child7: {
                birthDate: state.children.child7.birthDate ? moment(state.children.child7.birthDate, 'DD-MM-YYYY').format('MM-DD-YYYY') : null,
                activity: state.children.child7.activity
            },
            child8: {
                birthDate: state.children.child8.birthDate ? moment(state.children.child8.birthDate, 'DD-MM-YYYY').format('MM-DD-YYYY') : null,
                activity: state.children.child8.activity
            },
            child9: {
                birthDate: state.children.child9.birthDate ? moment(state.children.child9.birthDate, 'DD-MM-YYYY').format('MM-DD-YYYY') : null,
                activity: state.children.child9.activity
            },
        },
        warranties: {
            medicalCare: {
                level: state.medicalCare
            },
            dental: {
                level: state.dental
            },
            visual: {
                level: state.optical
            },
            hearing: {
                level: state.hearingAids
            },
            hospitalization: {
                level: state.hospitalisation
            }
        },
        firstName: state.firstName,
        lastName: state.lastName,
        email: state.email,
        phoneNumber: state.phoneNo,
        city: state.city,
        postalCode: state.postCode,
        insureDate: getFormattedDate(state.insuranceDate)
    }
    const res = await axios({
        url: `${process.env.REACT_APP_API_URL}/api/v1/health`,
        method: "POST",
        data: payload,
    });
    let updatedState = {
        ...formReducerState,
        loadingPolicies: false,
        apiData: {
            ...formReducerState.apiData,
            ...res.data.data
        }
    }
    dispatch(udpateState(updatedState))
    navigate("/policies", { replace: true });
    dispatch(getScoreStats())
}

const getFormattedDate = (date) => {
    let month = date.month.toString().length === 1 ? '0' + date.month.toString() : date.month.toString();
    let day = date.day.toString().length === 1 ? '0' + date.day.toString() : date.day.toString();
    let year = date.year.toString();

    return `${year}-${month}-${day}T00:00:00.000Z`
}

export const clearState = (value) => dispatch => {
    dispatch({
        type: CLEAR_STATE
    })
    dispatch({
        type: CLEAR_FORM_STATE
    })
}

export const getScoreStats = () => async dispatch => {
    const res = await axios(`${process.env.REACT_APP_API_URL}/api/v1/health/getAllScore`);

    dispatch({
        type: SET_SCORE_STATS,
        payload: res.data.data.scores
    })
}

export const clearLoadingState = () => dispatch => {
    dispatch({
        type: CLEAR_LOADING_STATE
    })
}