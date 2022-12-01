import React, { useState, useEffect } from 'react'
import { useDebouncedCallback } from 'use-debounce';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import ClipLoader from "react-spinners/ClipLoader";

const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "#000",
};

export default function PostalCodeAutoComplete({
    handlePostCodeAddressChange,
    handlePostCodeChange,
    postCodeAddress,
    postCode,
    error,
    _handlePostalCodeAndAddressChange,
    errorReference
}) {
    const [searchedPostCodeList, setSearchedPostCodeList] = useState([]);
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const debounced = useDebouncedCallback(
        // function
        (value) => {
            if (postCodeAddress) {
                setSearchedPostCodeList([])
                fetchPostalList(value);
                setLoading(true);
            }
        },
        // delay in ms
        1000
    );

    useEffect(() => {
        if (postCodeAddress) {
            fetchPostalList(postCodeAddress)
        }
    }, [page]);

    const handleValue = (value) => {
        handlePostCodeAddressChange(value);
        debounced(value);
    }

    const fetchPostalList = async (value) => {
        const result = await axios.get(`https://data.opendatasoft.com/api/records/1.0/search/?dataset=geonames-postal-code%40public&q=${value}&facet=country_code&facet=postal_code&refine.country_code=FR&start=${page}`);

        setSearchedPostCodeList(result.data.records)
        setLoading(false);
    }

    const handlePaginationNext = () => setPage(page + 1);

    const handlePaginationPrev = () => {
        if (page > 0) {
            setPage(page - 1)
        }
    }

    const handleFormattedPostalCodeChange = (suggestion) => {
        _handlePostalCodeAndAddressChange(suggestion.fields.postal_code, suggestion.fields.place_name)
    }

    const getFormattedPlaceName = (suggestion) => {
        // return `${suggestion.fields.postal_code} - ${suggestion.fields.admin_name1 || ''} ${suggestion.fields.admin_name2 || ''} ${suggestion.fields.admin_name3 || ''}`
        return `${parseInt(suggestion.fields.postal_code)} - ${suggestion.fields.place_name || ''}`
    }

    return (
        <>
            <input
                name="postCodeAddress"
                value={postCodeAddress}
                placeholder="Ex: 80800"
                className={`my-4 bg-slate-100 w-full h-12 rounded-lg border-2 border-slate-300 p-2 pl-4 focus-visible:border-slate-100 flex items-center hover:border-blue-500`}
                onChange={e => handleValue(e.target.value)}
            />
            {error && <p ref={errorReference.postalCodeRef} className='text-red-400'>{error}</p>}
            <hr />

            <div className="autocomplete-dropdown-container my-4">
                {loading && (
                    <ClipLoader color='#000' loading={loading} cssOverride={override} size={30} />
                )}
                {!loading && postCodeAddress && searchedPostCodeList.map(suggestion => {
                    return (
                        <div
                            className="my-2 bg-slate-100 w-full h-12 rounded-lg border-2 cursor-pointer border-blue-300 p-2 pl-4 focus-visible:border-slate-100 flex items-center hover:border-blue-500 cursor-pointer"
                            onClick={() => handleFormattedPostalCodeChange(suggestion)}
                        >
                            <span>{getFormattedPlaceName(suggestion)}</span>
                        </div>
                    );
                })}
            </div>
            <div className='flex justify-end my-4'>
                <FontAwesomeIcon
                    icon={faChevronLeft}
                    className={`${page === 0 ? 'text-slate-400' : 'text-slate-700'} mr-2 cursor-pointer`}
                    onClick={handlePaginationPrev}
                />
                <FontAwesomeIcon
                    icon={faChevronRight}
                    className={`text-slate-700 mr-2 cursor-pointer`}
                    onClick={handlePaginationNext}
                />
            </div>
            <hr />
        </>
    )
}
