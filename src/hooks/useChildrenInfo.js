/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { udpateState } from 'redux/actions/formActions';
import useGenericForm from 'hooks/useGenericForm';

export default function useChildrenInfo() {
    const dispatch = useDispatch();
    const formReducerState = useSelector(state => state.formReducer);
    const {
        levels,
        subscriberState,
        errors,
        childrenError
    } = formReducerState;
    const { isAllChildrensProffessionSame } = levels.children;
    const { handleSubscriberFieldUpdate, handleSubscriberErrorFieldUpdate } = useGenericForm();

    const handleNumOfChildren = (value) => {
        dispatch(udpateState({
            ...formReducerState,
            levels: {
                ...formReducerState.levels,
                children: {
                    ...formReducerState.levels.children,
                    NumOfChildren: value,
                    showFirstStep: true,
                    showSecondStep: false
                },
            }
        }))
    }

    const handleContinue = () => {
        if (!formReducerState.levels.children.NumOfChildren) {
            dispatch(udpateState({
                ...formReducerState,
                errors: {
                    ...formReducerState.errors,
                    NumOfChildren: "Veuillez sélectionner"
                }
            }))
        } else {
            dispatch(udpateState({
                ...formReducerState,
                levels: {
                    ...formReducerState.levels,
                    children: {
                        ...formReducerState.levels.children,
                        showFirstStep: false,
                        showSecondStep: true
                    },
                },
                errors: {
                    ...formReducerState.errors,
                    NumOfChildren: ""
                }
            }))
        }
    }

    const handleChildrenDob = (index, dateOfBirth) => {
        let childrenState = formReducerState.subscriberState.children[`child${index + 1}`];

        dispatch(udpateState({
            ...formReducerState,
            subscriberState: {
                ...formReducerState.subscriberState,
                children: {
                    ...formReducerState.subscriberState.children,
                    ["child" + (index + 1)]: {
                        ...childrenState,
                        birthDate: dateOfBirth
                    }
                }
            }
        }))
    }

    const handleChildrenActivity = (index, activity) => {
        let childrenState = formReducerState.subscriberState.children[`child${index + 1}`];

        dispatch(udpateState({
            ...formReducerState,
            subscriberState: {
                ...formReducerState.subscriberState,
                children: {
                    ...formReducerState.subscriberState.children,
                    ["child" + (index + 1)]: {
                        ...childrenState,
                        activity
                    }
                }
            }
        }))
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
                    showFirstStep: true,
                    showSecondStep: false,
                    showViewCard: false
                }
            }
        }));
    }

    const validateContractForm = () => {
        const numOfChildren = levels.children.NumOfChildren;

        let childrenErrorObj = {
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
        };
        console.log('subscriberState: ', subscriberState)

        for (let index = 0; index < [...Array(numOfChildren)].length; index++) {
            const childrenState = formReducerState.subscriberState.children[`child${index + 1}`];
            let errorMsg = "Entrée invalide"

            if (!childrenState.birthDate || childrenState.birthDate.indexOf('_') > -1) {
                childrenErrorObj[`child${index + 1}`].birthDate = errorMsg;
            } else if (!moment(childrenState.birthDate, 'DD-MM-YYYY').isValid()) {
                childrenErrorObj[`child${index + 1}`].birthDate = errorMsg;
            }
            if (!childrenState.activity) {
                childrenErrorObj[`child${index + 1}`].activity = errorMsg;
            }
        }

        console.log('childrenErrorObj: ', childrenErrorObj)
        dispatch(udpateState({
            ...formReducerState,
            childrenError: {
                ...formReducerState.childrenError,
                ...childrenErrorObj
            }
        }));

        for (let index = 0; index < [...Array(numOfChildren)].length; index++) {
            const childrenErrorState = childrenErrorObj[`child${index + 1}`];
            if (childrenErrorState.birthDate || childrenErrorState.activity) {
                return false;
            }
        }

        return true;
    }

    const handleFinalContinue = () => {
        const error = validateContractForm();
        console.log('error: ', error)
        if (error) {
            dispatch(udpateState({
                ...formReducerState,
                levels: {
                    ...formReducerState.levels,
                    children: {
                        ...formReducerState.levels.children,
                        showFirstStep: false,
                        showSecondStep: false,
                        showViewCard: true
                    },
                    contract: {
                        ...formReducerState.levels.contract,
                        show: true
                    }
                }
            }))
        }
    }

    const isChildrenCurrentStepEqualsToValue = () => {
        return levels.member.currentStep > 2
    }

    return {
        errors,
        childrenError,
        levels,
        subscriberState,
        isAllChildrensProffessionSame,
        handleNumOfChildren,
        handleSubscriberFieldUpdate,
        handleSubscriberErrorFieldUpdate,
        handleContinue,
        handleChildrenDob,
        handleChildrenActivity,
        handleStepDecrement,
        isChildrenCurrentStepEqualsToValue,
        handleFinalContinue
    }
}
