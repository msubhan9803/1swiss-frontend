import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import useSubscriptionForm from 'hooks/useSubscriptionForm';
import SubscriptionSuccessful from 'components/SubscriptionSuccessful';
import AdditionalForm from 'components/SubscriptionForms/AdditionalForm';
import PaymentForm from 'components/SubscriptionForms/PaymentForm';
import Lottie from 'react-lottie';
import LoadingSpinner from 'assets/json/loader-spinner-light-blue.json';

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: LoadingSpinner,
    rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
    }
};

export default function SubscriptionForms() {
    const {
        loading,
        subscriptionCompleted,
        subscriptionProgressLoader,
        currentForm,
        referenceNumber,
        tabs,
        additionalFormState,
        paymentFormState,
        redirectToMainPage,
        handleCompletion
    } = useSubscriptionForm();

    return (
        <div className="cart__wraper--cart flex items-center flex-col w-full mt-8">
            <div className='w-full md:w-9/12'>
                <p className='text-2xl text-slate-700 font-medium'>Souscription En Ligne</p>

                <div className='card bg-white border rounded-lg p-4 my-4'>
                    <div className='card-body mx-8 my-4'>
                        <div className='flex flex-row items-center'>
                            {
                                Array.isArray(tabs) && tabs.map((step, index) => (
                                    <>
                                        <div className='text-blue-500 flex flex-row items-center'>
                                            <FontAwesomeIcon
                                                icon={faCheckCircle}
                                                className={`${step.active && 'text-slate-700'} ${step.completed ? 'text-blue-500' : 'text-slate-400'} text-2xl mx-1`}
                                            />
                                            <p
                                                className={`${step.active && 'text-slate-700'} ${step.completed ? 'text-blue-500' : 'text-slate-400'}`}
                                            >{step.label}</p>
                                        </div>
                                        {index == 0 && (
                                            <FontAwesomeIcon
                                                icon={faChevronRight}
                                                className={`${step.active && 'text-slate-700'} ${step.completed ? 'text-blue-500' : 'text-slate-400'} text-2xl mx-1`}
                                            />
                                        )}
                                    </>
                                ))
                            }
                        </div>

                        <div className='flex flex-row items-center w-full md:w-1/2 my-3'>
                            <p className='text-slate-500 text-sm'>Nous avons besoin de ces informations pour finaliser votre dossier et vous envoyer les documents relatifs à votre assurance santé.</p>
                        </div>

                        {/* Loading current form */}
                        {
                            subscriptionProgressLoader ?
                                <Lottie
                                    options={defaultOptions}
                                    height={200}
                                    width={200}
                                    isClickToPauseDisabled={true}
                                />
                                :
                                currentForm == 0 ? <AdditionalForm /> : <PaymentForm />
                        }

                        <SubscriptionSuccessful
                            modalIsOpen={subscriptionCompleted}
                            toggleModal={redirectToMainPage}
                            hanlder={handleCompletion}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
