import React, { useState } from "react";
import { nanoid } from "nanoid";
import ReactStars from 'react-stars'
import "./InfosComparateurSant6.css";
import NeoLianeLogo from 'assets/images/62de90f3c3d07536adaafa08_neoliane-sante-prevoyance.svg';
import AlptisLogo from 'assets/images/capture-d-e-cran-2022-04-13-a--23-02-4@2x.png';
import FmaLogo from 'assets/images/capture-d-e-cran-2022-04-13-a--23-39-3@2x.png'
import AprilLogo from 'assets/images/capture-d-e-cran-2022-04-13-a--23-02-6@2x.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCheckCircle, faChevronDown, faChevronUp, faCircleInfo, faHeartPulse } from '@fortawesome/free-solid-svg-icons';
import OfferDetailModal from 'components/OfferDetailModal';
import SelectOfferModal from 'components/SelectOfferModal';
import useSubscriptionForm from 'hooks/useSubscriptionForm.js';

const needsList = [
    { label: "Soins médicaux", type: "medicalCare" },
    { label: "Dentaire", type: "dental" },
    { label: "Optique", type: "visual" },
    { label: "Aides Auditives", type: "hearing" },
    { label: "Hospitalisation", type: "hospitalization" }
]

const initialState = {
    provider: "",
    monthlyPrice: null,
    code: "",
    description: "",
    label: "",
    yearlyPrice: null,
    totalFees: null,
    _id: "",
    moreInfo: false
};

