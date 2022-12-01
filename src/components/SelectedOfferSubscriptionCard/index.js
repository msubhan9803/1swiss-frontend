import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faEnvelope, faPhone, faMapLocation, faEye, faTooth, faTruckMedical, faStethoscope, faEarListen } from '@fortawesome/free-solid-svg-icons';
import ReactStars from 'react-stars'
import AprilLogo from 'assets/images/capture-d-e-cran-2022-04-13-a--23-02-6@2x.png';
import NeoLianeLogo from 'assets/images/62de90f3c3d07536adaafa08_neoliane-sante-prevoyance.svg';
import AlptisLogo from 'assets/images/capture-d-e-cran-2022-04-13-a--23-02-4@2x.png';
import FmaLogo from 'assets/images/capture-d-e-cran-2022-04-13-a--23-39-3@2x.png';
import { scoreValues } from 'shared/constants';

const SelectedOfferSubscriptionCard = ({ subscriberInfo, offers, selectedOffer }) => {
    const {
        firstName,
        lastName,
        warranties,
    } = subscriberInfo;

    function getOfferLogo(provider) {
        if (provider === "NeoLiane") {
            return NeoLianeLogo;
        }

        if (provider === "FMA") {
            return FmaLogo;
        }

        if (provider === "April") {
            return AprilLogo;
        }

        if (provider === "Alptis") {
            return AlptisLogo;
        }
    }

    return (
        <div className="cart__wraper--cart flex items-center flex-col w-full">
            <div className="py-4 cart__item bg-blue-900 text-gray-50 w-full md:w-9/12 px-4 m-auto shadow-lg rounded-2xl relative border">
                <div className="flex flex-row items-center p-2 justify-between md:mx-4">
                    <div className='flex flex-row items-center mb-4'>
                        <div className='flex flex-col'>
                            <div className='w-24 h-24 bg-white rounded-xl'>
                                <img
                                    src={selectedOffer.provider ? getOfferLogo(selectedOffer.provider) : ''}
                                    alt="peopleos"
                                    className="mt-7"
                                />
                            </div>
                        </div>
                        <div className='col-span-8 ml-4'>
                            <p className='text-gray-50 text-xl font-bold py-1 pl-2'>
                                {firstName ? firstName : ''} {lastName ? " " + lastName : ''}
                            </p>
                            <p className='text-gray-100 text-sm font-medium py-1 pl-2'>
                                <FontAwesomeIcon icon={faCheckCircle} className='text-blue-300 mr-2' />
                                INSURED
                            </p>
                        </div>
                    </div>

                    <div className="col-span-12 sm:col-span-6 md:col-span-4 text-end">
                        <span className="text-white font-bold text-xs bg-blue-400 rounded-md p-1">
                            2 Months free
                        </span>
                        <p className="text-sm text-slate-50">
                            {selectedOffer?.level}
                        </p>
                        <p className="text-md text-slate-50 mt-1">
                            {selectedOffer?.name}
                        </p>
                        <p className="font-bold">
                            <span className='text-gray-50 text-2xl'>{selectedOffer?.monthlyPrice}</span> &nbsp; <span className='text-md text-slate-100'>Incl. Tax /mois</span>
                        </p>
                    </div>
                </div>

                <hr className='w-3/4 m-auto' />

                <WarrantyComponnet warranties={warranties} />
            </div>
        </div>
    );
};

function WarrantyComponnet({ warranties }) {
    return (
        <div className='grid grid-cols-12 py-4'>
            <div className='col-span-6 md:col-span-2 md:col-start-2 text-center'>
                <FontAwesomeIcon icon={faTruckMedical} className='text-blue-300' />
                <p className='text-sm font-normal text-blue-200'>Soins médicaux</p>
                <p className='text-sm font-normal'>
                    <StarImagesComponent
                        value={scoreValues[warranties.medicalCare.level]}
                    />
                </p>
            </div>
            <div className='col-span-6 md:col-span-2 text-center'>
                <FontAwesomeIcon icon={faTooth} className='text-blue-300' />
                <p className='text-sm font-normal text-blue-200'>Dentaire</p>
                <p className='text-sm font-normal'>
                    <StarImagesComponent
                        value={scoreValues[warranties.dental.level]}
                    />
                </p>
            </div>
            <div className='col-span-6 md:col-span-2 text-center'>
                <FontAwesomeIcon icon={faEye} className='text-blue-300' />
                <p className='text-sm font-normal text-blue-200'>Optique</p>
                <p className='text-sm font-normal'>
                    <StarImagesComponent
                        value={scoreValues[warranties.visual.level]}
                    />
                </p>
            </div>
            <div className='col-span-6 md:col-span-2 text-center'>
                <FontAwesomeIcon icon={faEarListen} className='text-blue-300' />
                <p className='text-sm font-normal text-blue-200'>Aides Auditives</p>
                <p className='text-sm font-normal'>
                    <StarImagesComponent
                        value={scoreValues[warranties.hearing.level]}
                    />
                </p>
            </div>
            <div className='col-span-6 md:col-span-2 text-center'>
                <FontAwesomeIcon icon={faStethoscope} className='text-blue-300' />
                <p className='text-sm font-normal text-blue-200'>Hospitalisation</p>
                <p className='text-sm font-normal'>
                    <StarImagesComponent
                        value={scoreValues[warranties.hospitalization.level]}
                    />
                </p>
            </div>
        </div>
    )
}

function StarImagesComponent({ value }) {
    return (
        <div className="flex m-auto my-1 justify-center">
            <ReactStars
                count={4}
                value={value}
                size={24}
                color2={'#84C7FF'}
                edit={false}
            />
        </div>
    )
}

export default SelectedOfferSubscriptionCard;