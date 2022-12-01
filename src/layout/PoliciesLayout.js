import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import PoliciesNavbar from 'components/PoliciesNavbar';

export default function PoliciesLayout({ children }) {
  return (
    <>
      <PoliciesNavbar />
      <main
        className='bg-main-layout h-screen container-fluid flex flex-wrap justify-center mx-autoflex pt-20 px-2 md:px-8 w-full'
      >
        <div className='grid grid-cols-12 gap-1 w-full'>
          <div className='col-span-12'>
            {children}
          </div>
        </div>
      </main>
    </>
  )
}
