import React from 'react'
import { useSelector, useDispatch } from 'react-redux';

import Navbar from 'components/Navbar';
import SideProgressTracker from 'components/SideProgressTracker';
import useGenericForm from 'hooks/useGenericForm';

export default function MainLayout({ children }) {
  const formReducerState = useSelector(state => state.formReducer);
  const {
    currentLevel,
    levels,
    subscriberState,
    errors
  } = formReducerState;
  const { handleClearState } = useGenericForm();

  return (
    <>
      <Navbar
        progressPercentage={currentLevel / 5 * 100}
        currentLevel={currentLevel}
        levels={levels}
        clearState={handleClearState}
      />
      <main
        className='bg-main-layout h-screen container-fluid flex flex-wrap justify-between mx-autoflex pt-20 px-8 w-full'
      >
        <div className='grid grid-cols-12 gap-1 w-full'>
          <div className='col-span-12 md:col-start-4 md:col-span-6 mb-20'>
            {children}
          </div>

          <div className='hidden md:block col-span-3 bg-white -z-50'>
            <SideProgressTracker
              currentLevel={currentLevel}
              levels={levels}
            />
          </div>
        </div>
      </main>
    </>
  )
}
