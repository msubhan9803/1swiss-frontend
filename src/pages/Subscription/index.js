import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import PoliciesLayout from 'layout/PoliciesLayout';
import SelectedOfferSubscriptionCard from 'components/SelectedOfferSubscriptionCard';
import SubscriptionsSteps from 'components/SubscriptionsSteps';
import SubscriptionForms from 'components/SubscriptionForms';

export default function Policies() {
    const { apiData, paginatedList, pageIndex, pageSize, sortBy, amountFrom, amountTo, totalRecords } = useSelector(state => state.formReducer);
    const { selectedOffer } = useSelector(state => state.subscriptionFormReducer);
    const { subscriber, offers } = apiData;

    return (
        <>
            <PoliciesLayout>
                <SubscriptionsSteps />

                <SelectedOfferSubscriptionCard
                    subscriberInfo={subscriber}
                    offers={offers}
                    selectedOffer={selectedOffer}
                />

                <SubscriptionForms />
            </PoliciesLayout>
        </>
    )
}
