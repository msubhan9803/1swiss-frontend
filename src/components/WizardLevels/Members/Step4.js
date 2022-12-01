import React, { useState } from 'react'
import Subtitle from 'components/Subtitle';
import Card1 from 'components/Cards/Card1';
import { professionList } from 'shared/constants';
import TextView from 'components/controls/TextView';
import TextView2 from 'components/controls/TextView2';

export default function Step4({
  state,
  _hanldeDobInput,
  _handleDobContinue,
  errors,
  handleSubscriberFieldUpdate,
  _handleProfessionContinue
}) {
  const [showAll, setShowAll] = useState(false);

  return (
    <>
      <Subtitle
        subtitle="Votre profession ou activité"
      />

      <div className='px-2 mt-4'>
        {
          !showAll ?
            professionList.slice(0, 4).map((elem, index) => (
              <TextView
                key={index}
                name="professionOrActivity"
                text={elem}
                selected={elem === state.professionOrActivity}
                handleSubscriberFieldUpdate={handleSubscriberFieldUpdate}
              />
            ))
            : professionList.map((elem, index) => (
              <TextView
                key={index}
                name="professionOrActivity"
                text={elem}
                selected={elem === state.professionOrActivity}
                handleSubscriberFieldUpdate={handleSubscriberFieldUpdate}
              />
            ))
        }
        {
          !showAll && (
            <TextView2
              key={Math.random()}
              text=" Autres professions..."
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
          onClick={_handleProfessionContinue}
          disabled={state.professionOrActivity === ""}
        >
          Continuer
        </button>
      </div>
    </>
  )
}