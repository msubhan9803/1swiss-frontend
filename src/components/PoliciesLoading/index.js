import React from 'react'
import Lottie from 'react-lottie';
import LoadingFilesAnimation from 'assets/json/loading-files';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default function PoliciesLoading({ goBackFromLoading }) {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: LoadingFilesAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  return (
    <div className='w-full h-screen flex flex-col items-center justify-center'>
      <span className='font-extrabold mb-12 text-transparent text-4xl bg-clip-text bg-gradient-to-r from-teal-400 to-blue-600'>1Swis</span>
      <p className='text-2xl text-center text-blue-500 font-semibold'>Votre profil d'assuré est complet</p>
      <p className='text-md text-center text-blue-400 font-medium'>Vos devis seront bientôt affichés, nous interrogeons les assureurs...</p>
      <Lottie
        options={defaultOptions}
        height={200}
        width={200}
        isClickToPauseDisabled={true}
      />
      {/* <p className='text-md text-blue-400 font-medium text-center'>Fonctionnement</p> */}

      <button
        className='text-md text-blue-400 hover:text-blue-500 font-medium text-center cursor-pointer p-2 mt-4 bg-blue-50 hover:bg-blue-200 rounded-md'
        onClick={goBackFromLoading}
      >
        <FontAwesomeIcon icon={faArrowLeft} className='text-blue-400 mr-2' />
        Retourner
      </button>
    </div>
  )
}
