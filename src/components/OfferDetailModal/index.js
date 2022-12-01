import React, { useState } from 'react'
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faEye, faTooth, faEarListen, faDownload, faXmark } from '@fortawesome/free-solid-svg-icons';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '460px',
        height: '590px',
        borderRadius: '20px',
        zIndex: '999999999'
    },
    overlay: {
        backgroundColor: 'rgb(0 0 0 / 39%)',
        zIndex: '999999999'
    }
};

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

export default function OfferDetailModal({ modalIsOpen, toggleModal, modalState, getOfferLogo }) {
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const [tabsDataState, setTabsDataState] = useState(tabsData);

    console.log('modalState: ', modalState)

    const downloadCredentialPdf = (url) => {
        let filePath = url;
        var a = document.createElement('A');
        a.href = filePath;
        a.target = "_blank"
        a.download = filePath.substr(filePath.lastIndexOf('/') + 1);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={toggleModal}
            style={customStyles}
            contentLabel="Example Modal"
        >
            <div className='card'>
                <div className='card-body'>
                    <div className='text-end'>
                        <FontAwesomeIcon onClick={toggleModal} icon={faXmark} className='text-slate-300 cursor-pointer' />
                    </div>
                    <div className="container-fluid bg-white">
                        <div className="flex lg:flex-row lg:items-center p-2 justify-between">
                            <div className="col-span-12 sm:col-span-6 md:col-span-4 border border-slate-200 rounded-lg px-2 py-6">
                                <img
                                    src={getOfferLogo(modalState?.provider)}
                                    alt="peopleos"
                                    className="capture-decran-2022-04-13-a-2302-12 me-4"
                                />
                            </div>

                            <div className="col-span-12 sm:col-span-6 md:col-span-4 text-end">
                                <p className="text-sm text-slate-400">
                                    Formulae NiveauHospi3
                                </p>
                                <p className="text-xl text-slate-800 font-medium">
                                    {modalState?.monthlyPrice} €
                                </p>
                                <p className="text-md text-slate-500">
                                    &nbsp; /mois
                                </p>
                            </div>
                        </div>
                        <div className="flex lg:flex-row lg:items-center p-2 justify-between">
                            <div className='w-full'>
                                <div className="flex">
                                    {/* Loop through tab data and render button for each. */}
                                    {tabsData.map((tab, idx) => {
                                        return (
                                            <button
                                                key={idx}
                                                className={`py-2 px-8 border-t-4 rounded-t-lg transition-colors duration-300 ${idx === activeTabIndex
                                                    ? 'border-blue-500 bg-slate-50'
                                                    : 'border-transparent hover:border-gray-200'
                                                    }`}
                                                // Change the active tab on click.
                                                onClick={() => setActiveTabIndex(idx)}
                                            >
                                                {tab.label}
                                            </button>
                                        );
                                    })}
                                </div>
                                {/* Show active tab content. */}
                                <div className="py-4 px-2 bg-slate-50">
                                    <p>
                                        {
                                            activeTabIndex == 0 && <TabOne list={tabsDataState[activeTabIndex].content} />
                                        }
                                        {
                                            activeTabIndex == 1 && <TabTwo list={tabsDataState[activeTabIndex].content} />
                                        }
                                    </p>
                                </div>

                                <button
                                    className="bg-blue-500 hover:bg-blue-700 disabled:bg-blue-300 text-white font-bold py-2 px-4 mt-4 rounded w-full"
                                // onClick={clearState}
                                >
                                    En savior Plus
                                </button>

                                {
                                    activeTabIndex == 0 && modalState?.conditionsGeneralePdf && (

                                        <div onClick={() => downloadCredentialPdf(modalState?.conditionsGeneralePdf)} className='text-blue-400 font-medium mt-2 cursor-pointer'>
                                            <FontAwesomeIcon icon={faDownload} className='text-blue-400 mr-2' /> Conditions Generales Pdf
                                        </div>
                                    )
                                }
                                {
                                    activeTabIndex == 0 && modalState?.ficheProduitPdf && (

                                        <div onClick={() => downloadCredentialPdf(modalState?.ficheProduitPdf)} className='text-blue-400 font-medium mt-2 cursor-pointer'>
                                            <FontAwesomeIcon icon={faDownload} className='text-blue-400 mr-2' /> Fiche Produit Pdf
                                        </div>
                                    )
                                }
                                {
                                    activeTabIndex == 0 && modalState?.ipidPdf && (

                                        <div onClick={() => downloadCredentialPdf(modalState?.ipidPdf)} className='text-blue-400 font-medium mt-2 cursor-pointer'>
                                            <FontAwesomeIcon icon={faDownload} className='text-blue-400 mr-2' /> Ipid Pdf
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

const TabOne = ({ list }) => {
    return (
        <>
            {
                list.map((elem, index) => (
                    <div className={`flex flex-row justify-between ${elem.isSeperator && "border-t-2 pt-2 mt-2 font-semibold"}`} key={index}>
                        <span className='py-1 text-slate-500'>{elem.title}</span>
                        <span className='py-1 text-slate-700 font-medium'>{elem.value}</span>
                    </div>
                ))
            }
        </>
    )
}

const TabTwo = ({ list }) => {
    return (
        <>
            {
                list.map((elem, index) => (
                    <div className='flex flex-row' key={index}>
                        <div className='col-span-2'>
                            <span className='px-2'>{elem.icon}</span>
                        </div>
                        <div className='col-span-8'>
                            <h6 className='text-slate-700 text-sm py-1 pl-2'>{elem.title}</h6>
                            <p className='text-slate-500 text-xs py-1 pl-2'>{elem.value}</p>
                        </div>
                    </div>
                ))
            }
        </>
    )
}
