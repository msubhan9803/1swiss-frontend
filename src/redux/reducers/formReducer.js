/*
 src/reducers/simpleReducer.js
*/
import { useRef } from 'react'
import {
    SET_CURRENT_LEVEL,
    UPDATE_STATE,
    CLEAR_STATE,
    CLEAR_LOADING_STATE,
    SET_SCORE_STATS
} from 'redux/types'

export const initialState = {
    currentLevel: 1,
    levels: {
        member: {
            currentStep: 1,
            completed: false,
            step1: {
                show: true,
                filled: false
            },
            step2: {
                show: false,
                filled: false
            },
            step3: {
                show: false,
                filled: false
            },
            step4: {
                show: false,
                filled: false
            },
            step5: {
                show: false,
                filled: false
            },
            step6: {
                show: false,
                filled: false
            },
        },
        partner: {
            currentStep: 1,
            show: false,
            showFirstStep: false,
            showSecondStep: false,
            showViewCard: false
        },
        children: {
            currentStep: 1,
            show: false,
            showFirstStep: false,
            showSecondStep: false,
            showViewCard: false,
            NumOfChildren: null,
            isAllChildrensProffessionSame: null
        },
        contract: {
            show: false,
            completed: false,
            showViewCard: false
        },
        needs: {
            show: false,
            completed: false,
        },
        contactInformation: {
            show: false,
            completed: false,
            showViewCard: false
        },
        final: {
            show: false,
            completed: false
        }
    },
    subscriberState: {
        subscriptionFor: "",
        gender: "",
        dateOfBirth: null,
        professionOrActivity: "",
        postCodeAddress: null,
        socialPlan: "",
        hasPartner: false,
        hasChildren: false,
        partnerGender: null,
        partnerBirthDate: null,
        expiryMonth: null,
        children: {
            child1: {
                birthDate: null,
                activity: null
            },
            child2: {
                birthDate: null,
                activity: null
            },
            child3: {
                birthDate: null,
                activity: null
            },
            child4: {
                birthDate: null,
                activity: null
            },
            child5: {
                birthDate: null,
                activity: null
            },
            child6: {
                birthDate: null,
                activity: null
            },
            child7: {
                birthDate: null,
                activity: null
            },
            child8: {
                birthDate: null,
                activity: null
            },
            child9: {
                birthDate: null,
                activity: null
            }
        },
        postCode: "",
        currentlyInsured: null,
        insuranceDate: null,
        optical: 'min',
        dental: 'min',
        hospitalisation: 'min',
        medicalCare: 'min',
        hearingAids: 'min',
        firstName: "",
        lastName: "",
        email: "",
        city: "",
        phoneNo: "",
        offerRatesApproval: "",
        newsletter: ""
    },
    errors: {
        subscriptionFor: null,
        gender: null,
        dateOfBirth: null,
        professionOrActivity: null,
        socialPlan: null,
        postCode: null,
        postCodeAddress: null,
        currentlyInsured: null,
        insuranceDate: null,
        firstName: null,
        lastName: null,
        email: null,
        phoneNo: null,
        children: {
            child1: {
                birthDate: null,
                activity: null
            },
            child2: {
                birthDate: null,
                activity: null
            },
            child3: {
                birthDate: null,
                activity: null
            },
            child4: {
                birthDate: null,
                activity: null
            },
            child5: {
                birthDate: null,
                activity: null
            },
            child6: {
                birthDate: null,
                activity: null
            },
            child7: {
                birthDate: null,
                activity: null
            },
            child8: {
                birthDate: null,
                activity: null
            },
            child9: {
                birthDate: null,
                activity: null
            }
        },
        NumOfChildren: null
    },
    childrenError: {
        child1: {
            birthDate: null,
            activity: null
        },
        child2: {
            birthDate: null,
            activity: null
        },
        child3: {
            birthDate: null,
            activity: null
        },
        child4: {
            birthDate: null,
            activity: null
        },
        child5: {
            birthDate: null,
            activity: null
        },
        child6: {
            birthDate: null,
            activity: null
        },
        child7: {
            birthDate: null,
            activity: null
        },
        child8: {
            birthDate: null,
            activity: null
        },
        child9: {
            birthDate: null,
            activity: null
        }
    },
    loadingPolicies: false,
    apiData: {
        subscriber: {
            status: "",
            gender: "",
            birthDate: "",
            activity: "",
            socialRegime: "",
            hasPartner: false,
            warranties: {
                medicalCare: {
                    level: ""
                },
                dental: {
                    level: ""
                },
                visual: {
                    level: ""
                },
                hearing: {
                    level: ""
                },
                hospitalization: {
                    level: ""
                }
            },
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            city: "",
            postalCode: "",
            insureDate: "",
            _id: "",
            createdAt: "",
            updatedAt: ""
        },
        offers: []
    },
    errorReference: {
        postalCodeRef: null
    },
    scroreStats: null,
    pageIndex: 1,
    pageSize: 5,
    paginatedList: [],
    amountFrom: null,
    amountTo: null,
    totalRecords: null,
    sortBy: null
};

const formReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_LEVEL:
            return {
                ...state,
                currentLevel: action.payload
            }

        case UPDATE_STATE:
            return {
                ...state,
                ...action.payload
            }

        case CLEAR_STATE:
            return initialState

        case CLEAR_LOADING_STATE:
            return {
                ...state,
                loadingPolicies: false
            }

        case SET_SCORE_STATS:
            return {
                ...state,
                scroreStats: action.payload
            }

        default:
            return state
    }
}

export default formReducer;