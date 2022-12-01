import React, { useState, useEffect } from 'react'
import Title from 'components/Title';
import Subtitle from 'components/Subtitle';
import useGenericForm from 'hooks/useGenericForm';
import NeedsTabComponent from 'components/Needs/NeedsTabComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faTooth, faTruckMedical, faStethoscope, faEarListen } from '@fortawesome/free-solid-svg-icons';

const typesList = [
    {
      title: 'Optique',
      icon: <FontAwesomeIcon icon={faEye} className='text-blue-600' />,
      fieldName: 'optical'
    },
    {
      title: 'Dentaire',
      icon: <FontAwesomeIcon icon={faTooth} className='text-blue-600' />,
      fieldName: 'dental'
    },
    {
      title: 'Hospitalisation',
      icon: <FontAwesomeIcon icon={faTruckMedical} className='text-blue-600' />,
      fieldName: 'hospitalisation'
    },
    {
      title: 'Soins médicaux',
      icon: <FontAwesomeIcon icon={faStethoscope} className='text-blue-600' />,
      fieldName: 'medicalCare'
    },
    {
      title: 'Aides auditives',
      icon: <FontAwesomeIcon icon={faEarListen} className='text-blue-600' />,
      fieldName: 'hearingAids'
    },
  ];

export default function Needs() {
    const {
        subscriberState,
        handleSubscriberFieldUpdate,
        handleNeedsContinue
    } = useGenericForm();
    const [state, setState] = useState({
        optical: 'Minimum',
        dental: 'Minimum',
        hospitalisation: 'Minimum',
        medicalCare: 'Minimum',
        hearingAids: 'Minimum'
    });

    const handleState = (fieldName, value) => {
        setState({ ...state, [fieldName]: value })
        // handleSubscriberFieldUpdate(fieldName, value)
    }

    return (
        <div className='my-12'>
            <Title
                title="Besoins"
            />
            <div className='my-8'>
                <Subtitle
                    subtitle="Sélectionnez votre niveau de remboursement"
                />
            </div>
            <div className='my-8'>
                {
                    typesList.map((elem, index) => (
                        <NeedsTabComponent
                            icon={elem.icon}
                            title={elem.title}
                            state={state[elem.fieldName]}
                            fieldName={elem.fieldName}
                            handleState={handleState}
                        />
                    ))
                }
            </div>

            <div className='text-center my-4'>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleNeedsContinue(state)}
                >
                    Continuer
                </button>
            </div>

            <hr />
        </div>
    )
}
