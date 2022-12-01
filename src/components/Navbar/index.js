import React, { useState } from 'react'
import Logo from 'assets/images/logo.svg'
import { Line } from 'rc-progress';
import Modal from 'components/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRefresh } from '@fortawesome/free-solid-svg-icons';

export default function Navbar({ progressPercentage, currentLevel, levels, clearState }) {
    let [isOpen, setIsOpen] = useState(false)

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    return (
        <nav className="fixed bottom-0 md:top-0 right-0 w-full flex bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-800 h-14 z-50 drop-shadow-md border border-slate-300">
            <Modal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                closeModal={closeModal}
                openModal={openModal}
                progressPercentage={progressPercentage}
                currentLevel={currentLevel}
                levels={levels}
            />
            {/* <div className="fixed inset-0 flex items-center justify-center">
                <button
                    type="button"
                    onClick={openModal}
                    className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                >
                    Open dialog
                </button>
            </div> */}

            <div className="container flex flex-wrap justify-between items-center mx-auto">
                <a href="#" className="flex md:block hidden">
                    <span className='font-extrabold text-transparent text-3xl bg-clip-text bg-gradient-to-r from-teal-400 to-blue-600'>1Swis</span>
                </a>

                <div className='w-9/12 md:w-3/5 flex flex-col md:flex-row md:items-center'>
                    <span className='w-auto mr-4 mb-2 md:mb-0 text-sm'>
                        <p className='font-light'>Etape {currentLevel > 5 ? 5 : currentLevel}/5</p>
                    </span>
                    <span className='w-5/5 md:w-4/5'>
                        <Line percent={progressPercentage} strokeWidth={1} trailWidth={1} strokeColor="#005df5" />
                    </span>
                </div>

                <button data-collapse-toggle="mobile-menu" type="button" onClick={openModal} className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-2" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
                    <svg className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                </button>

                <div className="hidden w-full md:block md:w-auto" id="mobile-menu">
                    <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
                        <li>
                            <button
                                className="bg-blue-500 hover:bg-blue-700 disabled:bg-blue-300 text-white font-bold py-2 px-4 rounded"
                                onClick={clearState}
                            >
                                <FontAwesomeIcon icon={faRefresh} className='text-white mr-2' />
                                Reset
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

    )
}
