import React, { useEffect } from 'react';
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik, useFormik } from "formik";
import InputField from 'components/controls/InputField';
import PhoneNumInput from 'components/controls/PhoneNumInput';
import TextView from 'components/controls/TextView';
import useSubscriptionForm from 'hooks/useSubscriptionForm';
import { currentlyInsuredList } from 'shared/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const formSchema = Yup.object().shape({
    accountOwner: Yup.string().required("Field is required"),
    ibanNumber: Yup.string().required("Field is required"),
    phoneNumber: Yup.string().required("Field is required"),
    periodicity: Yup.string().required("Field is required"),
    // samplingDay: Yup.string().required("Field is required"),
});

const periodicityList = ["Monthly", "Quarterly", "Half-yearly", "Annually"]

export default function PaymentForm() {
    const {
        loading,
        currentForm,
        tabs,
        additionalFormState,
        paymentFormState,
        handleUpdateSubscriberState
    } = useSubscriptionForm();
    const formik = useFormik({
        initialValues: paymentFormState,
        validationSchema: formSchema,
        onSubmit: (fields, { resetForm }) => {
            handleUpdateSubscriberState(fields)
        },
        enableReinitialize: true
    });
    const {
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        setFieldValue,
        resetForm,
        setSubmitting,
        isValid
    } = formik;

    const _handleFieldChange = (name, value) => {
        handleChange({
            target: {
                name, value
            }
        });
    }

    return (
        <form>
            <div className='grid grid-rows-3 grid-cols-12 gap-4 py-4'>
                <div className="col-span-12 md:col-span-6 mb-2">
                    <label className="form-label">Account Owner *</label>
                    <InputField
                        name="accountOwner"
                        placeholder="Account Owner"
                        state={values?.accountOwner}
                        onChangeHanlder={handleChange}
                        type="text"
                        error={errors.accountOwner}
                    />
                    <span className="text-red-500">{errors.accountOwner ? errors.accountOwner : ''}</span>
                </div>

                <div className="col-span-12 md:col-span-6 mb-2">
                    <label className="form-label">Periodicity *</label>
                    <div className='flex flex-row gap-2'>
                        {
                            periodicityList.map((elem, index) => (
                                <TextView
                                    key={index}
                                    name="periodicity"
                                    text={elem}
                                    selected={elem === values?.periodicity}
                                    handleSubscriberFieldUpdate={_handleFieldChange}
                                />
                            ))
                        }
                    </div>
                    <span className="text-red-500">{errors.periodicity ? errors.periodicity : ''}</span>
                </div>

                <div className="col-span-12 md:col-span-6 mb-2">
                    {/* <label className="form-label">Postal Code *</label> */}
                    <InputField
                        name="ibanNumber"
                        placeholder="IBAN"
                        state={values?.ibanNumber}
                        onChangeHanlder={handleChange}
                        type="number"
                        min={0}
                        error={errors.ibanNumber}
                    />
                    <span className="text-red-500">{errors.ibanNumber ? errors.ibanNumber : ''}</span>
                </div>

                <div className="col-span-12 md:col-span-6">
                    {/* <div className="inline-block relative w-full">
                        <select
                            name="samplingDay"
                            value={values?.samplingDay}
                            onChange={handleChange}
                            className={`block appearance-none w-full bg-slate-100 cursor-default rounded-lg bg-white p-2 pl-4 w-full h-12 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 sm:text-sm my-2`}
                        >
                            <option value="">Sampling Day</option>
                            <option value="Day 1">Day 1</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                        </div>
                    </div>
                    <span className="text-red-500">{errors.samplingDay ? errors.samplingDay : ''}</span> */}
                </div>

                <div className="col-span-12 md:col-span-6">
                    <label className="form-label">Phone Number</label>
                    <PhoneNumInput
                        className={`${errors.phoneNumber && "border-red-400"} my-2 border pl-4`}
                        name="phoneNumber"
                        state={values?.phoneNumber}
                        placeholder="0## ## ## ## ##"
                        onChangeHandler={handleChange}
                    />
                    <span className="text-red-500">{errors.phoneNumber ? errors.phoneNumber : ''}</span>
                </div>

                <div className="col-span-12 md:col-span-12 text-end">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 disabled:bg-blue-300 text-white font-bold py-2 px-4 rounded"
                        onClick={() => handleSubmit()}
                        type='button'
                    >
                        <FontAwesomeIcon icon={faCheckCircle} className='text-white mr-2' />
                        Continuer
                    </button>
                </div>
            </div>
        </form>
    )
}
