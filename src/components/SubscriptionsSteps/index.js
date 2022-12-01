import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const stepsList = [
    {
        type: 'situation',
        label: 'Situation',
        checked: true
    },
    {
        type: 'estimate',
        label: 'Estimate',
        checked: true
    },
    {
        type: 'subscription',
        label: 'Subscription',
        checked: true,
        number: true
    },
    {
        type: 'validation',
        label: 'Validation',
        checked: false,
        number: true
    },
];

export default function SubscriptionsSteps() {
    return (
        <div className='hidden flex-row md:flex justify-center my-4'>
            {stepsList.map((step, index) => (
                <div className='flex flex-col text-center' key={index}>
                    <Check
                        checked={step.checked}
                        icon={step.number ?
                            <Number number={index + 1} checked={step.checked} /> :
                            <FontAwesomeIcon icon={faCheckCircle} className='text-blue-300 text-2xl mx-1' />
                        }
                    />
                    <p className='text-slate-700 mt-2 font-medium'>{step.label}</p>
                </div>
            ))}
        </div>
    );
}

const Check = ({ icon, checked, label }) => (
    <div className='flex flex-row text-center items-center mx-2'>
        <hr className={`${checked ? 'bg-blue-300' : 'bg-slate-200'} h-1 w-16`} />
        {icon}
        <hr className={`${checked ? 'bg-blue-300' : 'bg-slate-200'} h-1 w-16`} />
    </div>
)

const Number = ({ number, checked }) => (
    <div className={`rounded-full ${checked ? 'bg-blue-300' : 'bg-slate-200'} text-white w-6 h-6`}>
        {number}
    </div>
)