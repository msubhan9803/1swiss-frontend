import React from 'react'
import moment from 'moment';
import Subtitle from 'components/Subtitle';
import Card1 from 'components/Cards/Card1';
import { genderList } from 'shared/constants';
import DateInput from 'components/controls/DateInput';

export default function Step2({ name, state, _hanldeDobInput, _handleDobContinue, errors }) {
  return (
    <div className='my-10'>
      <Subtitle
        subtitle="Votre date de naissance"
      />

      <div className='px-2 mt-4'>
        <DateInput
          className={`${errors && "border-red-400"}`}
          name="member-step-3-dob"
          mask="99-99-9999"
          value={state.partnerBirthDate}
          placeholder="JJ/MM/AAAA"
          onChangeHandler={(e) => _hanldeDobInput(name, e.target.value)}
        />
        <p className='text-red-400'>{errors}</p>
      </div>

      <div className='text-center my-4'>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={_handleDobContinue}
        >
          Continuer
        </button>
      </div>
    </div>
  )
}