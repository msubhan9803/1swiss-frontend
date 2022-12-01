import React, { useEffect } from 'react'
import useContactInfoForm from 'hooks/useContactInfoForm';
import TextView from 'components/controls/TextView';
import Subtitle from 'components/Subtitle';
import { offerRatesApprovalOptions, newsletterOptions } from 'shared/constants';
import useFinalForm from 'hooks/useFinalForm';

export default function Final({ state }) {
    const {
        subscriberState,
        levels,
        errors,
        handleContinue,
        handleSubscriberFieldUpdate
    } = useContactInfoForm();
    const {
        termsCheckState,
        setTermsCheckState,
        handleFinalContinue
    } = useFinalForm();

    return (
        <div className='mt-12'>
            {/* Are you currently insured? */}
            <div className='mt-14'>
                <Subtitle
                    subtitle="D'autres marques d'assurance peuvent vous proposer des tarifs"
                />
                {
                    offerRatesApprovalOptions.map((elem, index) => (
                        <TextView
                            key={index}
                            name="offerRatesApproval"
                            text={elem}
                            selected={elem === subscriberState.offerRatesApproval}
                            handleSubscriberFieldUpdate={handleSubscriberFieldUpdate}
                        />
                    ))
                }
                <p className='text-red-400'>{errors.offerRatesApproval}</p>
            </div>

            {/* I would like to receive the LeLynx.fr newsletter? */}
            <div className='mt-14'>
                <Subtitle
                    subtitle="Je souhaite recevoir la newsletter app.1swis.com ?"
                />
                {
                    newsletterOptions.map((elem, index) => (
                        <TextView
                            key={index}
                            name="newsletter"
                            text={elem}
                            selected={elem === subscriberState.newsletter}
                            handleSubscriberFieldUpdate={handleSubscriberFieldUpdate}
                        />
                    ))
                }
                <p className='text-red-400'>{errors.newsletter}</p>
            </div>

            <div className="flex items-center my-8">
                <input id="default-checkbox" onChange={() => setTermsCheckState(!termsCheckState)} type="checkbox" value={termsCheckState} className="w-8 h-8 cursor-pointer text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-0 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <label for="default-checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    <p className='text-sm'>J’accepte les conditions générales d’utilisation et d’être rappelé par nos partenaires assureurs si je demande à être mis en relation.</p>
                </label>
            </div>

            <div className='text-center my-4'>
                <button
                    className="bg-blue-500 hover:bg-blue-700 disabled:bg-blue-300 text-white font-bold py-2 px-4 rounded"
                    onClick={handleFinalContinue}
                    disabled={!termsCheckState || !subscriberState.offerRatesApproval || !subscriberState.newsletter}
                >
                    Accéder à vos devis
                </button>
            </div>

            <hr />
        </div >
    )
}
