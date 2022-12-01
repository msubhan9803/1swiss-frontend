import React from 'react'
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faFileContract } from '@fortawesome/free-solid-svg-icons';

export default function ContractViewCard({ state, _handleRevertToFirstStep }) {
    const getDateFormatted = (dateObj) => moment(`${dateObj.month}-${dateObj.day}-${dateObj.year}`).format('dddd DD MMMM YYYY');
    return (
        <>
            <div className='grid grid-cols-6 gap-1 p-4 w-11/12 h-auto border border-slate-300 rounded-lg mt-8 shadow-md'>
                <div className='col-span-1 flex items-center justify-center'>
                    <FontAwesomeIcon icon={faFileContract} size="3x" className='text-blue-500' onClick={_handleRevertToFirstStep} />
                </div>
                <div className="col-span-4">
                    <p className='text-base font-normal	'>Vos informations de contrat</p>
                    <p className='text-sm text-slate-600'>code postal: {state.postCode}</p>
                    <p className='text-sm text-slate-600'>actuellement assuré: {state.currentlyInsured}</p>
                    <p className='text-sm text-slate-600'>{getDateFormatted(state.insuranceDate)}</p>
                </div>
                <div className="col-span-1 text-end">
                    <FontAwesomeIcon icon={faEdit} className='cursor-pointer' onClick={_handleRevertToFirstStep} />
                </div>
            </div>
        </>
    )
}
