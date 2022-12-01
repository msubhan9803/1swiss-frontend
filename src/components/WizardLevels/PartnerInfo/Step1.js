import React from 'react'
import Subtitle from 'components/Subtitle';
import Card1 from 'components/Cards/Card1';
import { genderList } from 'shared/constants';

export default function Step1({ subscriberState, handlePartnerValues }) {
  return (
    <div className='my-10'>
      <Subtitle
        subtitle="Commençons par votre profil, vous êtes"
      />

      <div className='grid grid-cols-2'>
        {
          genderList.map((elem, index) => (
            <Card1
              key={index}
              name="partnerGender"
              selected={subscriberState.partnerGender}
              imgSrc={elem.imgSrc}
              title={elem.title}
              value={elem.value}
              {...elem}
              handleSubscriberFieldUpdate={handlePartnerValues}
            />
          ))
        }
      </div>
    </div>
  )
}