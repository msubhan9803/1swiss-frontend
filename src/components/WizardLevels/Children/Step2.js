import React from 'react'
import Subtitle from 'components/Subtitle';
import ChildDateInput from 'components/controls/ChildDateInput';
import SelectOption from 'components/controls/SelectOption';
import { professionList } from 'shared/constants';

export default function Step2({
  errors,
  childrenError,
  numOfChildren,
  subscriberState,
  handleChildrenDob,
  handleChildrenActivity,
  handleContinue
}) {
  console.log('state: ', subscriberState.children["child1"])
  return (
    <>
      <Subtitle
        subtitle="Infos sur vos enfants"
      />

      <div className='my-10'>
        {
          [...Array(numOfChildren)].map((elem, index) => (
            <div className='grid grid-cols-12 my-5'>
              <p className='text-lg font-normal col-span-12 mb-2'>Enfants {index + 1}</p>
              <div className='col-span-6 mx-1'>
                <p className='text-sm text-slate-500 col-span-12 mb-2'>Date de naissance</p>
                <ChildDateInput
                  className={`${childrenError[`child${index + 1}`].birthDate && "border-red-400"}`}
                  name="member-step-3-dob"
                  mask="99-99-9999"
                  value={subscriberState.children[`child${index + 1}`].birthDate}
                  placeholder="JJ/MM/AAAA"
                  onChangeHandler={handleChildrenDob}
                  index={index}
                />
                {childrenError[`child${index + 1}`].birthDate && <p className='text-red-400'>{childrenError[`child${index + 1}`].birthDate}</p>}
              </div>
              <div className='col-span-6 mx-1'>
                <p className='text-sm text-slate-500 col-span-12 mb-2'>Votre profession ou activité</p>
                <SelectOption
                  className={`${childrenError[`child${index + 1}`].activity && "border-red-400"}`}
                  value={subscriberState.children[`child${index + 1}`].activity}
                  index={index}
                  options={professionList}
                  onChangeHandler={handleChildrenActivity}
                />
                {childrenError[`child${index + 1}`].activity && <p className='text-red-400'>{childrenError[`child${index + 1}`].activity}</p>}
              </div>
            </div>
          ))
        }

        <div className='text-center my-4'>
          <button
            className="bg-blue-500 hover:bg-blue-700 disabled:bg-blue-300 text-white font-bold py-2 px-4 rounded"
            onClick={handleContinue}
          >
            Continuer
          </button>
        </div>
      </div>
    </>
  )
}
