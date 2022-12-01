import React from 'react'
import Subtitle from 'components/Subtitle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

export default function Step3({
  state,
  _handleRevertToFirstStep
}) {
  return (
    <div className='my-10'>
      <div className='grid grid-cols-6 gap-1 p-4 w-11/12 h-auto border border-slate-300 rounded-lg mt-8 shadow-md'>
        <div className='col-span-1 flex items-center justify-center'>
          <img src="img/people@2x.png" width={20} height={30} alt="" />
        </div>
        <div className="col-span-4">
          <p className='text-base font-normal	'>Conjointe</p>
          <p className='text-sm text-slate-600'>Né(e) le {state.partnerBirthDate}</p>
          <p className='text-sm text-slate-600'>{state.partnerGender}</p>
        </div>
        <div className="col-span-1 text-end">
          <FontAwesomeIcon icon={faEdit} className='cursor-pointer' onClick={_handleRevertToFirstStep} />
        </div>
      </div>
    </div>
  )
}