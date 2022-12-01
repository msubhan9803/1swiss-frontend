import React, { useState } from 'react'
import Modal from 'react-modal';
import Lottie from 'react-lottie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import LoadingWithCheckmark from 'assets/json/loading-with-checkmark.json';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '500px',
        height: '360px',
        borderRadius: '20px',
        zIndex: '999999999'
    },
    overlay: {
        backgroundColor: 'rgb(0 0 0 / 39%)',
        zIndex: '999999999'
    }
};

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: LoadingWithCheckmark,
    rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
    }
};

export default function SubscriptionSuccessful({ modalIsOpen, toggleModal, hanlder }) {
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
                    <div className="container-fluid bg-white text-center">
                        <p className='text-slate-700 text-lg font-bold text-center'>Congratulations !</p>

                        <Lottie
                            options={defaultOptions}
                            height={200}
                            width={200}
                            isClickToPauseDisabled={true}
                        />

                        <button
                            className="bg-blue-500 hover:bg-blue-700 w-3/5 disabled:bg-blue-300 text-white font-bold py-2 px-4 mt-4 rounded"
                            onClick={hanlder}
                        >
                            <FontAwesomeIcon icon={faCheckCircle} className='text-white cursor-pointer' />
                            Thanks
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}