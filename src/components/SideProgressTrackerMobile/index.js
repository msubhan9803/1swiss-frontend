import React from 'react'
import { sideProgressTrackerList } from 'shared/constants';

export default function SideProgressTracker({ currentLevel, levels }) {

  const handleActiveLink = (value) => {
    switch (value) {
      case 1:
        return !!(levels.member.completed);

      case 2:
        return !!(levels.contract.completed);

      case 3:
        return !!(levels.needs.completed);

      case 4:
        return !!(levels.contactInformation.completed);

      case 5:
        return !!(levels.final.completed);

      default:
        break;
    }
  }

  return (
    <div className="relative dark:bg-gray-800 dark:border-gray-700">
      <p className='text-2xl text-slate-700 font-medium'>Mes étapes</p>
      <p className='text-sm text-slate-600'>Sélectionnez l’étape sur laquelle vous souhaitez revenir</p>
      <ul role="list" className="my-7 space-y-5">
        {
          sideProgressTrackerList.map((elem, index) => (
            <li className="flex space-x-3 flex flex-row items-center cursor-pointer" key={index}>
              {
                currentLevel === index + 1 || handleActiveLink(index + 1) ?
                  <div className='w-8 h-8 relative rounded-2xl bg-blue-100 flex flex-row items-center justify-center'>
                    <span className={`w-2 h-2 rounded-lg bg-blue-600 z-20`}></span>
                  </div>
                  :
                  <div className='w-8 h-8 relative rounded-2xl bg-slate-100 flex flex-row items-center justify-center'>
                    <span className={`w-2 h-2 rounded-lg bg-slate-400 z-20`}></span>
                  </div>
              }
              {
                currentLevel === index + 1 || handleActiveLink(index + 1) ?
                  <span className="text-base font-normal leading-tight text-gray-500 hover:text-blue-600 dark:text-gray-400">
                    {elem}
                  </span>
                  :
                  <span className="text-base font-normal leading-tight text-gray-500 hover:text-slate-400 dark:text-gray-400">
                    {elem}
                  </span>
              }
            </li>
          ))
        }
      </ul>
    </div>
  )
}
