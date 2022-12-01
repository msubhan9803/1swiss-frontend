import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export default function PoliciesNavbar() {
    return (
        <div className="flex h-16 items-center justify-between md:items-start px-4 py-2 shadow-md">
            <div className="flex-none w-14 h-14 text-center">
                <a href="/" className="">
                    <span className='font-extrabold text-transparent text-3xl bg-clip-text bg-gradient-to-r from-teal-400 to-blue-600'>1Swis</span>
                </a>
            </div>
            <div className="hidden md:block grow h-14 text-center">
                <p className='text-lg text-blue-500 font-semibold'>Meilleures Mutuelles Santé Sénior 2022</p>
                <p className='text-sm text-blue-400'>Devis 100% Gratuit Et Sans Engagement</p>
            </div>
            <div className="flex-none w-14 h-14 text-center">
                <a href='/'>
                    <div className="m-1 mr-2 w-12 h-12 relative cursor-pointer flex justify-center items-center border border-blue-300 rounded-full bg-blue-100 text-xl text-white uppercase">
                        <FontAwesomeIcon icon={faUser} className='text-blue-500' />
                    </div>
                </a>
            </div>
        </div>
    )
}
