import React, { useEffect } from 'react'
import useContactInfoForm from 'hooks/useContactInfoForm';
import Title from 'components/Title';
import Subtitle from 'components/Subtitle';
import InputField from 'components/controls/InputField';
import PhoneNumInput from 'components/controls/PhoneNumInput';
import ContactInfoViewCard from 'components/ContactInfoViewCard';

export default function ContactInfo({ state, contactInfoLevelStepRef }) {
    const {
        subscriberState,
        levels,
        errors,
        handlePostCodeChange,
        handleFirstNameChange,
        handleLastameChange,
        handleEmailChange,
        handleCityChange,
        handlePhoneNoChange,
        handleContinue,
        _handleRevertToFirstStep
    } = useContactInfoForm(contactInfoLevelStepRef);

    return (
        <div className='mt-12'>
            <span className='mt-10' ref={contactInfoLevelStepRef}></span>
            <Title
                title="Coordonnées"
            />
            {
                levels.contactInformation.showViewCard ?
                    <div className='mb-20'>
                        <ContactInfoViewCard
                            state={subscriberState}
                            _handleRevertToFirstStep={_handleRevertToFirstStep}
                        />
                    </div>
                    : (
                        <>
                            <div className='flex flex-row mt-4'>
                                {/* Firstname */}
                                <div className='w-1/2 pr-1'>
                                    <Subtitle
                                        subtitle="Prénom"
                                    />
                                    <InputField
                                        name="firstName"
                                        placeholder="Prénom"
                                        state={subscriberState.firstName}
                                        onChangeHanlder={handleFirstNameChange}
                                        error={errors.firstName}
                                    />
                                </div>

                                {/* Lastname */}
                                <div className='w-1/2 pl-1'>
                                    <Subtitle
                                        subtitle="Nom"
                                    />
                                    <InputField
                                        name="lastName"
                                        placeholder="Nom"
                                        state={subscriberState.lastName}
                                        onChangeHanlder={handleLastameChange}
                                        error={errors.lastName}
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div className='mt-4'>
                                <Subtitle
                                    subtitle="Adresse email"
                                />
                                <InputField
                                    name="email"
                                    placeholder="Adresse email"
                                    state={subscriberState.email}
                                    onChangeHanlder={handleEmailChange}
                                    error={errors.email}
                                />
                                <p className='text-red-400'>{errors.email}</p>
                            </div>

                            {/* Ville */}
                            <div className='mt-4'>
                                <Subtitle
                                    subtitle="Ville"
                                />
                                <InputField
                                    name="city"
                                    placeholder="Ville"
                                    state={subscriberState.city}
                                    onChangeHanlder={handleCityChange}
                                    error={errors.city}
                                />
                                <p className='text-red-400'>{errors.city}</p>
                            </div>

                            {/* Phone No. */}
                            <div className='mt-8'>
                                <Subtitle
                                    subtitle="Téléphone (10 chiffres commençant par 0)"
                                />
                                <PhoneNumInput
                                    className={`${errors.phoneNo && "border-red-400"}`}
                                    name="member-step-3-dob"
                                    mask="09 99 99 99 99"
                                    value={subscriberState.phoneNo}
                                    placeholder="06 12 22 32 45"
                                    onChangeHandler={handlePhoneNoChange}
                                />
                            </div>

                            <div className='text-center my-4'>
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    onClick={handleContinue}
                                >
                                    Continuer
                                </button>
                            </div>

                        </>
                    )
            }


            <hr />
        </div>
    )
}
