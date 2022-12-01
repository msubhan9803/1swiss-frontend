import React, { useState } from 'react'
import Subtitle from 'components/Subtitle';
import Card1 from 'components/Cards/Card1';
import { socialPlanList } from 'shared/constants';
import TextView from 'components/controls/TextView';
import TextView2 from 'components/controls/TextView2';

export default function Step5({
  state,
  errors,
  handleSubscriberFieldUpdate,
  _handleSocialContinue
}) {
  const [showAll, setShowAll] = useState(false);

  return (
    <>
      <Subtitle
        subtitle="Votre régime Social"
      />

      <div className='px-2 mt-4'>
        {
          !showAll ?
            socialPlanList.slice(0, 2).map((elem, index) => (
              <TextView
                key={index}
                name="socialPlan"
                text={elem}
                selected={elem === state.socialPlan}
                handleSubscriberFieldUpdate={handleSubscriberFieldUpdate}
              />
            ))
            :
            socialPlanList.map((elem, index) => (
              <TextView
                key={index}
                name="socialPlan"
                text={elem}
                selected={elem === state.socialPlan}
                handleSubscriberFieldUpdate={handleSubscriberFieldUpdate}
              />
            ))
        }
        {
          !showAll && (
            <TextView2
              key={Math.random()}
              text="Autres régimes..."
              onClickHandler={() => setShowAll(!showAll)}
              className="justify-center"
            />
          )
        }
        <p className='text-red-400'>{errors}</p>
      </div>

      <div className='text-center my-4'>
        <button
          className="bg-blue-500 hover:bg-blue-700 disabled:bg-blue-300 text-white font-bold py-2 px-4 rounded"
          onClick={_handleSocialContinue}
          disabled={state.socialPlan === ""}
        >
          Continuer
        </button>
      </div>
    </>
  )
}