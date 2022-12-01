import React from 'react'
import Subtitle from 'components/Subtitle';
import Card1 from 'components/Cards/Card1';
import { genderList } from 'shared/constants';

export default function Step2({ state, handleSubscriberFieldUpdate }) {
  return (
    <div className='my-20'>
      <Subtitle
        subtitle="Commençons par votre profil, vous êtes"
      />

      <div className='grid grid-cols-2'>
        {
          genderList.map((elem, index) => (
            <Card1
              key={index}
              name="gender"
              selected={state.gender}
              imgSrc={elem.imgSrc}
              title={elem.title}
              value={elem.value}
              {...elem}
              handleSubscriberFieldUpdate={handleSubscriberFieldUpdate}
            />
          ))
        }
      </div>
    </div>
  )
}