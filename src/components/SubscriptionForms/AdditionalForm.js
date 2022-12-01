import React, { useEffect } from 'react';
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik, useFormik } from "formik";
import InputField from 'components/controls/InputField';
import PhoneNumInput from 'components/controls/PhoneNumInput';
import TextView from 'components/controls/TextView';
import useSubscriptionForm from 'hooks/useSubscriptionForm';
import { currentlyInsuredList, familySituation, departmentOfBirth } from 'shared/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const formSchema = Yup.object().shape({
    address1: Yup.string().required("Field is required"),
    // address2: Yup.string().required("Field is required"),
    nationality: Yup.string().required("Field is required"),
    country: Yup.string().required("Field is required"),
    departmentOfBirth: Yup.string().required("Field is required"),
    cityOfBirth: Yup.string().required("Field is required"),
    hasIndividualContractAlready: Yup.string().required("Field is required"),
    postalCode: Yup.string().required("Field is required"),
    city: Yup.string().required("Field is required"),
    familySituation: Yup.string().required("Field is required"),
    socialSecurityNumber: Yup.string().required("Field is required"),
});

export default function AdditionalForm() {
    const {
        loading,
        currentForm,
        tabs,
        additionalFormState,
        paymentFormState,
        _handleAdditionalFormSubmit,
        _handleAdditionalStateChange
    } = useSubscriptionForm();
    const formik = useFormik({
        initialValues: additionalFormState,
        validationSchema: formSchema,
        onSubmit: (fields, { resetForm }) => {
            _handleAdditionalFormSubmit(fields)
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
    debugger;

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
                    <label className="form-label">Address *</label>
                    <InputField
                        name="address1"
                        placeholder="Address here"
                        state={values?.address1}
                        onChangeHanlder={handleChange}
                        type="text"
                        error={errors?.address1}
                    />
                    <span className="text-red-500">{errors?.address1 ? errors?.address1 : ''}</span>
                </div>

                <div className="col-span-12 md:col-span-3 mb-2">
                    <label className="form-label">Postal Code *</label>
                    <InputField
                        name="postalCode"
                        placeholder="Postal Code"
                        state={values?.postalCode}
                        onChangeHanlder={handleChange}
                        type="text"
                        error={errors?.postalCode}
                    />
                    <span className="text-red-500">{errors?.postalCode ? errors?.postalCode : ''}</span>
                </div>

                <div className="col-span-12 md:col-span-3 mb-2">
                    <label className="form-label">City *</label>
                    <InputField
                        name="city"
                        placeholder="City"
                        state={values?.city}
                        onChangeHanlder={handleChange}
                        type="text"
                        error={errors?.city}
                    />
                    <span className="text-red-500">{errors?.city ? errors?.city : ''}</span>
                </div>
                
                <div className="col-span-12 md:col-span-6 mb-2">
                    <label className="form-label">Address 2</label>
                    <InputField
                        name="address1"
                        placeholder="Optional"
                        state={values?.address2}
                        onChangeHanlder={handleChange}
                        type="text"
                        error={errors?.address2}
                    />
                    <span className="text-red-500">{errors?.address2 ? errors?.address2 : ''}</span>
                </div>

                <div className="col-span-12 md:col-span-6">
                    <label className="form-label mb-4">Family situation *</label>
                    <div className="inline-block relative w-full">
                        <select
                            name="familySituation"
                            value={values?.familySituation}
                            onChange={handleChange}
                            className={`block appearance-none w-full bg-slate-100 cursor-default rounded-lg bg-white p-2 pl-4 w-full h-12 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 sm:text-sm my-2`}
                        >
                            <option value="">Family situation</option>
                            {familySituation.map(elem => <option value={elem}>{elem}</option>)}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                        </div>
                    </div>
                    <span className="text-red-500">{errors?.familySituation ? errors?.familySituation : ''}</span>
                </div>

                <div className="col-span-12 md:col-span-6">
                    <label className="form-label mb-4">Department of birth *</label>
                    <div className="inline-block relative w-full">
                        <select
                            name="departmentOfBirth"
                            value={values?.departmentOfBirth}
                            onChange={handleChange}
                            className={`block appearance-none w-full bg-slate-100 cursor-default rounded-lg bg-white p-2 pl-4 w-full h-12 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 sm:text-sm my-2`}
                        >
                            <option value="">Department of birth</option>
                            {departmentOfBirth.map(elem => <option value={elem}>{elem}</option>)}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                        </div>
                    </div>
                    <span className="text-red-500">{errors?.departmentOfBirth ? errors?.departmentOfBirth : ''}</span>
                </div>

                <div className="col-span-12 md:col-span-3 mb-2">
                    <label className="form-label">Nationality *</label>
                    <InputField
                        name="nationality"
                        placeholder="Nationality"
                        state={values?.nationality}
                        onChangeHanlder={handleChange}
                        type="text"
                        error={errors?.nationality}
                    />
                    <span className="text-red-500">{errors?.nationality ? errors?.nationality : ''}</span>
                </div>

                <div className="col-span-12 md:col-span-3 mb-2">
                    <label className="form-label">Country *</label>
                    <InputField
                        name="country"
                        placeholder="Country"
                        state={values?.country}
                        onChangeHanlder={handleChange}
                        type="text"
                        error={errors?.country}
                    />
                    <span className="text-red-500">{errors?.country ? errors?.country : ''}</span>
                </div>

                <div className="col-span-12 md:col-span-3">
                    <label className="form-label mb-4">Social Security Number *</label>
                    <PhoneNumInput
                        className={`${errors?.socialSecurityNumber && "border-red-400"} my-2 border pl-4`}
                        name="socialSecurityNumber"
                        mask="999-999"
                        state={values?.socialSecurityNumber}
                        placeholder="###-###"
                        onChangeHandler={handleChange}
                    />
                    <span className="text-red-500">{errors?.socialSecurityNumber ? errors?.socialSecurityNumber : ''}</span>
                </div>

                <div className="col-span-12 md:col-span-3 mb-2">
                    <label className="form-label">City of Birth *</label>
                    <InputField
                        name="cityOfBirth"
                        placeholder="City"
                        state={values?.cityOfBirth}
                        onChangeHanlder={handleChange}
                        type="text"
                        error={errors?.cityOfBirth}
                    />
                    <span className="text-red-500">{errors?.cityOfBirth ? errors?.cityOfBirth : ''}</span>
                </div>

                <div className="col-span-12 md:col-span-6 mb-2">
                    <label className="form-label">Disposez-vous déjà d’un contrat individuel ? *</label>
                    <div className='flex flex-row gap-2'>
                        {
                            currentlyInsuredList.map((elem, index) => (
                                <TextView
                                    key={index}
                                    name="hasIndividualContractAlready"
                                    text={elem}
                                    selected={elem === values?.hasIndividualContractAlready}
                                    handleSubscriberFieldUpdate={_handleFieldChange}
                                />
                            ))
                        }
                    </div>
                    <span className="text-red-500">{errors?.hasIndividualContractAlready ? errors?.hasIndividualContractAlready : ''}</span>
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