export default function OfferListComponent({ selectedOfferReqLoader, offers, subscriberInfo, scroreStats, handleToggleInfoState }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalState, setModalState] = useState(initialState);
    const [selectedOfferModal, setSelectedOfferModal] = useState(false);
    const { handleSelectOffer, selectedOffer, referenceNumber, handleSubscriptionContinue } = useSubscriptionForm();

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

    const openModalForOffer = (offerId) => {
        const selectedOffer = offers.find(offer => offer._id === offerId);
        setModalState(selectedOffer);
        _toggleModal();
    }

    const openModalForSelectedOffer = (offerId) => {
        const selectedOffer = offers.find(offer => offer._id === offerId);
        handleSelectOffer(selectedOffer, _toggleSelectedOfferModal);
        _toggleSelectedOfferModal();
    }

    const _toggleModal = () => {
        setIsModalOpen(!isModalOpen)
    }

    const _toggleSelectedOfferModal = () => {
        setSelectedOfferModal(!selectedOfferModal)
    }

    return (
        <div className="">
            {
                Array.isArray(offers) &&
                offers.map((offer) => {
                    return (
                        <div className="container-fluid bg-white border border-slate-100 hover:border-blue-500 shadow-lg rounded-md relative mt-8">
                            <div className="grid grid-cols-12 lg:flex lg:flex-row lg:items-center p-8" key={nanoid(8)}>
                                <div className="col-span-12 sm:col-span-6 md:col-span-4 order-1 lg:order-none lg:col-span">
                                    <img
                                        src={getOfferLogo(offer.provider)}
                                        alt="peopleos"
                                        className="capture-decran-2022-04-13-a-2302-12 me-4"
                                    />
                                </div>
                                <div className="col-span-12 sm:col-span-6 md:col-span-4 order-2 md:px-4 lg:w-2/12 lg:order-none lg:col-span">
                                    <div className="group-327">
                                        <p className="text-sm font-medium text-slate-700">
                                            {offer.name || offer.provider}
                                        </p>
                                        <p className="text-xs text-slate-600">
                                            {offer.code || offer.label || ""}
                                        </p>
                                    </div>
                                </div>
                                <div className="col-span-12 block order-4 md:flex md:grow lg:w-3/6 lg:order-none py-4">
                                    {
                                        needsList.map((item, index) => (
                                            <div className="w-1/2 md:w-auto float-left md:float-none text-center md:grow" key={index}>
                                                <p className="text-sm font-medium text-slate-700">
                                                    {item.label}
                                                </p>
                                                {scroreStats && <StarImagesComponent value={scroreStats.find(score => score.Type == item.type)} />}
                                            </div>
                                        ))
                                    }
                                </div>
                                <div className="col-span-12 order-3 md:col-span-4 lg:order-4 lg:flex-none">
                                    <div className="flex items-center justify-start md:justify-center">
                                        <p className="text-lg text-slate-800 font-medium">
                                            {offer.monthlyPrice} €
                                        </p>
                                        <p className="text-sm text-slate-500">
                                            &nbsp; /mois
                                        </p>
                                    </div>
                                    <button
                                        className="bg-blue-500 hover:bg-blue-700 disabled:bg-blue-300 text-white font-bold py-2 px-4 rounded"
                                        onClick={() => openModalForSelectedOffer(offer._id)}
                                    >
                                        <FontAwesomeIcon icon={faCheckCircle} className='text-white mr-2' />
                                        Select Offer
                                    </button>
                                </div>
                            </div>

                            {offer.moreInfo && (
                                <>
                                    <hr className="w-11/12 m-auto" />

                                    <div className="grid grid-cols-12 lg:flex lg:flex-row lg:items-center p-8">
                                        <div className="col-span-12 sm:col-span-6 md:col-span-6 w-1/2 order-1 lg:order-none lg:col-span">
                                            <div className="flex flex-row">
                                                <span className="bg-slate-50 p-4 rounded-lg mx-8 w-16 h-16 text-center">
                                                    <FontAwesomeIcon icon={faCircleInfo} size='2xl' className='text-blue-100' />
                                                </span>
                                                <div className="group-327">
                                                    <p className="text-md font-semibold text-slate-700">
                                                        Study the quote in detail
                                                    </p>
                                                    <p
                                                        className="text-sm text-slate-600 underline underline-offset-1 text-blue-500 mt-2 cursor-pointer"
                                                        onClick={() => openModalForOffer(offer._id)}
                                                    >
                                                        Offer Details <FontAwesomeIcon icon={faArrowRight} className='text-slate-500' />
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-span-12 sm:col-span-6 md:col-span-6 w-1/2 order-1 lg:order-none lg:col-span">
                                            <div className="flex flex-row">
                                                <span className="bg-slate-50 p-4 rounded-lg mx-8 w-16 h-16 text-center">
                                                    <FontAwesomeIcon icon={faHeartPulse} size='2xl' className='text-blue-100' />
                                                </span>
                                                <div className="group-327">
                                                    <p className="text-md font-semibold text-slate-700">
                                                        Continue subscription
                                                    </p>
                                                    <p
                                                        className="text-sm text-slate-600 underline underline-offset-1 text-blue-500 mt-2 cursor-pointer"
                                                        onClick={() => openModalForOffer(offer._id)}
                                                    >
                                                        Continue the website insurance <FontAwesomeIcon icon={faArrowRight} className='text-slate-500' />
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}

                            <span
                                className={`absolute cursor-pointer right-10 -bottom-2 ${offer.moreInfo ? 'bg-blue-500 text-white border-blue-500' : 'bg-slate-50 text-slate-800 border-white'} border-2 px-2 rounded-lg`}
                                onClick={() => handleToggleInfoState(offer._id)}
                            >
                                {offer.moreInfo ?
                                    (
                                        <span>
                                            Less info <FontAwesomeIcon icon={faChevronUp} className='text-white mr-2' />
                                        </span>
                                    )
                                    :
                                    (
                                        <span>
                                            More info <FontAwesomeIcon icon={faChevronDown} className='text-slate-500 mr-2' />
                                        </span>
                                    )
                                }
                            </span>
                        </div>
                    );
                })}

            <OfferDetailModal
                modalIsOpen={isModalOpen}
                toggleModal={_toggleModal}
                modalState={modalState}
                referenceNumber={referenceNumber}
                getOfferLogo={getOfferLogo}
            />

            <SelectOfferModal
                loading={selectedOfferReqLoader}
                modalIsOpen={selectedOfferModal}
                toggleModal={_toggleSelectedOfferModal}
                modalState={selectedOffer}
                referenceNumber={referenceNumber}
                getOfferLogo={getOfferLogo}
                handleSubscriptionContinue={handleSubscriptionContinue}
            />
        </div>
    );
}


function StarImagesComponent({ value }) {
    const { AverageScore } = value;
    return (
        <div className="flex m-auto my-1 justify-center">
            <ReactStars
                count={4}
                value={AverageScore}
                size={24}
                color2={'#5294e2'}
                edit={false}
            />
        </div>
    )
}