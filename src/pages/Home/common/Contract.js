import React, { useEffect, useState } from 'react'
import moment from 'moment';
import useContractForm from 'hooks/useContractForm';
import Title from 'components/Title';
import Subtitle from 'components/Subtitle';
import InputField from 'components/controls/InputField';
import PostalCodeAutoComplete from 'components/controls/PostalCodeAutoComplete';
import TextView from 'components/controls/TextView';
import TextView2 from 'components/controls/TextView2';
import DatePickerInput from 'components/controls/DatePickerInput';
import { currentlyInsuredList } from 'shared/constants';
import ContractViewCard from 'components/ContractViewCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

export default function Contract({ state, contractLevelStepRef }) {
    const {
        subscriberState,
        levels,
        errors,
        errorReference,
        handleSubscriberFieldUpdate,
        handlePostCodeChange,
        handlePostCodeAddressChange,
        handleInsuranceDate,
        handleContinue,
        _handleRevertToFirstStep,
        handlePostCode,
        _handlePostalCodeAndAddressChange
    } = useContractForm(contractLevelStepRef);
    const todayDate = new Date();
    const [orderedMonths, setOrderedMonths] = useState([]);
    const [showAllExpiryMonths, setShowAllExpiryMonths] = useState(false);
    const [expiryMonthEdit, setExpiryMonthEdit] = useState(true);
    const [insuranceDateList, setInsuranceDateList] = useState([]);
    const [showOtherInsuranceDateInput, setShowOtherInsuranceDateInput] = useState(false);
    const [selectedPopularDate, setSelectedPopularDate] = useState(false);

    useEffect(() => {
        const months = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
        const currentMonth = moment().format('MMMM');

        // First find current month index
        const currentMonthIndex = months.findIndex((item) => currentMonth === item)

        // Then reorder the array
        const orderedMonthsList = months.slice(currentMonthIndex).concat(months.slice(0, currentMonthIndex));
        setOrderedMonths(orderedMonthsList);

        const firstFourDatesOfInsuranceDate = [
            {
                date: moment(todayDate).format('dddd DD MMMM YYYY'),
                title: "Aujourd'hui - "
            },
            {
                date: moment(todayDate).add(1, 'days').format('dddd DD MMMM YYYY'),
                title: "Demain - "
            },
            {
                date: moment(todayDate).add(7, 'days').format('dddd DD MMMM YYYY'),
                title: "Dans une semaine - "
            },
            {
                date: moment(todayDate).add(1, 'month').format('dddd DD MMMM YYYY'),
                title: "Dans un mois - ",
            }
        ]

        console.log('firstFourDatesOfInsuranceDate: ', firstFourDatesOfInsuranceDate)
        setInsuranceDateList(firstFourDatesOfInsuranceDate)
    }, []);

    const handleExpiryMonthChange = (name, value) => {
        handleSubscriberFieldUpdate(name, value)
        setExpiryMonthEdit(!expiryMonthEdit)
        setShowAllExpiryMonths(false)
    }

    const _getContractExipiryMonth = () => {
        if (expiryMonthEdit) {
            if (showAllExpiryMonths) {
                return (orderedMonths.map((elem, index) => (
                    <TextView
                        key={index}
                        name="expiryMonth"
                        text={elem}
                        selected={elem === state.expiryMonth}
                        handleSubscriberFieldUpdate={handleExpiryMonthChange}
                    />
                )))
            } else {
                return (
                    <>
                        {
                            orderedMonths.slice(0, 2).map((elem, index) => (
                                <TextView
                                    key={index}
                                    name="expiryMonth"
                                    text={elem}
                                    selected={elem === state.expiryMonth}
                                    handleSubscriberFieldUpdate={handleExpiryMonthChange}
                                />
                            ))
                        }

                        <TextView2
                            key={Math.random()}
                            text="Un autre mois..."
                            onClickHandler={() => setShowAllExpiryMonths(!showAllExpiryMonths)}
                            className="justify-center"
                        />
                    </>
                )
            }
        } else {
            if (state.expiryMonth) {
                return (
                    <>
                        <TextView2
                            key={Math.random()}
                            text={state.expiryMonth}
                            onClickHandler={() => setExpiryMonthEdit(!expiryMonthEdit)}
                            className="justify-between"
                            icon={<FontAwesomeIcon icon={faEdit} className='text-slate-500 mr-2' />}
                        />
                    </>
                )
            } else {
                return (
                    <>
                        {
                            orderedMonths.slice(0, 2).map((elem, index) => (
                                <TextView
                                    key={index}
                                    name="expiryMonth"
                                    text={elem}
                                    selected={elem === state.expiryMonth}
                                    handleSubscriberFieldUpdate={handleExpiryMonthChange}
                                />
                            ))
                        }

                        <TextView2
                            key={Math.random()}
                            text="Un autre mois..."
                            onClickHandler={() => setShowAllExpiryMonths(!showAllExpiryMonths)}
                            className="justify-center"
                        />
                    </>
                )
            }
        }
    }

    const handleOtherInsuranceDate = (momentDate) => {
        handleInsuranceDate({
            day: parseInt(moment(momentDate).format("DD")),
            month: parseInt(moment(momentDate).format("MM")),
            year: parseInt(moment(momentDate).format("YYYY"))
        });
        setSelectedPopularDate(true)
    }

    return (
        <div className='mt-12'>
            <span className='mt-10' ref={contractLevelStepRef}></span>
            <Title
                title="Contrat"
            />

            {
                levels.contract.showViewCard ?
                    <div className='mb-20'>
                        <ContractViewCard
                            state={subscriberState}
                            _handleRevertToFirstStep={_handleRevertToFirstStep}
                        />
                    </div>
                    : (
                        <>

                            {/* What is the postcode or city of your home? */}
                            <div className='mt-14'>
                                <Subtitle
                                    subtitle="Quel est le code postal ou la ville de votre foyer ?"
                                />
                                {
                                    !state.postCode ?
                                        (
                                            <PostalCodeAutoComplete
                                                name="postcode"
                                                placeholder="Ex: 80800"
                                                postCode={state.postCode}
                                                postCodeAddress={state.postCodeAddress}
                                                handlePostCodeChange={handlePostCodeChange}
                                                error={errors.postCode}
                                                handlePostCodeAddressChange={handlePostCodeAddressChange}
                                                _handlePostalCodeAndAddressChange={_handlePostalCodeAndAddressChange}
                                                errorReference={errorReference}
                                            />
                                        ) :
                                        (
                                            <>
                                                <p className='text-md font-medium pt-4'>Code postal</p>
                                                <TextView2
                                                    key={Math.random()}
                                                    text={state.postCodeAddress}
                                                    onClickHandler={() => handlePostCodeChange(null)}
                                                    className={"justify-between"}
                                                    icon={<FontAwesomeIcon icon={faEdit} className='text-slate-500 mr-2' />}
                                                />
                                            </>
                                        )
                                }
                            </div>

                            {/* Are you currently insured? */}
                            <div className='mt-14'>
                                <Subtitle
                                    subtitle="Êtes-vous actuellement assuré(e) ?"
                                />
                                {
                                    currentlyInsuredList.map((elem, index) => (
                                        <TextView
                                            key={index}
                                            name="currentlyInsured"
                                            text={elem}
                                            selected={elem === state.currentlyInsured}
                                            handleSubscriberFieldUpdate={handleSubscriberFieldUpdate}
                                        />
                                    ))
                                }
                                <p className='text-red-400'>{errors.currentlyInsured}</p>
                            </div>

                            {/* Contract Expiry Month */}
                            {
                                state.currentlyInsured === 'Oui' && (
                                    < div className='mt-14'>
                                        <Subtitle
                                            subtitle="Mois d'échéance du contrat"
                                        />
                                        {_getContractExipiryMonth()}
                                        <p className='text-red-400'>{errors.currentlyInsured}</p>
                                    </div>
                                )
                            }

                            {/* Are you currently insured? */}
                            <div className='mt-14'>
                                <Subtitle
                                    subtitle="Quand souhaitez-vous être assuré ?"
                                />

                                {
                                    !showOtherInsuranceDateInput && !selectedPopularDate && (
                                        insuranceDateList.map((elem, index) => (
                                            <TextView2
                                                key={Math.random()}
                                                text={`${elem.title}${elem.date}`}
                                                onClickHandler={() => handleOtherInsuranceDate(elem.date)}
                                                className="justify-start"
                                            />
                                        )))
                                }

                                {
                                    selectedPopularDate ?
                                        <TextView2
                                            key={Math.random()}
                                            text={moment(`${state.insuranceDate.month}-${state.insuranceDate.day}-${state.insuranceDate.year}`).format('dddd DD MMMM YYYY')}
                                            onClickHandler={() => setSelectedPopularDate(!selectedPopularDate)}
                                            className={"justify-between"}
                                            icon={<FontAwesomeIcon icon={faEdit} className='text-slate-500 mr-2' />}
                                        />
                                        :
                                        <TextView2
                                            key={Math.random()}
                                            text="Une autre date..."
                                            onClickHandler={() => setShowOtherInsuranceDateInput(!showOtherInsuranceDateInput)}
                                            className={showOtherInsuranceDateInput ? "justify-between" : "justify-center"}
                                            icon={showOtherInsuranceDateInput ? <FontAwesomeIcon icon={faEdit} className='text-slate-500 mr-2' /> : <></>}
                                        />
                                }
                                {
                                    showOtherInsuranceDateInput && (
                                        <div className='pt-8'>
                                            <Subtitle
                                                subtitle="Indiquez la date souhaitée"
                                            />
                                            <DatePickerInput
                                                date={state.insuranceDate}
                                                handeSelectedDay={handleInsuranceDate}
                                                placeholder={moment(todayDate).format('dddd DD MMMM YYYY')}
                                                error={errors.insuranceDate}
                                            />
                                        </div>
                                    )
                                }
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
        </div >
    )
}
