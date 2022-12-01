import React from 'react'
import Subtitle from 'components/Subtitle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faChildren } from '@fortawesome/free-solid-svg-icons';

export default function Step3({
  state,
  handleStepDecrement
}) {
  console.log('state: ', state)
  return (<>
    <Subtitle
      subtitle="Les infos de vos enfants"
    />
    <div className='my-10'>
      <div className='grid grid-cols-6 gap-1 p-4 w-11/12 h-auto border border-slate-300 rounded-lg mt-8 shadow-md'>
        <div className='col-span-1 flex items-center justify-center'>
          <FontAwesomeIcon icon={faChildren} className='cursor-pointer text-slate-300' size='2xl' />
        </div>
        <div className="col-span-4">
          <p className='text-base font-normal	'>Enfants</p>
          <p className='text-sm text-slate-600'>Nombre d'enfants {state.children.NumOfChildren}</p>
        </div>
        <div className="col-span-1 text-end">
          <FontAwesomeIcon icon={faEdit} className='cursor-pointer' onClick={handleStepDecrement} />
        </div>
      </div>
    </div>
  </>
  )
}