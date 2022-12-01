import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import PoliciesLayout from 'layout/PoliciesLayout';
import PoliciesProfileCard from 'components/PoliciesProfileCard';
import OfferListComponent from 'components/OfferListComponent';
import useGenericForm from 'hooks/useGenericForm.js';
import PaginationFromUI from 'components/Pagination';
import OfferHeader from 'components/OfferHeader';
import OfferFilter from 'components/OfferFilter';

export default function Policies() {
    const { apiData, paginatedList, pageIndex, pageSize, sortBy, amountFrom, amountTo, totalRecords } = useSelector(state => state.formReducer);
    const { selectedOfferReqLoader } = useSelector(state => state.subscriptionFormReducer);
    const { subscriber, offers } = apiData;
    const { 
        scroreStats,
        loadScoreStat,
        _handleOfferPagination,
        _paginatedListHandler,
        handleAmountFromFilter,
        handleSortChange,
        handleAmountFiltering,
        handleToggleInfoState
    } = useGenericForm();

    useEffect(() => {
        loadScoreStat();
    }, []);

    useEffect(() => {
        _handleOfferPagination()
    }, [offers, pageSize, pageIndex, amountFrom, amountTo, sortBy]);

    return (
        <>
            <PoliciesLayout>
                <PoliciesProfileCard
                    subscriberInfo={subscriber}
                    offers={offers}
                />

                <hr />

                <OfferFilter
                    amountFrom={amountFrom}
                    amountTo={amountTo}
                    handleAmountFromFilter={handleAmountFromFilter}
                    handleSortChange={handleSortChange}
                />

                <OfferHeader />

                <OfferListComponent
                    selectedOfferReqLoader={selectedOfferReqLoader}
                    subscriberInfo={subscriber}
                    offers={paginatedList}
                    scroreStats={scroreStats}
                    handleToggleInfoState={handleToggleInfoState}
                />

                <PaginationFromUI
                    recordsCount={totalRecords}
                    pageIndex={pageIndex}
                    recordsPerPage={pageSize}
                    handler={_paginatedListHandler}
                    className="mt-3"
                />
            </PoliciesLayout>
        </>
    )
}
