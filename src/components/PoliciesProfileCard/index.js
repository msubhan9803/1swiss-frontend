import React, { useState } from 'react';
import ManImage from 'assets/images/man-avatar.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faMapLocation, faEye, faTooth, faTruckMedical, faStethoscope, faEarListen } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import QRCode from "react-qr-code";

const PoliciesProfileCard = ({ subscriberInfo, offers }) => {
    const {
        firstName,
        lastName,
        email,
        phoneNumber,
        city,
        status,
        gender,
        birthDate,
        activity,
        socialRegime,
        hasPartner,
        warranties,
        postalCode,
        insureDate,
        _id,
        createdAt,
        updatedAt,
    } = subscriberInfo;

    return (
        <div className="cart__wraper--cart flex items-center flex-col w-full">
            <div className=" cart__item  text-slate-700 w-full md:w-9/12 py-4 px-4 m-auto shadow-lg rounded-2xl my-12 relative border">
                <div
                    className={`w-full bg-transparent rounded flex snap-x h-8 relative left-0`}
                >
                    <div
                        className={`snap-start w-full h-full items-center justify-center text-slate-700 mx-auto flex-shrink-0 absolute -top-24`}
                    >
                        <img src={ManImage} width="120" height="120" alt="shoes" className="mx-auto "></img>
                    </div>
                </div>

                <div className="flex">
                    <div className="w-full text-center">
                        <h4 className="text-lg font-bold">
                            {firstName ? firstName : ''}
                            {lastName ? " " + lastName : ''}
                        </h4>
                    </div>
                </div>

                <div className='flex md:block lg:flex flex-col md:flex-row justify-center my-2 xl:mx-28'>
                    <div className='mx-0 md:w-full'>
                        <p className='text-sm text-center text-slate-600 w-full'>
                            <FontAwesomeIcon icon={faEnvelope} className='text-slate-500 mr-2' />
                            {email}
                        </p>
                    </div>
                    <div className='mx-0 md:w-full'>
                        <p className='text-sm text-center text-slate-600 w-full'>
                            <FontAwesomeIcon icon={faPhone} className='text-slate-500 mr-2' />
                            {phoneNumber}
                        </p>
                    </div>
                    <div className='mx-0 md:w-full'>
                        <p className='text-sm text-center text-slate-600 w-full'>
                            <FontAwesomeIcon icon={faMapLocation} className='text-slate-500 mr-2' />
                            {city}
                        </p>
                    </div>
                </div>

                <div className='grid grid-cols-12 items-center'>
                    <div className='col-span-12 lg:col-span-8 lg:col-start-2'>
                        <div className='grid grid-cols-12'>
                            <div className='col-span-6 md:col-span-4 my-1'>
                                <p className='text-sm font-semibold text-blue-500'>Le genre</p>
                                <p className='text-sm text-slate-600'>
                                    {gender}
                                </p>
                            </div>
                            <div className='col-span-6 md:col-span-4 my-1'>
                                <p className='text-sm font-semibold text-blue-500'>Statut</p>
                                <p className='text-sm text-slate-600'>
                                    {status}
                                </p>
                            </div>
                            <div className='col-span-6 md:col-span-4 my-1'>
                                <p className='text-sm font-semibold text-blue-500'>Date de naissance</p>
                                <p className='text-sm text-slate-600'>
                                    {moment(birthDate).format('DD-MM-YYYY')}
                                </p>
                            </div>
                            <div className='col-span-6 md:col-span-4 my-1'>
                                <p className='text-sm font-semibold text-blue-500'>Code postal</p>
                                <p className='text-sm text-slate-600'>
                                    {postalCode}
                                </p>
                            </div>
                            <div className='col-span-6 md:col-span-4 my-1'>
                                <p className='text-sm font-semibold text-blue-500'>Régime social</p>
                                <p className='text-sm text-slate-600'>
                                    {socialRegime}
                                </p>
                            </div>
                            <div className='col-span-6 md:col-span-4 my-1'>
                                <p className='text-sm font-semibold text-blue-500'>Date d'assurance</p>
                                <p className='text-sm text-slate-600'>
                                    {moment(insureDate).format('DD-MM-YYYY')}
                                </p>
                            </div>
                            <div className='col-span-12 md:col-span-4 my-1'>
                                <p className='text-sm font-semibold text-blue-500'>Métier/Activité</p>
                                <p className='text-sm text-slate-600'>
                                    {activity}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='md:flex col-span-12 lg:col-span-3 mx-auto'>
                        {/* Desktop/tablet/laptop */}
                        <div className='block' style={{ background: 'white', padding: '16px' }}>
                            <QRCode value={`First Name: ${firstName}, Last Name: ${lastName}, Email: ${email}, Phone no.: ${phoneNumber}, City: ${city}, Gender: ${gender}, Birth Date: ${birthDate}, Activity: ${activity}, Social Regime: ${socialRegime}, Insure Date: ${insureDate}   Site: ${window.location.host}`}
                                size={160} />
                        </div>
                    </div>
                </div>

                <hr />

                <WarrantyComponnet warranties={warranties} />
            </div>
        </div>
    );
};

function WarrantyComponnet({ warranties }) {
    return (
        <div className='grid grid-cols-12 py-4'>
            <div className='col-span-6 md:col-span-2 md:col-start-2 text-center'>
                <FontAwesomeIcon icon={faTruckMedical} className='text-blue-600' />
                <p className='text-sm font-normal text-blue-500'>Soins médicaux</p>
                <p className='text-sm font-normal'>{warranties.medicalCare.level}</p>
            </div>
            <div className='col-span-6 md:col-span-2 text-center'>
                <FontAwesomeIcon icon={faTooth} className='text-blue-600' />
                <p className='text-sm font-normal text-blue-500'>Dentaire</p>
                <p className='text-sm font-normal'>{warranties.dental.level}</p>
            </div>
            <div className='col-span-6 md:col-span-2 text-center'>
                <FontAwesomeIcon icon={faEye} className='text-blue-600' />
                <p className='text-sm font-normal text-blue-500'>Optique</p>
                <p className='text-sm font-normal'>{warranties.visual.level}</p>
            </div>
            <div className='col-span-6 md:col-span-2 text-center'>
                <FontAwesomeIcon icon={faEarListen} className='text-blue-600' />
                <p className='text-sm font-normal text-blue-500'>Aides Auditives</p>
                <p className='text-sm font-normal'>{warranties.hearing.level}</p>
            </div>
            <div className='col-span-6 md:col-span-2 text-center'>
                <FontAwesomeIcon icon={faStethoscope} className='text-blue-600' />
                <p className='text-sm font-normal text-blue-500'>Hospitalisation</p>
                <p className='text-sm font-normal'>{warranties.hospitalization.level}</p>
            </div>
        </div>
    )
}

export default PoliciesProfileCard;