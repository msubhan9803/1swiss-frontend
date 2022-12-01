import React, { useRef } from 'react'
import useMemberForm from 'hooks/useMemberForm';
import Title from 'components/Title';
import Subtitle from 'components/Subtitle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default function Member({ memberLevelStep2Ref, memberLevelStep4ContinueBtn }) {
    const {
        subscriberState,
        MemberLevelStep1,
        handleSubscriberFieldUpdate,
        getMemberCurrentStepComponent,
        handleStepDecrement,
        isMemberCurrentStepEqualsToValue
    } = useMemberForm(
        memberLevelStep2Ref,
        memberLevelStep4ContinueBtn
    );

    return (
        <>
            <Title
                title="Adhérents"
            />
            <Subtitle
                subtitle="C'est parti pour trouver une mutuelle"
                color="text-blue-600"
            />

            <MemberLevelStep1
                state={subscriberState}
                handleSubscriberFieldUpdate={handleSubscriberFieldUpdate}
            />

            <div className='my-20'>
                {
                    isMemberCurrentStepEqualsToValue() && (
                        <FontAwesomeIcon
                            icon={faArrowLeft}
                            className='cursor-pointer'
                            onClick={() => handleStepDecrement("member")}
                        />
                    )
                }
                {getMemberCurrentStepComponent()}
            </div>

            <hr />
        </>
    )
}
