import React, { useState } from 'react'
import Modal from 'react-modal';
import Lottie from 'react-lottie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEnvelope,
    faPhone,
    faMapLocation,
    faCheckCircle, faEye, faTooth, faEarListen, faDownload, faXmark,
    faClock
} from '@fortawesome/free-solid-svg-icons';
import { siteContactConfig } from 'shared/constants';
import LoadingSpinner from 'assets/json/loader-spinner-light-blue.json';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '500px',
        height: '520px',
        borderRadius: '20px',
        zIndex: '999999999',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    overlay: {
        backgroundColor: 'rgb(0 0 0 / 39%)',
        zIndex: '999999999'
    }
};

const bottomText = "*€157: Maximum potential savings for 99% of a sample of 579,748 quotes compared with the regulated energy tariffs on the app.1swis.com website between January 1, 2020 and August 31, 2020."

const tabsData = [
    {
        label: "I'",
        content: [
            {
                title: "100% Sante",
                value: <FontAwesomeIcon icon={faCheckCircle} className='text-blue-300' />
            },
            {
                title: "Tiers payant",
                value: <FontAwesomeIcon icon={faCheckCircle} className='text-blue-300' />
            },
            {
                title: "Delai de carence",
                value: "Non"
            },
            {
                title: "Frais de dossier",
                value: "20 £"
            },
            {
                title: "Tarif Annuel",
                value: "183,48 £",
                isSeperator: true
            },
        ]
    },
    {
        label: '100% Sante',
        content: [
            {
                title: "Optique",
                value: `Le choix parmi 34 montures (20 pour les enfants) faisant partie d’une sélection chez votre opticien
                Toutes les corrections sont concernées et les verres pourront être amincis, anti-rayures, anti-UV et antireflets`,
                icon: <FontAwesomeIcon icon={faEye} className='text-blue-300' />
            },
            {
                title: "Dentaire",
                value: `Des prothèses (métalliques ou céramiques) éligibles au panier 100% santé
                Sans reste à charge à partir du 1er Janvier 2020`,
                icon: <FontAwesomeIcon icon={faTooth} className='text-blue-300' />
            },
            {
                title: "Auditif",
                value: `Des équipements de qualité, tant sur le plan esthétique que de leurs performances
                Prise en charge intégrale à partir du 1er Janvier 2021`,
                icon: <FontAwesomeIcon icon={faEarListen} className='text-blue-300' />
            },
        ]
    },
];

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: LoadingSpinner,
    rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
    }
};

export default function SelectOfferModal({ loading, modalIsOpen, toggleModal, modalState, getOfferLogo, referenceNumber, handleSubscriptionContinue }) {
    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={toggleModal}
            style={customStyles}
            contentLabel="Example Modal"
            shouldCloseOnOverlayClick={false}
        >
            {
                loading ?
                    <div className='card'>
                        <div className='card-header text-center mb-8 text-blue-500 font-medium text-2xl'>
                            Please Wait
                        </div>
                        <Lottie
                            options={defaultOptions}
                            height={200}
                            width={200}
                            isClickToPauseDisabled={true}
                        />
                    </div>
                    :
                    <div className='card'>
                        <div className='card-body'>
                            <div className='text-end'>
                                <FontAwesomeIcon onClick={toggleModal} icon={faXmark} className='text-slate-300 cursor-pointer' />
                            </div>
                            <div className="container-fluid bg-white">
                                <p className='text-slate-700 text-md font-bold text-center'>Your request has been registered.</p>

                                <div className="flex lg:flex-row lg:items-center p-2 justify-center">
                                    <img
                                        src={getOfferLogo(modalState?.provider)}
                                        alt="peopleos"
                                        className="capture-decran-2022-04-13-a-2302-12 me-4"
                                    />
                                </div>

                                <div className="col-span-12 sm:col-span-6 md:col-span-4 text-center my-4">
                                    <p className="text-xs text-slate-400">
                                        Formulae NiveauHospi3
                                    </p>
                                    <p className="text-xl text-slate-800 font-medium mt-2">
                                        <span className='text-blue-500 font-semibold text-2xl'>{modalState?.monthlyPrice} €</span> &nbsp; <span className='text-slate-400 text-sm'>/mois</span>
                                    </p>
                                </div>

                                <div className='flex flex-col md:flex-row my-2 rounded-lg bg-blue-50 p-4 mt-2'>
                                    <div className='w-full'>
                                        <p className='text-slate-600 text-sm font-medium'>Telephone</p>
                                        <p className='text-sm text-slate-600 w-full'>
                                            <FontAwesomeIcon icon={faPhone} className='text-blue-500 mr-2' />
                                            {siteContactConfig.phoneNumber}
                                        </p>
                                    </div>
                                    <div className='w-full'>
                                        <p className='text-slate-600 text-sm font-medium'>Monday to Friday</p>
                                        <p className='text-sm text-slate-600 w-full'>
                                            <FontAwesomeIcon icon={faClock} className='text-blue-500 mr-2' />
                                            {siteContactConfig.mondayToFriday}
                                        </p>
                                    </div>
                                    <div className='w-full'>
                                        <p className='text-slate-600 text-sm font-medium'>Saturday</p>
                                        <p className='text-sm text-slate-600 w-full'>
                                            <FontAwesomeIcon icon={faClock} className='text-blue-500 mr-2' />
                                            {siteContactConfig.saturday}
                                        </p>
                                    </div>
                                </div>

                                <div className="col-span-12 sm:col-span-6 md:col-span-4 text-center my-4">
                                    <p className="text-xs text-slate-400">
                                        Your file reference
                                    </p>
                                    <p className="text-xl text-slate-800 font-medium mt-2">
                                        <span className='text-slate-700 font-semibold text-xl'>{referenceNumber || ''}</span>
                                    </p>
                                </div>

                                <p className="text-xs text-slate-400 mt-2 text-center">
                                    {bottomText}
                                </p>

                                <button
                                    className="bg-blue-500 hover:bg-blue-700 disabled:bg-blue-300 text-white font-bold py-2 px-4 mt-4 rounded w-full"
                                    onClick={handleSubscriptionContinue}
                                >
                                    Continuer
                                </button>
                            </div>
                        </div>
                    </div>
            }
        </Modal>
    )
}