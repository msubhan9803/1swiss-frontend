import React from 'react'
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Fuse from 'fuse.js'
import { udpateState, clearState, getScoreStats, clearLoadingState } from 'redux/actions/formActions';
import { paginate } from 'shared/helper.js';

export default function useGenericForm() {
    const dispatch = useDispatch();
    const formReducerState = useSelector(state => state.formReducer);
    const { subscriberState, scroreStats, apiData, amountFrom, sortBy, pageIndex, pageSize, amountTo, paginatedList } = formReducerState;
    const { subscriber, offers } = apiData;

    const handleSubscriberFieldUpdate = (name, value) => {
        dispatch(udpateState({
            ...formReducerState,
            subscriberState: {
                ...formReducerState.subscriberState,
                [name]: value
            }
        }))
    }

    const handleSubscriberErrorFieldUpdate = (name, value) => {
        dispatch(udpateState({
            ...formReducerState,
            errors: {
                ...formReducerState.errors,
                [name]: value
            }
        }))
    }

    const handleNeedsContinue = (state) => {
        setTimeout(() => {
            dispatch(udpateState({
                ...formReducerState,
                currentLevel: formReducerState.currentLevel + 1,
                levels: {
                    ...formReducerState.levels,
                    needs: {
                        ...formReducerState.levels.needs,
                        show: true,
                        completed: true,
                    },
                    contactInformation: {
                        ...formReducerState.levels.contactInformation,
                        show: true
                    }
                },
                subscriberState: {
                    ...formReducerState.subscriberState,
                    ...state
                }
            }));
        }, 1000)
    }

    const setupErrorReferences = (errorRef) => {
        dispatch(udpateState({
            ...formReducerState,
            errorReference: errorRef
        }));
    }

    const handleClearState = () => {
        dispatch(clearState())
    }

    const loadScoreStat = () => {
        dispatch(getScoreStats())
    }

    const goBackFromLoading = () => {
        dispatch(clearLoadingState())
    }

    const _paginatedListHandler = (pageIndex) => {
        dispatch(udpateState({
            ...formReducerState,
            pageIndex
        }))
    }

    const _handleOfferPagination = () => {
        if (amountFrom || amountTo) {
            const filteredList = offers.filter(offer => {
                if (amountFrom && !amountTo && amountFrom > 0 && offer.monthlyPrice >= amountFrom) {
                    return offer;
                }
                if (amountTo && !amountFrom && amountTo > 0 && offer.monthlyPrice >= amountTo) {
                    return offer;
                }
                if (amountTo && amountFrom && amountTo > 0 && amountFrom > 0) {
                    if (offer.monthlyPrice >= amountFrom && offer.monthlyPrice <= amountTo) {
                        return offer
                    }
                }
            })
            const paginatedList = paginate(getSortBy(filteredList), pageSize, pageIndex);
            dispatch(udpateState({
                ...formReducerState,
                paginatedList: paginatedList,
                totalRecords: filteredList.length
            }))
        } else {
            dispatch(udpateState({
                ...formReducerState,
                paginatedList: paginate(getSortBy(offers), pageSize, pageIndex),
                totalRecords: offers.length
            }))
        }
    }

    const handleAmountFromFilter = (e) => {
        dispatch(udpateState({
            ...formReducerState,
            [e.target.name]: parseFloat(e.target.value),
            pageIndex: 1
        }));
    }

    const handleSortChange = (value) => {
        dispatch(udpateState({
            ...formReducerState,
            sortBy: value
        }));
    }

    const getSortBy = (array) => {
        if (sortBy == 'asc') {
            return array.sort((a, b) => {return parseFloat(a.monthlyPrice) - parseFloat(b.monthlyPrice)});
        } else if (sortBy == 'desc') {
            return array.sort((a, b) => {return parseFloat(b.monthlyPrice) - parseFloat(a.monthlyPrice)});
        } else {
            return array;
        }
    };

    const handleToggleInfoState = (offerId) => {
        const updateOffersState = offers.map(offer => {
            if (offer._id == offerId) {
                const newOfferState = {
                    ...offer,
                    moreInfo: !offer.moreInfo
                };
                return newOfferState;
            }
            return offer;
        });

        dispatch(udpateState({
            ...formReducerState,
            apiData: {
                ...formReducerState.apiData,
                offers: updateOffersState
            }
        }))
    }

    return {
        subscriberState,
        scroreStats,
        handleSubscriberFieldUpdate,
        handleSubscriberErrorFieldUpdate,
        handleNeedsContinue,
        setupErrorReferences,
        handleClearState,
        loadScoreStat,
        goBackFromLoading,
        _handleOfferPagination,
        _paginatedListHandler,
        handleAmountFromFilter,
        handleSortChange,
        handleToggleInfoState
    }
}
