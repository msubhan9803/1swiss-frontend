import React from 'react'
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faAddressCard, faUser, faEnvelope, faPhone, faMapLocation } from '@fortawesome/free-solid-svg-icons';

export default function ContactInfoViewCard({ state, _handleRevertToFirstStep }) {
    return (
        <>
            <div className='grid grid-cols-6 gap-1 p-4 w-11/12 h-auto border border-slate-300 rounded-lg mt-8 shadow-md'>
                <div className='col-span-1 flex items-center justify-center'>
                    <FontAwesomeIcon icon={faAddressCard} size="3x" className='text-blue-500' onClick={_handleRevertToFirstStep} />
                </div>
                <div className="col-span-4">
                    <p className='text-base font-normal	'>Vos coordonnées</p>
                    <p className='text-sm text-slate-600'>
                        <FontAwesomeIcon icon={faUser} className='text-slate-500 mr-2' />
                        {state.firstName} {state.lastName}
                    </p>
                    <p className='text-sm text-slate-600'>
                        <FontAwesomeIcon icon={faMapLocation} className='text-slate-500 mr-2' />
                        {state.city}
                    </p>
                    <p className='text-sm text-slate-600'>
                        <FontAwesomeIcon icon={faEnvelope} className='text-slate-500 mr-2' />
                        {state.email}
                    </p>
                    <p className='text-sm text-slate-600'>
                        <FontAwesomeIcon icon={faPhone} className='text-slate-500 mr-2' />
                        {state.phoneNo}
                    </p>
                </div>
                <div className="col-span-1 text-end">
                    <FontAwesomeIcon icon={faEdit} className='cursor-pointer' onClick={_handleRevertToFirstStep} />
                </div>
            </div>
        </>
    )
}
