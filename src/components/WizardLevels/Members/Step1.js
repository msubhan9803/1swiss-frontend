import React from 'react'
import Subtitle from 'components/Subtitle';
import RocketSvg from 'assets/images/rocket.svg'
import Card1 from 'components/Cards/Card1';
import { subscriptionForList } from 'shared/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClockRotateLeft } from '@fortawesome/free-solid-svg-icons';

export default function Step1({ state, handleSubscriberFieldUpdate }) {
  return (
    <div>
      <HeaderText />

      <Subtitle
        subtitle="Qui souhaitez-vous assurer?"
      />

      <div className='grid grid-cols-2'>
        {
          subscriptionForList.map((elem, index) => (
            <Card1
              key={index}
              name="subscriptionFor"
              selected={state.subscriptionFor}
              imgSrc={elem.imgSrc}
              title={elem.title}
              value={elem.title}
              {...elem}
              handleSubscriberFieldUpdate={handleSubscriberFieldUpdate}
            />
          ))
        }
      </div>
    </div>
  )
}

const HeaderText = () => {
  return (
    <div className='p-12'>
      <div className='flex flex-row justify-center p-4'>
        {/* <img src={RocketSvg} alt="logo-image" width="70" height="70" /> */}
        <FontAwesomeIcon icon={faClockRotateLeft} size="3x" className='text-blue-400 mr-2' />
      </div>
      <div className='flex flex-row text-center'>
        <p className='text-sm font-light'>En seulement 2 minutes, réunissons les informations nécessaires pour comparer les meilleurs tarifs du marché.</p>
      </div>
    </div>
  )
}